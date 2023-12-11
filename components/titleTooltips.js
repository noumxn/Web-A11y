import chalk from "chalk";

/**
 * @function checkTitleTooltips
 * @param {Document} document
 * @return {string} Success message if no elements with tooltips have a title attribute
 * @return {string} Failure message if any elements with tooltips have a title attribute
 * @throws Error parsing the HTML file
 * @desc WARNING
 * @description
 * 2.I Confirm the absence of tooltips with the title attribute.
 * The title attribute has numerous issues, and should not be used if the information
 * provided is important for all people to access. An acceptable use for the title
 * attribute would be labeling an iframe element to indicate what content it contains.
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
