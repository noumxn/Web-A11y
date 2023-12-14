import chalk from "chalk";

/**
 * @function checkAutocomplete
 * @param {Document} document
 * @return {string} Success message if all input and textarea tags have the autocomplete attribute
 * @return {string} Failure message if any input or textarea tag is missing the autocomplete attribute
 * @throws Error parsing the HTML file
 * @desc WARNING
 * @description
 * 9.C
 * Ensure that input fields and textareas have the autocomplete attribute.
 * The autocomplete attribute helps users complete forms more easily by allowing the browser
 * to automatically fill in commonly used values, such as names, addresses, and credit card numbers.
 **/

export const checkAutocomplete = (document) => {
  try {
    let output = "";
    const inputFields = document.querySelectorAll(
      'input:not([type="hidden"]), textarea',
    );
    inputFields.forEach((element) => {
      const hasAutocomplete = element.hasAttribute("autocomplete");

      if (!hasAutocomplete) {
        // If the element is an input tag, val should be input, otherwise, it should be textarea. How do I do that?
        const val =
          element.tagName.toLowerCase() === "input" ? "Input" : "Textarea";
        output += `${chalk.yellow(
          `\n${val} may need autocomplete:`,
        )}${chalk.cyan(element.outerHTML)}`;
      }
    });
    if (output.length === 0) {
      return chalk.green("\nAutocomplete Attribute test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
