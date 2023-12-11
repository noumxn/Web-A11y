import chalk from "chalk";

/**
 * @function checkSkipLinks
 * @param {Document} document
 * @return {string} Success message skip link is present on web page
 * @return {string} Failure message skip link is missing
 * @throws Error parsing the HTML file
 * @desc WARNING
 * @description
 * 7.E
 * Provide a skip link and make sure that it is visible when focused.
 * A skip link can be used to provide quick access to the main content of a page or view.
 * This allows a person to easily bypass globally repeated content such as a website's
 * primary navigation, or persistent search widget.
 * @todo Make sure skip links are visible when focused
 **/

export const checkSkipLinks = (document) => {
  try {
    const images = document.querySelectorAll('a, [role="a"]');
    let hasSkip = false;
    images.forEach((element, _index) => {
      var linkPattern = new RegExp("#main[\\w-]*", "i");
      const link = element.getAttribute("href");
      if (linkPattern.test(link)) {
        hasSkip = true;
      }
    });
    if (hasSkip) {
      return chalk.green("Skip Link test passed!");
    } else {
      return chalk.yellow("Missing skip link");
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
