/***
 *checks if a page title is accessible
 ***/

import chalk from "chalk";

export const checkButtonAccess = async (document) => {
  try {
    const button = document.querySelector("button");
    let output = "";
    if (!button) {
      output += `${chalk.red("\nButton is not found.")}`;
      return output;
    } else {
      await button.focus();
      if (output.length == 0) {
        output += chalk.green(
          "Keyboard accessiblity for all buttons have passed!"
        );
        return output;
      }
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
