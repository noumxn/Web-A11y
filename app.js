/*
 * @file app.js
 * @description Outward facing interface that calls all the functions that run the application
 **/

import chalk from "chalk";
import fs from "fs-extra";
import { JSDOM } from "jsdom";
import { testAccessibility } from "./components/index.js";
import { __prod__ } from "./constants.js";
import { saveToOutputFile } from "./utils/fileSaver.js";
import { validateHtml } from "./utils/htmlValidator.js";
import { isValidURL } from "./utils/urlValidator.js";
import { scrapeWebsite } from "./utils/webScraper.js";
import { fetchCss } from "./utils/cssUtil.js";
const outputFilePath = "./output.html";

// NOTE: This is to suppress the punycode deprication warning in Node Version 21.0.0
process.noDeprecation = true;

/**
 * @function main()
 * @arg {string} url
 * @arg {string} -m
 * @arg {string} --manual
 **/

async function main() {
  let __manual__ = false;
  let url = undefined;
  let input = process.argv[2];

  if (input === "-m" || input === "--manual") {
    __manual__ = true;
  } else {
    url = input && isValidURL(input) ? input : undefined;
  }

  if (!url && !__manual__) {
    console.error(
      chalk.red(
        "Error: Invalid command.\nUsage:\n\tnpm start <url> | [-m | --manual]",
      ),
    );
    return;
  }

  try {
    let htmlContent;
    let cookieData;
    let hrefs;
    if (!__manual__) {
      // Use axios to fetch html content
      const websiteData = await scrapeWebsite(url);
      htmlContent = websiteData.htmlContent;
      cookieData = websiteData.cookieData;
      hrefs = websiteData.hrefs;

      if (hrefs.length > 0) {
        await fetchCss(url, hrefs);
      }
      // Create a new file with html content
      if (!htmlContent) return;
      await saveToOutputFile(htmlContent);
    } else {
      htmlContent = fs.readFileSync(outputFilePath, "utf-8");
    }

    // Validate HTML content
    const validationResult = await validateHtml(htmlContent);
    if (validationResult === false) {
      console.log(chalk.green("HTML is Valid!"));
    } else {
      console.error(
        chalk.red("HTML is not valid. This is a list of Issues: "),
        validationResult,
      );
      if (__prod__) return;
    }
    console.log("Accessibility Issues:");
    // Load the HTML file
    const data = fs.readFileSync(outputFilePath, "utf-8");
    const dom = new JSDOM(data);
    const { document } = dom.window;
    testAccessibility(document, cookieData);
  } catch (e) {
    console.error("Error:", e);
  }
}
main();
