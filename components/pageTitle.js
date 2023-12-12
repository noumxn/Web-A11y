import chalk from "chalk";

/**
 * @function checkPageTitle
 * @param {Document} document
 * @return {string} Success message if the webpage has a Title
 * @return {string} Failure message if the title is missing from the webpage
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 2.B
 * Provide a unique title for each page or view.
 * The title element, contained in the document's head element, is often the first
 * piece of information announced by assistive technology. This helps tell people what
 * page or view they are going to start navigating.
 **/

export const checkPageTitle = (document) => {
  try {
    //finds title on document
    const title = document.querySelector("title");
    //initialize the result output string
    let output = "";
    //the title exists on the document
    if (title) {
      output += chalk.green("Title check passed!");
      return output;
    } else {
      output += chalk.red("\nThe webpage does not have a title!");
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
