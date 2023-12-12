import chalk from "chalk";

/**
 * @function checkLists
 * @param {Document} document
 * @return {string} Success message if all lists use ol, ul, and dl elements
 * @return {string} Failure message if any lists do not use ol, ul, and dl elements
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 6.A
 * Use list elements (ol, ul, and dl elements) for list content.
 * This may include sections of related content, items visually
 * displayed in a grid-like layout, or sibling a elements.
 **/

export const checkLists = (document) => {
  try {
    const listPoints = [
      "\u2022",
      "\u25E6",
      "\u2023",
      "\u2043",
      "\u25B9",
      "\u25AA",
      "\u25A0",
      "*",
      "-",
    ];
    let msg = "";

    listPoints.forEach((element) => {
      if (document.body.textContent.includes(element)) {
        msg += element;
      }
    });

    if (msg == "") {
      return chalk.green("No list content outside of list elements!");
    } else {
      return chalk.red(
        "Use list elements (<ul>, <ol>, <dl>) for list content instead of " +
          msg,
      );
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
