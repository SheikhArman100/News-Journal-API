import puppeteer from "puppeteer";
import Opinion from "../model/opinionSchema.js";
import log from "../utils/logger.js";

const baseUrl = process.env.URL;
const url = process.env.URL2;
export const opinionPostController = async (req, res) => {
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
      const headlinesColumns = document.querySelectorAll(
        ".pane-category-news .pane-content .row .columns"
      );
      const headlineCards = Array.from(headlinesColumns).map(
        (headlinesColumn) => {
          const headlines = headlinesColumn.querySelectorAll(".card");
          const headlinesData = Array.from(headlines).map((headline) => ({
            title: headline.querySelector(".card-content .title a").innerText,
            link:
              baseUrl +
              headline
                .querySelector(".card-content .title a")
                .getAttribute("href"),
            image: (
              headline
                .querySelector(".card-image img")
                ?.getAttribute("data-srcset") || ""
            )
              .replace(/\.jpg\s.*$/, ".jpg") //remove text after .jpg like 470w
              .replace(/\.png\s.*$/, ".png") //remove text after .png like 470w
              .replace(/\/medium_203\//, "/very_big_1/") //this will give me big image
              .replace(/\/medium_201\//, "/very_big_1/") //this will give me big image
              .replace(/\/small_202\//, "/very_big_1/"), //this will give me big image
          }));
          return headlinesData;
        }
      );

      return headlineCards.flat();
      // Flatten the array of headlinesData arrays
    }, baseUrl);
    await browser.close();

    //delete previous data in mongodb
    await Opinion.deleteMany({});

    //insert new data in mongodb
    await Opinion.create(newsData);
    log.info("Opinions Database Updated Successfully");
    return res.send("Opinions Database Updated Successfully");
  } catch (error) {
    log.error(error.message);
    return res.send(error.message);
  }
};

export const opinionGetController = async (req, res) => {
  try {
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||8
    const skip=(page-1)*limit
    const resData = await Opinion.find({image:{$ne:""}}).skip(skip).limit(limit);
    return res.send(resData);
  } catch (error) {
    log.error(error.message);
    return res.send(error.message);
  }
};
