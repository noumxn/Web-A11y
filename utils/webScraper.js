import axios from "axios";

/*
 * @async
 * @param {string} url
 * @return {htmlContent} Returns string representation of raw HTML
 * @throws Error When fetching using Axios fails
 * @description Fetches HTML content of webpage provided in the URL
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
