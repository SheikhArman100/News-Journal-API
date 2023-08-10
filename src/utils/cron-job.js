import axios from "axios";
import log from "./logger.js";

export async function makeCronJobRequest() {
  const base_url = process.env.HOST_URL;

  try {
    await axios.post(`${base_url}/api/headline`);
    await axios.post(`${base_url}/api/news`);
    await axios.post(`${base_url}/api/culture`);
    await axios.post(`${base_url}/api/sports`);
    await axios.post(`${base_url}/api/lifestyle`);
    await axios.post(`${base_url}/api/opinion`);
    log.info("cron-job request successful:");
  } catch (error) {
    log.error(error.message);
  }
}
