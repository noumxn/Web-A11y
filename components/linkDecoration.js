import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const cssFilePath = path.resolve(scriptDirectory, cssPath);

/*
 * @function checkLinkDecoration
 * @param {Document} document
 * @return {string} Success message if all links are underlined
 * @return {string} Warning message if a link is found without corresponding CSS property in the stylesheet
 * @return {string} Failure message if any link is missing the underline decoration in CSS
 * @throws Error parsing the HTML file or CSS file
 * @desc WARNING|ERROR
 * @description
 * 7.B
 * Ensure that links are recognizable as links. Color alone is not sufficient.
 * Underlines are a popular and commonly-understood way to communicate the presence of link content.
 **/

export const checkLinkDecoration = async (document) => {

  try {
    let output = "";
    const links = document.querySelectorAll('a');
    // Read the content of the CSS file asynchronously using fs.promises.readFile
    const cssContent = await fs.readFile(cssFilePath, 'utf8');

    links.forEach((element) => {
      const linkStyles = getLinkStyles(element, cssContent) || getInlineStyles(element);

      if (!linkStyles) {
        output +=
          `${chalk.yellow("\nLink found without corresponding CSS property or inline style:")}${chalk.cyan(
            element.outerHTML,
          )}`;
      } else if (!linkStyles.some(style => style.includes("text-decoration: underline"))) {
        output +=
          `${chalk.red("\nLink without underline decoration in CSS:")}${chalk.cyan(
            element.outerHTML,
          )}`;
      }
    });

    if (output.length === 0) {
      return chalk.green("Link Decoration test passed!");
    } else {
      return output;
    }
  } catch (err) {
    return `${chalk.red("Error parsing the HTML or CSS file:")}${err}`;
  }
};

const getLinkStyles = (element, cssContent) => {
  const styles = [];
  const selector = element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : '');
  const regex = new RegExp(`${selector}\\s*\\{([^}]+)\\}`);
  const match = cssContent.match(regex);

  if (match) {
    const properties = match[1].split(';');
    properties.forEach(property => {
      const trimmedProperty = property.trim();
      if (trimmedProperty) {
        styles.push(trimmedProperty.toLowerCase());
      }
    });
  }

  return styles.length > 0 ? styles : null;
};

const getInlineStyles = (element) => {
  const styles = [];
  const inlineStyle = element.getAttribute("style");

  if (inlineStyle) {
    const properties = inlineStyle.split(';');
    properties.forEach(property => {
      const trimmedProperty = property.trim();
      if (trimmedProperty) {
        styles.push(trimmedProperty.toLowerCase());
      }
    });
  }

  return styles.length > 0 ? styles : null;
};
