import chalk from "chalk";

export const checkButtonAccess = async (document) => {
  try {
    const buttons = document.querySelectorAll("button");
    let output = "";
    if (!buttons || buttons.length === 0) {
      output += `${chalk.red("\nNo buttons found.")}`;
      return output;
    }

    for (const [index, button] of Array.from(buttons).entries()) {
      // Check if the button is visible and focusable
      const isButtonVisible = (button) => {
        return (
          button.style.display !== "none" &&
          button.style.visibility !== "hidden" &&
          button.style.opacity !== "0" &&
          !button.disabled
        );
      };

      if (!isButtonVisible(button)) {
        output += `${chalk.yellow(
          `\nButton ${index + 1} is invisible or not focusable.`,
        )}`;
      } else {
        // Focus on the button
        await button.focus();
      }
    }

    if (output.length === 0) {
      output += chalk.green(
        "Keyboard accessibility for all buttons has passed!",
      );
    }

    return output;
  } catch (e) {
    let output = "";
    console.error(`${chalk.red("Error checking accessibility:")} ${e}`);
    return output;
  }
};
