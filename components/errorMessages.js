import chalk from "chalk";

/**
 * @function checkErrorMessage
 * @param {string} document - HTML content in DOM-readable form
 * @return {string} Success message if form input errors are displayed above the form
 * @return {string} Failure message if form input errors are not displayed above the form
 * @throws Error parsing the HTML file
 * @desc WARNING
 * @description
 * 4.E
 * Ensure that form input errors are displayed in a list above the form after submission.
 * Displaying form input errors above the form after submission helps users easily identify and
 * address issues with their input.
 **/

export const checkErrorMessage = (document) => {
  try {
    // Simulate form submission
    const form = document.querySelector("form");
    let isValid = null;

    // Check for error messages
    if (form) {
      form.reportValidity();
      isValid = form.checkValidity();
    }

    const error =
      document.querySelector(".error-list") ||
      document.querySelector(".errorList") ||
      document.querySelector(".error") ||
      document.querySelector(".errors");

    if (!form || (!isValid && error)) {
      return chalk.green("\nForm Errors Display test passed!");
    } else {
      return `${chalk.yellow(
        `Form with id="${form.id}" may not be throwing appropriate errors for invalid submission.`,
      )}`;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
