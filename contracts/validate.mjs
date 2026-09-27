import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "v1");
const schemaDir = path.join(root, "schemas");
const fixtureDir = path.join(root, "fixtures");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

for (const file of fs.readdirSync(schemaDir).filter((f) => f.endsWith(".json"))) {
  const schema = JSON.parse(fs.readFileSync(path.join(schemaDir, file), "utf8"));
  ajv.addSchema(schema);
}

const cases = [
  ["assignment.valid.research.json", "https://harmony.local/contracts/v1/assignment.schema.json"],
  ["assignment.valid.pm_spec.json", "https://harmony.local/contracts/v1/assignment.schema.json"],
  ["assignment.invalid.tenant_mismatch.json", "https://harmony.local/contracts/v1/assignment.schema.json"],
  ["task_result.valid.succeeded.json", "https://harmony.local/contracts/v1/task_result.schema.json"],
  ["task_result.valid.failed.json", "https://harmony.local/contracts/v1/task_result.schema.json"],
  ["event.task_accepted.json", "https://harmony.local/contracts/v1/event_envelope.schema.json"],
  ["event.task_result_received.json", "https://harmony.local/contracts/v1/event_envelope.schema.json"],
];

let failed = 0;
for (const [fixture, schemaId] of cases) {
  const data = JSON.parse(fs.readFileSync(path.join(fixtureDir, fixture), "utf8"));
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    console.error(`MISSING SCHEMA ${schemaId}`);
    failed++;
    continue;
  }
  const ok = validate(data);
  if (!ok) {
    console.error(`FAIL ${fixture}`, validate.errors);
    failed++;
  } else {
    console.log(`OK ${fixture}`);
  }
}

const tenants = JSON.parse(fs.readFileSync(path.join(fixtureDir, "tenants.seed.json"), "utf8"));
if (!Array.isArray(tenants.tenants) || tenants.tenants.length !== 2) {
  console.error("FAIL tenants.seed.json must contain exactly two tenants");
  failed++;
} else {
  console.log("OK tenants.seed.json");
}

if (failed) {
  process.exit(1);
}
console.log("All contract fixtures valid.");
