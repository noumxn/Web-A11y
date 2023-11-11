/*
 * @file app.js
 * @description Outward facing interface that calls all the functions that run the application
 **/

import fs from 'fs-extra';
import chalk from 'chalk';
import {testAccessibility} from './components/index.js';
import {scrapeWebsite} from './utils/webScraper.js';
import {validateHtml} from './utils/htmlValidator.js';
import {saveToOutputFile} from './utils/fileSaver.js';
import {JSDOM} from 'jsdom';
import {__manual__, __prod__} from './constants.js';
const outputFilePath = "./output.html"

// NOTE: This is to suppress the punycode deprication warning in Node Version 21.0.0
process.noDeprecation = true;

/*
 * @function main()
 * @arg {string} url | process.argv[2]
 **/

(async () => {
  const url = process.argv[2];

  if (!url && !__manual__) {
    console.error(chalk.red('Error: Please provide a valid URL.'));
    return;
  }

  try {
    let htmlContent;
    if (!__manual__) {
      // Use axios to fetch html content
      htmlContent = await scrapeWebsite(url);
      // Create a new file with html content
      await saveToOutputFile(htmlContent);
    } else {
      htmlContent = fs.readFileSync(outputFilePath, "utf-8")
    }

    // Validate HTML content
    const validationResult = await validateHtml(htmlContent);
    if (validationResult === false) {
      console.log(chalk.green("HTML is Valid!"));
    } else {
      console.error(chalk.red("HTML is not valid. This is a list of Issues: "), validationResult);
      if (__prod__) return
    }
  } catch (e) {
    console.error('Error:', e);
  }

  try {
    console.log("Accessibility Issues:")
    // Load the HTML file
    const data = fs.readFileSync(outputFilePath, 'utf-8');
    const dom = new JSDOM(data);
    const {document} = dom.window;
    testAccessibility(document);
  } catch (e) {
    console.error(e);
  }
})();
