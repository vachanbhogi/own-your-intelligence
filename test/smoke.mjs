import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctl = join(root, "qm", "sandbox", "tools", "supersetctl", "supersetctl");

const REQUIRED_TOOLS = ["pages_publish", "workspaces_create", "agents_create", "hosts_list", "projects_list"];

function run(args) {
  return spawnSync(process.execPath, [ctl, ...args], { cwd: root, encoding: "utf8", timeout: 120_000 });
}

function ok(label, detail = "") {
  process.stdout.write(`ok   ${label}${detail ? ` — ${detail}` : ""}\n`);
}

function fail(label, detail) {
  process.stderr.write(`FAIL ${label} — ${detail}\n`);
  process.exit(1);
}

function hasApiKey() {
  if ((process.env.SUPERSET_API_KEY || "").trim()) return true;
  const candidates = [join(root, ".env")];
  let dir = root;
  for (let i = 0; i < 6; i++) {
    candidates.push(join(dir, ".env"));
    dir = dirname(dir);
  }
  candidates.push(join(process.env.HOME || "", ".config", "superset", "env"));
  return candidates.some(
    (file) => existsSync(file) && /^\s*SUPERSET_API_KEY\s*=\s*\S/sm.test(readFileSync(file, "utf8")),
  );
}

if (!hasApiKey()) {
  process.stdout.write("skip smoke — no SUPERSET_API_KEY (add it to .env, see .env.example)\n");
  process.exit(0);
}

const auth = run(["auth-check"]);
if (auth.status !== 0) fail("auth-check", auth.stderr.trim() || `exit ${auth.status}`);
let authJson;
try {
  authJson = JSON.parse(auth.stdout);
} catch {
  fail("auth-check", `unparseable output: ${auth.stdout.slice(0, 200)}`);
}
ok("auth-check", `${authJson.tools} tools at ${authJson.endpoint}`);

const list = run(["tools-list", "--json"]);
if (list.status !== 0) fail("tools-list", list.stderr.trim() || `exit ${list.status}`);
let tools;
try {
  tools = JSON.parse(list.stdout);
} catch {
  fail("tools-list", `unparseable output: ${list.stdout.slice(0, 200)}`);
}
const names = tools.map((t) => t.name);
const missing = REQUIRED_TOOLS.filter((name) => !names.includes(name));
if (missing.length) fail("tools-list", `missing tools: ${missing.join(", ")}`);
ok("tools-list", `${names.length} tools, required set present`);

const workDir = mkdtempSync(join(tmpdir(), "supersetctl-smoke-"));
try {
  const htmlFile = join(workDir, "smoke.html");
  writeFileSync(
    htmlFile,
    `<!doctype html><html><head><meta charset="utf-8"><title>supersetctl smoke</title></head><body style="font-family:system-ui;margin:4rem auto;max-width:32rem"><h1>supersetctl smoke</h1><p>Published by test/smoke.mjs. If you can read this, the render path works.</p></body></html>`,
  );

  const publish = run([
    "pages-publish",
    "--file",
    htmlFile,
    "--title",
    "supersetctl smoke",
    "--set",
    "visibility=everyone",
  ]);
  if (publish.status !== 0) fail("pages-publish", publish.stderr.trim() || `exit ${publish.status}`);

  const match = publish.stdout.match(/https?:\/\/[^\s"\\]+/);
  if (!match) fail("pages-publish", `no URL in result: ${publish.stdout.slice(0, 300)}`);
  const url = match[0];

  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30_000) });
  if (res.status >= 400) fail("page-fetch", `${res.status} for ${url}`);
  const body = await res.text();
  if (!body.includes("supersetctl smoke")) fail("page-fetch", "published page is missing its content");
  ok("pages-publish", url);

  process.stdout.write(`\nverification URL: ${url}\n`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
