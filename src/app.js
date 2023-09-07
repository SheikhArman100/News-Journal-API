import "dotenv/config.js";
import express from "express";
import log from "./utils/logger.js";
import mongoConnect from "./utils/mongoConnect.js";

import cors from "cors";
import routes from "./route.js";
import cron from "node-cron";
import { makeCronJobRequest } from "./utils/cron-jobs.js";

const app = express();
app.use(cors());
app.use(express.json());
try {
  cron.schedule("*/59 * * * *", async () => {
    try {
      log.info("Running scheduled task...");
      await makeCronJobRequest();
      log.info("Scheduled tasks completed");
    } catch (error) {
      log.error("error on cronjob", error);
    }
  });
} catch (error) {
  log.error("error on scheduled task", error.message);
}

const port = process.env.PORT;
app.listen(port, async () => {
  log.info(`Backend server is running on port ${port}!`);
  await mongoConnect();
  routes(app);
});
