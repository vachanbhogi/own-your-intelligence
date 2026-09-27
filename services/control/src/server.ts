import { createControlApp } from "./app.js";

const port = Number(process.env.PORT ?? 7100);
const { server } = createControlApp();

server.listen(port, () => {
  console.log(`Harmony control plane listening on :${port}`);
});
