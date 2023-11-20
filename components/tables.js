import chalk from "chalk";

/*
 * @function checkTableStructure
 * @param {Document} document
 * @return {string} Success message if all table elements are valid
 * @return {string} Failure message if any table elements are invalid
 * @throws Error parsing the HTML file
 * @description
 * 8.A
 * Use the table element to describe tabular data
 **/

export const checkTableStructure = (document) => {
    const tables = document.querySelectorAll('table');
  
    for (const table of tables) {
        // const table = link.nodeName.toLowerCase();
        if (table.querySelector('thead') == null) {
            return chalk.red(`An invalid table was found. The table is missing a <thead>.`);
        }
        if (table.querySelector('tbody') == null) {
            return chalk.red(`An invalid table was found. The table is missing a <tbody>.`);
        }
    }
  
    return chalk.green('All table elements are valid!');
  };
