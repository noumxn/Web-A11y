import chalk from "chalk";

/**
 * @function checkHeadings
 * @param {Document} document
 * @return {string} Success message if there is exactly one H1 tag
 * @return {string} Failure message if there are zero or more than one H1 tags
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 5.B
 * Use heading elements to introduce content.
 * The h1 element should be used to communicate the high-level purpose of the page or view.
 * Do not use the h1 element for a heading that does not change between pages or
 * views (for example, the site's name).
 **/

export const checkHeadings = (document) => {
  try {
    const h1Headings = document.querySelectorAll("h1");
    const numH1Headings = h1Headings.length;

    if (numH1Headings <= 1) {
      return chalk.green("\nH1 Tag test passed!");
    } else {
      let output = chalk.red("\nMore than one H1 tag found on the web-page:");
      h1Headings.forEach((element, _index) => {
        output += `\n${chalk.cyan(element.outerHTML)}`;
      });
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
