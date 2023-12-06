import axios from "axios";

/*
 * @async
 * @param {string} url
 * @return {htmlContent} Returns string representation of raw HTML
 * @throws Error When fetching using Axios fails
 * @description Fetches HTML content of webpage provided in the URL
 **/

export const scrapeWebsite = async (url) => {
  let response;
  let htmlContent;
  try {
    response = await axios.get(url);
    htmlContent = response.data;
    return htmlContent;
  } catch (e) {
    throw `Failed to fetch data from ${url}. Please ensure valid URL is provided.`;
  }
};
