import chalk from "chalk";

/**
 * @function checkTableStructure
 * @param {Document} document
 * @return {string} Success message if all table elements are valid
 * @return {string} Failure message if any table elements are invalid
 * @throws Error parsing the HTML file
 * @description
 * 8.A
 * Use the table element to describe tabular data.
 **/

export const checkTableStructure = (document) => {
  const tables = document.querySelectorAll("table");

  for (const table of tables) {
    if (table.querySelector("thead") == null) {
      return chalk.red(
        `An invalid table was found. The table is missing a <thead>.`,
      );
    }
    if (table.querySelector("tbody") == null) {
      return chalk.red(
        `An invalid table was found. The table is missing a <tbody>.`,
      );
    }
  }

  return chalk.green("All table elements are valid!");
};

/*
 * @function checkTableHeaders
 * @param {Document} document
 * @return {string} Success message if all table header elements are valid
 * @return {string} Failure message if any table header elements are invalid
 * @throws Error parsing the HTML file
 * @description
 * 8.B
 * Use the th element for table headers (with appropriate scope attributes).
 **/

export const checkTableHeaders = (document) => {
  const tables = document.querySelectorAll("table");

  for (const table of tables) {
    if (table.querySelector("thead") != null) {
      const header = table.querySelector("thead");
      if (
        header.querySelector("th") == null &&
        header.querySelector("td") == null
      ) {
        return chalk.red(`The table header is missing <th> element(s).`);
      }
      if (header.querySelector("td") != null) {
        return chalk.red(
          `The table header contain(s) <td> element(s) where it should be <th>.`,
        );
      }
    }
  }

  return chalk.green("All table header elements are valid!");
};

/*
 * @function checkTableCaptions
 * @param {Document} document
 * @return {string} Success message if all tables contain captions
 * @return {string} Failure message if any table does not contain captions
 * @throws Error parsing the HTML file
 * @description
 * 8.C
 * Use the caption element to provide a title for the table.
 **/

export const checkTableCaptions = (document) => {
  const tables = document.querySelectorAll("table");

  for (const table of tables) {
    if (table.querySelector("caption") == null) {
      return chalk.red("Table(s) are missing the caption element.");
    }
  }

  return chalk.green("All tables contain captions!");
};
