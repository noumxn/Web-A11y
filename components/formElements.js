import chalk from "chalk";

/**
 * @function checkFieldsetLegend
 * @param {Document} document
 * @return {string} Success message if fieldset and legend elements are used appropriately
 * @return {string} Failure message if fieldset and legend elements are missing where required (fieldset must have a legend, vice versa)
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 9.B Use fieldset and legend elements where appropriate.
 * Use fieldset to group them, and legend to provide a label for what this section is for.
 */

export const checkFieldsetLegend = (document) => {
  try {
    const formElements = document.querySelectorAll("form");
    let success = true;

    formElements.forEach((formElement) => {
      const hasFieldset = formElement.querySelector("fieldset");
      const hasLegend = formElement.querySelector("legend");

      if (!hasFieldset && hasLegend) {
        success = false;
        return chalk.red(
          "\nLegend element found without a corresponding fieldset.",
        );
      }

      if (hasFieldset && !hasLegend) {
        success = false;
        return chalk.red(
          "\nFieldset element found without a corresponding legend.",
        );
      }
    });

    return success
      ? chalk.green("\nFieldset and Legend test passed!")
      : chalk.red("\nFieldset and Legend test failed!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
