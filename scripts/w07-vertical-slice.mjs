#!/usr/bin/env node
/**
 * W07 / G1 vertical slice harness (Wave 3).
 * Starts when services exist under services/*; proves two-tenant research assignment
 * with restart replay and cross-tenant isolation.
 *
 * Usage: node scripts/w07-vertical-slice.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const tenants = JSON.parse(
  fs.readFileSync(path.join(root, "contracts/v1/fixtures/tenants.seed.json"), "utf8"),
);
const assignment = JSON.parse(
  fs.readFileSync(path.join(root, "contracts/v1/fixtures/assignment.valid.research.json"), "utf8"),
);

console.log("W07 harness scaffold");
console.log(`tenants=${tenants.tenants.length}`);
console.log(`sample_assignment=${assignment.assignment_id}`);
console.log("Wave 3 will wire live services once Wave 2 packages export create*App().");
