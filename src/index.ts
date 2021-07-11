import dotenv from "dotenv";

dotenv.config();

import { baseUrl } from "./config";
import Browser from "./puppeteer/Browser";
import { sleep } from "./utils";

const main = async () => {
  try {
    const page = new Browser(baseUrl);
    await page.initalize();
    await page.navigateTo();
    await sleep(5 * 1000);
    await page.closeBrowser();
  } catch (err) {
    console.error(err);
  }
};

main();
