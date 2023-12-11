import chalk from "chalk";

/**
 * @function checkKeyboardAccessibility
 * @param {Document} document
 * @return {string} Success message if all interactive elements are focusable and are visible
 * @return {string} Failure message if any interactive element is not focusable and are not visible
 * @throws Error parsing the HTML file
 * @kind ERROR
 * @description
 * 3.A
 * Make sure there is a visible focus style for interactive elements that are navigated to via keyboard input.
 * Can a person navigating with a keyboard, switch, voice control, or screen reader see where
 * they currently are on the page?
 * 3.C
 * Check for invisible focusable elements.
 * Remove the ability to focus on elements that are not presently meant to be discoverable.
 * This includes things like inactive drop down menus, off screen navigations, or modals.
 **/

export const checkKeyboardAccessibility = async (document) => {
  try {
    const focusableElements = document.querySelectorAll(
      "button, a[href], input:not([type='hidden']), [tabindex]:not([tabindex='-1'])",
    );

    let output = "";

    if (!focusableElements || focusableElements.length === 0) {
      output += `${chalk.red("\nNo focusable elements found.")}`;
      return output;
    }

    for (const [index, element] of Array.from(focusableElements).entries()) {
      // Check if the element is visible and focusable
      const isElementVisible = (element) => {
        return (
          element.style.display !== "none" &&
          element.style.visibility !== "hidden" &&
          element.style.opacity !== "0" &&
          !element.disabled
        );
      };

      if (!isElementVisible(element)) {
        output += `${chalk.red(
          "\nElement is invisible or not focusable: ",
        )} ${chalk.cyan(element.outerHTML)} (at index ${index})`;
      } else {
        // Focus on the element
        await element.focus();
      }
    }

    if (output.length === 0) {
      return `${chalk.green(
        "Keyboard accessibility for all elements has passed!",
      )}`;
    }

    return output;
  } catch (e) {
    let output = "";
    console.error(`${chalk.red("Error checking accessibility:")} ${e}`);
    return output;
  }
};
