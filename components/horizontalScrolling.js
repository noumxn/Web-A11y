import fs from "fs/promises";
import chalk from "chalk";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const cssFilePath = path.resolve(scriptDirectory, cssPath);

/**
 * @function checkHorizontalScrolling
 * @param {Document} document
 * @return {string} Success message if the main container has no horizontal scrolling.
 * @return {string} Warning message if the main container has horizontal scrolling.
 * @throws Error reading the CSS file or processing the HTML.
 */
export const checkHorizontalScrolling = async (document) => {
  try {
    let output = "";

    const hasMainContainerScroll = await hasHorizontalScrolling(document.body);

    if (hasMainContainerScroll) {
      output += chalk.red("\nThe main container has horizontal scrolling.");
    } else {
      output += chalk.green("\nHorizontal scrolling test passed!");
    }

    return output;
  } catch (err) {
    console.error(err);
    return `${chalk.red(
      "Error reading the CSS file or processing the HTML:",
    )} ${err}`;
  }
};

const getCssContent = async () => {
  try {
    const cssContent = await fs.readFile(cssFilePath, "utf8");
    return cssContent;
  } catch (err) {
    throw new Error(`Error reading the CSS file: ${err}`);
  }
};
const hasHorizontalScrolling = async (element) => {
  const horizontalScrollRegex = /overflow-x\s*:\s*auto|scroll/i;

  const inlineStyle = element.style.overflowX;
  const computedStyle =
    element.ownerDocument.defaultView.getComputedStyle(element).overflowX;

  const cssContent = await getCssContent();

  const hasScroll =
    horizontalScrollRegex.test(inlineStyle) ||
    horizontalScrollRegex.test(computedStyle) ||
    horizontalScrollRegex.test(cssContent);

  const hasElementScroll = element.scrollWidth > element.clientWidth;

  if (hasScroll || hasElementScroll) {
    return true;
  }

  for (const childElement of element.children) {
    if (await hasHorizontalScrolling(childElement)) {
      return true;
    }
  }

  return false;
};
