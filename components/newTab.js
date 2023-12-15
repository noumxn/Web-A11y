import chalk from "chalk";

/**
 * @function checkNewTab
 * @param {Document} document
 * @return {string} Success message if all links opening in new tabs have appropriate warnings
 * @return {string} Failure message if any link opening in a new tab is missing the required warnings
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 7.F
 * Make sure that links that open in new windows or tabs inform users of the change in context.
 * When a link opens in a new window or tab, assistive technologies may not automatically
 * announce this change in context. Visual users may also miss this information.
 **/

export const checkNewTab = (document) => {
  try {
    let output = "";
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach((element) => {
      const hasRelNoOpener =
        element.hasAttribute("rel") &&
        element.getAttribute("rel").includes("noopener");
      const hasRelNoReferrer =
        element.hasAttribute("rel") &&
        element.getAttribute("rel").includes("noreferrer");

      if (!hasRelNoOpener && !hasRelNoReferrer) {
        output =
          output +
          `${chalk.red(
            "\nLink opening in a new tab without appropriate warnings:",
          )}${chalk.cyan(element.outerHTML)}`;
      }
    });
    if (output.length === 0) {
      return chalk.green("\nNew Tab Warning test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
