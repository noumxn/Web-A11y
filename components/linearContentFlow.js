import chalk from "chalk";

/**
 * @function checkLinearContentFlow
 * @param {Document} document
 * @return {string} Success message if there is a linear content flow and all tabindex values are 0 or -1 or no elements with tabindex values.
 * @return {string} Warning message if any element has a tabindex value other than 0 or -1.
 * @throws Error reading the HTML file.
 */
export const checkLinearContentFlow = async (document) => {
  try {
    let output = "";

    const elementsWithTabindex = document.querySelectorAll("[tabindex]");

    elementsWithTabindex.forEach((element) => {
      const tabIndexValue = parseInt(element.getAttribute("tabindex"), 10);
      if (
        !isNaN(tabIndexValue) &&
        tabIndexValue !== 0 &&
        tabIndexValue !== -1
      ) {
        output += chalk.red(
          `Element with ID '${element.id}' has tabindex value ${tabIndexValue}. It should be 0 or -1.\n`,
        );
      }
    });

    if (elementsWithTabindex.length === 0 || output === "") {
      output += chalk.green(
        "Linear content flow check passes! All tabindex values are 0 or -1 or there are no elements with tabindex values.",
      );
    }
    return output;
  } catch (err) {
    console.error(err);
    return `${chalk.red("Error reading the HTML file:")} ${err}`;
  }
};
