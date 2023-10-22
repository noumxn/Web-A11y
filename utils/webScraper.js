import axios from "axios";

/*
 * @param {url} String
 * @description Fetches HTML content of webpage provided in the URL
 * @return {htmlContent} Returns string representation of raw HTML
 **/

export const scrapeWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    return htmlContent;
  } catch (e) {
    console.error("Error while fetching HTML content: ", e);
  }
};
