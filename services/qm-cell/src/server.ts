import { createQmCellApp } from "./app.js";

const app = createQmCellApp();
const port = Number(process.env.PORT ?? 7101);
app.listen(port);
console.log(`qm-cell listening on ${port} tenant=${app.config.tenantId}`);
