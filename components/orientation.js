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
 * @function checkOrientationSupport
 * @return {string} A success message if there are media queries supporting rotation in the CSS.
 * @return {string} A warning message if no media queries related to orientation are found.
 * @throws Error reading the CSS file or processing the HTML.
 * @desc WARNING
 * @description
 * 16. A Check that the site can be rotated to any orientation.
 */
export const checkOrientationSupport = async () => {
  try {
    let output = "";
    const cssContent = await getCssContent();

    // Check if there are any @media queries with orientation in the CSS
    const hasOrientationMediaQuery = /@media\s*\(orientation:[^}]+}/i.test(
      cssContent,
    );

    if (hasOrientationMediaQuery) {
      output += chalk.green("\nRotation support test passed!");
    } else {
      output += chalk.yellow(
        "\nNo @media queries with orientation found in the CSS. Consider setting orientation styles.",
      );
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
