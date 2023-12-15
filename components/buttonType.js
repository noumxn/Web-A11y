import chalk from "chalk";

/**
 * @function checkButtonType
 * @param {Document} document
 * @return {string} Success message if all non-submit buttons have type="button"
 * @return {string} Failure message if any non-submit button is missing type="button"
 * @throws Error parsing the HTML file
 * @desc 7.D. Check if buttons not intended for form submission have type="button" attribute
 **/
export const checkButtonType = (document) => {
  try {
    let output = "";
    const buttons = document.querySelectorAll('button:not([type="submit"])');
    buttons.forEach((button) => {
      if (
        !button.hasAttribute("type") ||
        button.getAttribute("type") !== "button"
      ) {
        output += `${chalk.red(
          `\nFound a non-submit button without type="button":`,
        )}${chalk.cyan(button.outerHTML)}`;
      }
    });
    if (output.length === 0) {
      return chalk.green("\nButton Type test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
