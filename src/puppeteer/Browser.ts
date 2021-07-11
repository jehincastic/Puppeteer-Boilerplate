import puppeteer from "puppeteer";
import { typeSelctor } from "src/types";

import { getRandomNumber, sleep } from "../utils";

class Browser {
  private page: puppeteer.Page;
  private browser: puppeteer.Browser;
  
  constructor(public url: string) {}

  async initalize() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const [page] = await this.browser.pages();
    this.page = page;
  }

  protected getUrl(endpoint: string): string {
    return this.url + endpoint;
  }

  async navigateTo(endpoint = "") {
    const url = this.getUrl(endpoint);
    await this.page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
  }

  async typeInSelector(selectorArr: typeSelctor[], delay = 100) {
    for (let i = 0; i < selectorArr.length; i += 1) {
      const selector: typeSelctor = selectorArr[i];
      const input = await this.page.$(selector.selector);
      if (input) {
        await input.type(selector.value, { delay });
      } else {
        throw new Error("Invalid selector for typeInSelector.");
      }
    }
  }

  async clickButton(selector: string) {
    const button = await this.page.$(selector);
    if (button) {
      return button.click();
    }
    throw new Error("Invalid selector for clickButton.");
  }

  async scroll(distance: number) {
    await sleep(getRandomNumber(400, 800));
    return this.page.evaluate(`window.scrollTo(0, ${distance})`);
  }

  async closePage() {
    await sleep(getRandomNumber(500, 2000));
    return this.page.close();
  }

  closeBrowser() {
    return this.browser.close();
  }

}

export default Browser;
