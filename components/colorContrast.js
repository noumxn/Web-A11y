import fs from 'fs/promises';
import {ratio as contrastRatio} from 'wcag-color';
import chalk from 'chalk';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const cssFilePath = path.resolve(scriptDirectory, cssPath);

/**
 * @function checkColorContrasts
 * @param {Document} document
 * @return {string} Success message if color contrast between all connected elements is more than 4.5:1
 * @return {string} Failure message if color contrast between any connected elements is less than 4.5:1
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 15.A
 * Check the contrast for all normal-sized text.
 * 15.B
 * Check the contrast for all large-sized text.
 * 15.D
 * Check the contrast of borders for input elements (text input, radio buttons, checkboxes, etc.).
 **/

export const checkColorContrasts = async (document) => {
  try {
    let output = "";
    const cssContent = await fs.readFile(cssFilePath, 'utf8');

    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      if (element.parentElement) {
        const parentColor = getColorFromCSS(element.parentElement, cssContent) || getInlineColor(element.parentElement);
        const elementColor = getColorFromCSS(element, cssContent) || getInlineColor(element);

        if (parentColor && elementColor) {
          const contrast = contrastRatio(elementColor, parentColor);
          if (contrast < 4.5) {
            output += `${chalk.red("Low contrast between element and parent:")} ${element.outerHTML} (Contrast ratio: ${contrast})\n`;
          }
        }
      }
    });

    return output.length === 0 ? chalk.green("Color contrast test passed!") : output;
  } catch (err) {
    return `${chalk.red("Error processing the document or CSS file:")}${err}`;
  }
};

const getColorFromCSS = (element, cssContent) => {
  if (!element || !element.tagName) return null;
  const classSelector = element.className ? `.${element.className.toString().split(' ').join('.')}` : '';
  const selector = element.tagName.toLowerCase() +
    (element.id ? `#${element.id}` : '') +
    classSelector;
  const regex = new RegExp(`${selector}\\s*\\{([^}]+)\\}`, 'i');
  const match = cssContent.match(regex);

  if (match) {
    const properties = match[1].split(';');
    for (const property of properties) {
      const trimmedProperty = property.trim().toLowerCase();
      if (trimmedProperty.startsWith('color:')) {
        return trimmedProperty.split(':')[1].trim();
      }
    }
  }
  return null;
};

const getInlineColor = (element) => {
  if (!element || !element.getAttribute) return null;
  const inlineStyle = element.getAttribute("style");
  if (inlineStyle) {
    const properties = inlineStyle.split(';');
    for (const property of properties) {
      const trimmedProperty = property.trim().toLowerCase();
      if (trimmedProperty.startsWith('color:')) {
        return trimmedProperty.split(':')[1].trim();
      }
    }
  }
  return null;
};
