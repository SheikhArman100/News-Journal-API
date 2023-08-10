import puppeteer from "puppeteer";
import Lifestyle from "../model/lifestyleSchema.js";
import log from "../utils/logger.js";

const baseUrl = process.env.URL;
const url = process.env.URL5;
export const lifestylePostController = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

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
    await Lifestyle.deleteMany({});

    //insert new data in mongodb
    await Lifestyle.create(newsData);
    log.info("Lifestyle Database Updated Successfully");
    return res.send("Lifestyle Database Updated Successfully");
  } catch (error) {
    log.error(error.message);
    return res.send(error.message);
  }
};

export const lifestyleGetController = async (req, res) => {
  try {
    const resData = await Lifestyle.find();
    return res.send(resData);
  } catch (error) {
    log.error(error.message);
    return res.send(error.message);
  }
};
