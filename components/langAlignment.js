import chalk from "chalk";

/*
 * @function checkTextAlignment
 * @param {Document} document
 * @return {string} Success message if text alignment is correct
 * @return {string} Warning message if text alignment is incorrect
 * @desc ERROR
 * @description
 * 1.C
 * Use left-aligned text for left-to-right (LTR) languages, and right-aligned text for right-to-left (RTL) languages.
 **/

export const checkTextAlignment = (document) => {
  try {
    let output = "";
    const elementsWithText = document.querySelectorAll("p, div, span");

    const checkAlignment = (element, expectedAlignment) => {
      const computedAlignment = window
        .getComputedStyle(element)
        .getPropertyValue("text-align");
      if (computedAlignment.trim() !== expectedAlignment) {
        output += `${chalk.red(
          `Incorrect text alignment for ${expectedAlignment} languages:`,
        )}${chalk.cyan(element.outerHTML)}`;
      }
    };

    elementsWithText.forEach((element) => {
      const langAttribute = element.getAttribute("lang");
      if (langAttribute) {
        const lang = langAttribute.toLowerCase();
        if (lang === "ar" || lang.startsWith("ar-")) {
          // RTL language
          checkAlignment(element, "right");
        } else {
          // LTR language
          checkAlignment(element, "left");
        }
      }
    });

    if (output.length === 0) {
      return chalk.green("Text Alignment test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
