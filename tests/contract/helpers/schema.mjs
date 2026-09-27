import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contractsRoot = path.resolve(__dirname, "../../../contracts/v1");
const schemaDir = path.join(contractsRoot, "schemas");
const fixtureDir = path.join(contractsRoot, "fixtures");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

for (const file of fs.readdirSync(schemaDir).filter((f) => f.endsWith(".json"))) {
  const schema = JSON.parse(fs.readFileSync(path.join(schemaDir, file), "utf8"));
  ajv.addSchema(schema);
}

export const SCHEMA_IDS = {
  assignment: "https://harmony.local/contracts/v1/assignment.schema.json",
  taskResult: "https://harmony.local/contracts/v1/task_result.schema.json",
  eventEnvelope: "https://harmony.local/contracts/v1/event_envelope.schema.json",
  errorResponse: "https://harmony.local/contracts/v1/error_response.schema.json",
};

export function validateAgainst(schemaId, data) {
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`Missing schema ${schemaId}`);
  }
  const ok = validate(data);
  return { ok, errors: validate.errors ?? [] };
}

export function loadFixture(name) {
  const filePath = path.join(fixtureDir, name);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export { fixtureDir, contractsRoot };
