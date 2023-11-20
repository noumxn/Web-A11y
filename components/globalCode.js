import chalk from "chalk";
/*
 * @function checkGlobalCode
 * @param {Document} document
 * @return {string} Success message if all elements have lang attribute, unique title, and do not use autofocus attribute
 * @return {string} Failure message if any elements do not have a lang attribute, unique titles, use autofocus attributes
 * @type ERROR
 * @throws Error parsing the HTML file
 * @description
 * 1. A Use a lang attribute on the html element.
 * 2. F Avoid using the autofocus attribute
 **/

export const checkGlobalCode = (document) => {
  try {
    const allHtmlTags = document.querySelectorAll("html");

    for (const htmlTag of allHtmlTags) {
      // Global Code A: Use a lang attribute on the html element.
      const langAttribute = htmlTag.getAttribute("lang");
      if (!langAttribute) {
        let output = chalk.red("Missing lang attribute on the <html> tag:");
        output += `\n${chalk.cyan(htmlTag.outerHTML)}`;
        return output;
      }

      // Global Code F: Avoid using the autofocus attribute.
      if (htmlTag.hasAttribute("autofocus")) {
        return chalk.red("Autofocus attribute exists on the <html> tag:");
      }
    }

    return chalk.green("Global Code check pass!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
