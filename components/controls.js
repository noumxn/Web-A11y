import chalk from "chalk";

/**
 * @function checkLinkElements
 * @param {Document} document
 * @return {string} Success message if all links use the a element
 * @return {string} Failure message if any links do not use the a element
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 7.A
 * The a element should be used
 * Links should always have a href attribute, even when used in Single Page Applications
 * (SPAs). Without a href attribute, the link will not be properly exposed to assistive
 * technology. An example of this would be a link that uses an onclick event, in place
 * of a href attribute.
 **/

export const checkLinkElements = (document) => {
  const links = document.querySelectorAll("[href]");

  for (const link of links) {
    const nodeElement = link.nodeName.toLowerCase();
    if (nodeElement !== "a" && nodeElement !== "link") {
      return chalk.red(
        `Element with href="${link.getAttribute(
          "href",
        )}" is not an <a> element. Element is ${link.outerHTML}`,
      );
    }
  }

  return chalk.green("All elements with href attributes use the <a> element!");
};

/**
 * @function checkFocusStyles
 * @param {Document} document
 * @return {string} Success message if all control items (a with href, button, input, textarea, select) has a :focus state
 * @return {string} Failure message if any control items do not have a :focus state
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 7.C
 * Control elements are expected to have :focus states so that users will know to interact with it.
 * Visible focus styles help people determine which interactive element has keyboard
 * focus. This lets them know that they can perform actions like activating a button or
 * navigating to a link's destination.
 **/

export const checkFocusStyles = (document) => {
  const controls = document.querySelectorAll(
    "a[href], button, input, textarea, select",
  );

  for (const control of controls) {
    const nodeElement = control.nodeName.toLowerCase();
    if (
      nodeElement == "a" ||
      nodeElement == "button" ||
      nodeElement == "input" ||
      nodeElement == "textarea" ||
      nodeElement == "select"
    ) {
      if (document.activeElement == control) {
        return chalk.red(
          `Element ${control.outerHTML} does not have a :focus state.`,
        );
      }
    }
  }

  return chalk.green("All control elements attributes have a :focus state!");
};
