import chalk from "chalk";
/*
 * @function checkGlobalCode
 * @param {Document} document
 * @return {string} Success message if all elements have lang attribute, unique title, and do not use autofocus attribute
 * @return {string} Failure message if any elements do not have a lang attribute, unique titles, use autofocus attributes
 * @throws Error parsing the HTML file
 * @description
 * 2. A Use a lang attribute on the html element.
 * 2. B Provide a unique title for each page or view.
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

      // Global Code B: Provide a unique title for each page or view.
      const titleElements = document.querySelectorAll("title");
      if (!titleElements || titleElements.length === 0) {
        return chalk.red("Missing <title> tag in the HTML file!");
      }

      const titles = Array.from(titleElements).map((title) =>
        title.textContent.trim(),
      );

      const uniqueTitles = [...new Set(titles)];

      if (titles.length !== uniqueTitles.length) {
        return chalk.red(`Non-unique title found: ${titles.join(", ")}`);
      }

      // Global Code C: Avoid using the autofocus attribute.
      if (htmlTag.hasAttribute("autofocus")) {
        return chalk.red("Autofocus attribute exists on the <html> tag:");
      }
    }

    return chalk.green("Global Code check pass!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
