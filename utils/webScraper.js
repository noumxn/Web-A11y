import {chromium} from 'playwright';

/*
 * @param {url} String
 * @description Fetches HTML content of webpage provided in the URL
 * @return {htmlContent} Returns string representation of raw HTML
 **/

export const scrapeWebsite = async (url, timeout = 300000) => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, {timeout});
    const htmlContent = await page.content();
    await browser.close();


    return htmlContent;

  } catch (e) {
    console.error("Error while fetching HTML content: ", e)
  }
}
