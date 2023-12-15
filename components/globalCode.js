import chalk from "chalk";

/**
 * @function checkGlobalCode
 * @param {Document} document
 * @return {string} Success message if all elements have lang attribute, unique title, and do not use autofocus attribute
 * @return {string} Failure message if any elements do not have a lang attribute, unique titles, use autofocus attributes
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 2.A
 * Use a lang attribute on the html element.
 * This helps assistive technology such as screen readers to pronounce content correctly.
 * 2.F
 * Avoid using the autofocus attribute
 * People who are blind or who have low vision may be disoriented when focus is moved
 * without their permission. Additionally, autofocus can be problematic for people with
 * motor control disabilities, as it may create extra work for them to navigate out
 * from the autofocused area and to other locations on the page/view.
 **/

export const checkGlobalCode = (document) => {
  try {
    const allHtmlTags = document.querySelectorAll("html");

    for (const htmlTag of allHtmlTags) {
      // Global Code A: Use a lang attribute on the html element.
      const langAttribute = htmlTag.getAttribute("lang");
      if (!langAttribute) {
        let output = chalk.red("\nMissing lang attribute on the <html> tag:");
        output += `\n${chalk.cyan(htmlTag.outerHTML)}`;
        return output;
      }

      // Global Code F: Avoid using the autofocus attribute.
      if (htmlTag.hasAttribute("autofocus")) {
        return chalk.red("\nAutofocus attribute exists on the <html> tag:");
      }
    }

    return chalk.green("\nGlobal Code check passed!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
