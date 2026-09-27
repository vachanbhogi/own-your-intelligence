import { createProvisioningApp } from "./app.js";

const port = Number(process.env.PROVISIONING_PORT ?? 7104);
const dataFile = process.env.PROVISIONING_DATA_FILE ?? undefined;

const app = createProvisioningApp({ dataFile });
app.listen(port);
console.log(`@harmony/provisioning listening on http://127.0.0.1:${port}`);
