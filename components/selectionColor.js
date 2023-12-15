import { ratio } from "wcag-color";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import toHex from "colornames";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const cssFilePath = path.resolve(scriptDirectory, cssPath);

/**
 * @function checkSelectionContrast
 * @param {document} Document
 * @param {string} cssFilePath
 * @return {string} Success message if ::selection color contrast for all elements is greater than 4.5:1
 * @return {string} Failure message if ::selection color contrast for any element is less than 4.5:1
 * @desc ERROR
 * @description
 * 15.F
 * Check if the contrast ratio in ::selection CSS declarations is greater than 4.5:1
 */
export const checkSelectionContrast = async (document) => {
  try {
    const elements = new Set(
      [...document.querySelectorAll("*")].map((el) => el.tagName.toLowerCase()),
    );
    const cssContent = await fs.readFile(cssFilePath, "utf8");

    let output = "";
    const selectionRegex = /([a-z]+)::selection\s*\{([^}]+)\}/gi;
    let match;

    while ((match = selectionRegex.exec(cssContent)) !== null) {
      const tag = match[1];
      const style = match[2];

      if (elements.has(tag)) {
        const colorMatch = style.match(/color\s*:\s*(#[0-9a-fA-F]{3,6}|\w+)/);
        const bgColorMatch = style.match(
          /background-color\s*:\s*(#[0-9a-fA-F]{3,6}|\w+)/,
        );

        if (colorMatch && bgColorMatch) {
          let color = colorMatch[1];
          let bgColor = bgColorMatch[1];
          try {
            if (!isColorString(color)) {
              color = toHex(color);
            }
            if (!isColorString(bgColor)) {
              bgColor = toHex(bgColor);
            }
            let rat = ratio(color, bgColor);

            if (rat < 3) {
              output += `${chalk.red(
                `\nLow contrast in ::selection for <${tag}>: ${color} on ${bgColor}, ratio: ${rat}`,
              )}\n`;
            }
          } catch (e) {
            continue;
          }
        }
      }
    }

    return output.length === 0
      ? chalk.green("\nSelection Color Contrast test passed!")
      : output;
  } catch (e) {
    return `${chalk.red("Error processing the files:")}${e}`;
  }
};

const isColorString = (inputString) => {
  const regex =
    /^(#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})|rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)|hsl\((\d{1,3}),\s*([1-9]?[0-9]%,\s*100%|[1-9]?[0-9]%,\s*[1-9]?[0-9]%))$/;
  return regex.test(inputString);
};
