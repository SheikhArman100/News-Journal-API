import "dotenv/config.js";
import express from "express";
import log from "./utils/logger.js";
import mongoConnect from "./utils/mongoConnect.js";

import cors from "cors";
import cron from "node-cron";
import { makeCronJobRequest } from "./utils/cron-jobs.js";
import { cultureGetController, culturePostController } from "./controllers/culture.controller.js"
import { headlineGetController, headlinePostController } from "./controllers/headline.controller.js"
import { lifestyleGetController, lifestylePostController } from "./controllers/lifestyle.controller.js"
import { newsGetController, newsPostController } from "./controllers/news.controller.js"
import { opinionGetController, opinionPostController } from "./controllers/opinion.controller.js"
import { sportsGetController, sportsPostController } from "./controllers/sports.controller.js"

const app = express();
app.use(cors());
app.use(express.json());

//headline route
   app.post("/api/headline",headlinePostController)
   app.get("/api/headline",headlineGetController)

   //news route
   app.post("/api/news",newsPostController)
   app.get("/api/news",newsGetController)

   //culture route
   app.post("/api/culture",culturePostController)
   app.get("/api/culture",cultureGetController)

   //lifestyle route
   app.post("/api/lifestyle",lifestylePostController)
   app.get("/api/lifestyle",lifestyleGetController)

   //opinion routes
   app.post("/api/opinion",opinionPostController)
   app.get("/api/opinion",opinionGetController)

   //sports routes
   app.post("/api/sports",sportsPostController)
   app.get("/api/sports",sportsGetController)



  cron.schedule("*/30 * * * *", async () => {
    try {
      log.info("Running scheduled task...");
      await makeCronJobRequest();
      log.info("Scheduled tasks completed");
    } catch (error) {
      log.error("error on cronjob", error);
    }
  },{
   scheduled: true,
   timezone: "Asia/Kolkata"
 });


const port = process.env.PORT;
app.listen(port, async () => {
  log.info(`Backend server is running on port ${port}!`);
  await mongoConnect();
});
