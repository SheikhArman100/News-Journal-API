import axios from "axios";

export async function makeCronJobRequest() {
  const base_url = process.argv.includes("--dev")? process.env.LOCAL_HOST_URL:process.env.HOST_URL;
  

  try {
    await axios.post(`${base_url}/api/headline`);
    await axios.post(`${base_url}/api/news`);
    await axios.post(`${base_url}/api/culture`);
    await axios.post(`${base_url}/api/sports`);
    await axios.post(`${base_url}/api/lifestyle`);
    await axios.post(`${base_url}/api/opinion`);
    console.log("cron-job request successful");
  } catch (error) {
    console.log(error);
    console.log("cron-job request failed")
  }
}
