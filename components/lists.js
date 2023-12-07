import chalk from "chalk";

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
