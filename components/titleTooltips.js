import chalk from "chalk";

/*
 * @function checkTooltips
 * @param {Document} document
 * @return {string} Success message if no elements with tooltips have a title attribute
 * @return {string} Failure message if any elements with tooltips have a title attribute
 * @throws Error parsing the HTML file
 * @desc WARNING
 * @description
 * 2.H Confirm the absence of tooltips with the title attribute.
 */

export const checkTitleTooltips = (document) => {
  try {
    let output = "";
    const elementsWithTooltips = document.querySelectorAll("[title]");

    for (let element of elementsWithTooltips) {
      const titleAttribute = element.getAttribute("title");
      if (titleAttribute) {
        output += `${chalk.yellow(
          "\nElement with title attribute for tooltip:",
        )}${chalk.cyan(element.outerHTML)}`;
      }
    }

    if (output.length === 0) {
      return chalk.green("Tooltips test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
