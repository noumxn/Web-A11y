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
 * @function checkInteractiveElementSize
 * @return {string} A success message if interactive elements have the required size in the CSS.
 * @return {string} A warning message if elements with insufficient size are found.
 * @throws Error reading the CSS file.
 * @description
 * Check that interactive elements like buttons and links have a size of at least 44 x 44 pixels.
 */
export const checkInteractiveElementSize = async () => {
  try {
    let output = "";
    const cssContent = await getCssContent();

    const hasInsufficientSize = /(\bbutton\b|\ba\b)[^}]*\bwidth\b[^:]*:\s*44px[^}]*\bheight\b[^:]*:\s*44px/i.test(
        cssContent,
      );

    if (hasInsufficientSize) {
      output += chalk.green("Interactive element size test passed!");
    } else {
      output += chalk.yellow(
        "Warning: Some interactive elements have insufficient size. Ensure buttons and links are at least 44 x 44 pixels.",
      );
    }

    return output;
  } catch (err) {
    console.error(err);
    return `${chalk.red("Error reading the CSS file:",)} ${err}`;
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
