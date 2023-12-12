import axios from "axios";
import { JSDOM } from "jsdom";

/**
 * @async
 * @param {string} url
 * @return {Object} Returns an Object containing the htmlContent, cookieData and hrefs of CSS Stylesheets
 * @throws Error When fetching using Axios fails
 * @description
 * Fetches HTML content of webpage provided in the URL, the session data, and an array of hrefs of CSS stylesheets
 **/

export const scrapeWebsite = async (url) => {
  let response;
  let htmlContent;
  let cookieData;

  try {
    response = await axios.get(url);

    htmlContent = response.data;
    cookieData = response.headers["set-cookie"];
    const dom = new JSDOM(htmlContent);
    const { document } = dom.window;
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const hrefs = Array.from(stylesheets).map((link) =>
      link.getAttribute("href"),
    );

    return { htmlContent: htmlContent, cookieData: cookieData, hrefs: hrefs };
  } catch (e) {
    throw `Failed to fetch data from ${url}. Please ensure valid URL is provided.`;
  }
};
