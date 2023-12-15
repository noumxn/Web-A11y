import chalk from "chalk";

/*
 * @function checkElementContent
 * @param {Document} document
 * @return {string} Success message if all elements have unique and descriptive content
 * @return {string} Warning message if an element is found with non-unique or non-descriptive content
 * @desc WARNING|ERROR
 * @description
 * 7.C
 * Ensure that <button>, <a>, and <label> element content is unique and descriptive.
 **/

export const checkElementContent = (document) => {
  try {
    let output = "";
    const buttons = document.querySelectorAll("button");
    const links = document.querySelectorAll("a");
    const labels = document.querySelectorAll("label");

    // Helper function to check if content is unique and descriptive
    const isUniqueAndDescriptive = (element) => {
      const content = element.textContent.trim();
      if (!content) {
        output += `${chalk.red("\nElement with empty content:")}${chalk.cyan(
          element.outerHTML,
        )}`;
      } else if (content.length < 3) {
        output += `${chalk.yellow(
          "\nElement with non-descriptive content:",
        )}${chalk.cyan(element.outerHTML)}`;
      }
    };

    buttons.forEach((element) => {
      isUniqueAndDescriptive(element);
    });

    links.forEach((element) => {
      isUniqueAndDescriptive(element);
    });

    labels.forEach((element) => {
      isUniqueAndDescriptive(element);
    });

    if (output.length === 0) {
      return chalk.green("\nElement Content test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
