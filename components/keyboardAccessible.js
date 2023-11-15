import chalk from "chalk";
/*
 * @function checkKeyboardAccessibility
 * @param {Document} document
 * @return {string} Success message if all interative elements are focusable and are visible
 * @return {string} Failure message if any complex element are not focusable and are not visible
 * @throws Error parsing the HTML file
 * @description 
 * 3.A
 * Make sure there is a visible focus style for interactive elements that are navigated to via keyboard input.
 * 3.C
 * Check for invisible focusable elements.
 **/

export const checkKeyboardAccessibility = async (document) => {
  try {
    
    const focusableElements = document.querySelectorAll(
      "button, a[href], input:not([type='hidden']), [tabindex]:not([tabindex='-1'])"
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
        output += `${chalk.yellow(
          `\nElement ${index + 1} is invisible or not focusable.`
        )}`;
      } else {
        // Focus on the element
        await element.focus();
      }
    }

    if (output.length === 0) {
      output += chalk.green("Keyboard accessibility for all elements has passed!");
    }

    return output;
  } catch (e) {
    console.error(`${chalk.red("Error checking accessibility:")} ${e}`);
    return output;
  }
};
