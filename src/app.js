import express from "express";
import  "dotenv/config.js";
import mongoConnect from "./utils/mongoConnect.js";
import log from "./utils/logger.js";
import cron from "node-cron"
import cors from "cors"
import routes from "./route.js";
import { makeCronJobRequest } from "./utils/cron-job.js";

const app = express();
app.use(cors());
app.use(express.json())


//cron-job
cron.schedule('0 */1 * * *', async() => {
 
  try {
     log.info('Running scheduled task...');
  await makeCronJobRequest()
  } catch (error) {
   log.error(error.message) 
  }
});




const port = process.env.PORT;
app.listen(port, async () => {
  log.info(`Backend server is running on port ${port}!`);
  await mongoConnect();
  routes(app)
});
