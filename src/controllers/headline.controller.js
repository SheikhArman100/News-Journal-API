import puppeteer from "puppeteer";
import Headline from "../model/headlineSchema.js";
import log from "../utils/logger.js";

const baseUrl = process.env.URL;
const url = process.env.URL;
export const headlinePostController = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
    const page = await browser.newPage();
    await page.goto(url,{timeout:120000});

    const newsData = await page.evaluate((baseUrl) => {
      const title = document.querySelector(
        ".pane-home-top-v5 .pane-content .row .columns .card .card-content .title a"
      ).innerText;
      const link =
        baseUrl +
        document
          .querySelector(
            ".pane-home-top-v5 .pane-content .row .columns .card .card-content .title a"
          )
          .getAttribute("href");
      const image = (
        document
          .querySelector(
            ".pane-home-top-v5 .pane-content .row .columns .card .card-image img"
          )
          ?.getAttribute("data-srcset") || ""
      )
        .replace(/\.jpg\s.*$/, ".jpg") // Remove text after .jpg like 470w
        .replace(/\/big_201\//, "/very_big_1/");

      return { title, link, image };
    }, baseUrl);

    await browser.close();

    //delete previous data in mongodb
    await Headline.deleteMany({});

    //insert new data in mongodb
    await Headline.create(newsData);
    log.info("Headline Database Updated Successfully");
    return res.send("Headline Database Updated Successfully");
  } catch (error) {
    log.error(error);
  }
};
export const headlineGetController = async (req,res) => {
  try {
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||8
    const skip=(page-1)*limit
    const resData = await Headline.find({image:{$ne:""}}).skip(skip).limit(limit);
    return res.send(resData);
  } catch (error) {
    log.error(error.message);
    return res.send(error.message)
  }
};
