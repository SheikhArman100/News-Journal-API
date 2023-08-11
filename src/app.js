import "dotenv/config.js";
import express from "express";
import log from "./utils/logger.js";
import mongoConnect from "./utils/mongoConnect.js";

import cors from "cors";
import routes from "./route.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
app.listen(port, async () => {
  log.info(`Backend server is running on port ${port}!`);
  await mongoConnect();
  routes(app);
});
