import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020Module from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";

const Ajv2020 = Ajv2020Module as unknown as new (opts?: object) => import("ajv").default;
const addFormats = addFormatsModule as unknown as (ajv: import("ajv").default) => void;
import type { ErrorObject } from "ajv";

const here = dirname(fileURLToPath(import.meta.url));
const schemaRoot = join(here, "../../../../contracts/v1");

let ajvInstance: ReturnType<typeof createValidator> | null = null;

function loadJson(name: string): unknown {
  return JSON.parse(readFileSync(join(schemaRoot, name), "utf8"));
}

function createValidator() {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  for (const file of ["budget.schema.json", "assignment.schema.json"]) {
    ajv.addSchema(loadJson(file) as object);
  }
  const validateAssignment = ajv.getSchema(
    "https://harmony.local/contracts/v1/assignment.schema.json",
  );
  if (!validateAssignment) {
    throw new Error("assignment schema failed to register");
  }
  return { validateAssignment };
}

export function getAssignmentValidator() {
  if (!ajvInstance) {
    ajvInstance = createValidator();
  }
  return ajvInstance.validateAssignment;
}

export function formatSchemaErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors?.length) {
    return "Invalid assignment payload";
  }
  return errors.map((e) => `${e.instancePath || "/"} ${e.message ?? ""}`.trim()).join("; ");
}
