import fs from "fs-extra";
import axios from "axios";

/**
 * @function fetchCss
 * @param {string[]} hrefs - Array of CSS links
 * @description Fetches and saves CSS content to a file called 'output.css'
 **/
export const fetchCss = async (url, hrefs) => {
  try {
    const outputFilePath = "output.css";

    for (let i = 0; i < hrefs.length; i++) {
      if (hrefs[i][0] === "/") {
        hrefs[i] = url + hrefs[i];
      }
    }

    const responses = await Promise.allSettled(
      hrefs.map((link) => axios.get(link)),
    );

    const successfulResponses = responses
      .filter((response) => response.status === "fulfilled")
      .map((response) => response.value.data);

    const combinedCSS = successfulResponses.join("\n");

    fs.writeFileSync(outputFilePath, combinedCSS);

    console.log("CSS content saved to output.css");
  } catch (error) {
    throw `Failed to fetch or save CSS data: ${error.message}`;
  }
};
