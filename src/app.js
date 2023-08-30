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

const cronSchedule=async()=>{
  cron.schedule("0 */6 * * *", async () => {
    try {
      console.log("Running scheduled task...");
      await makeCronJobRequest();
    } catch (error) {
      console.log(error.message);
    }
  });

}
app.use(cronSchedule)



const port = process.env.PORT;
app.listen(port, async () => {
  log.info(`Backend server is running on port ${port}!`);
  await mongoConnect();
  routes(app);
});
