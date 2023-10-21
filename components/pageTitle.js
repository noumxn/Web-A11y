/***
 *checks if a page title is accessible
 ***/

import chalk from "chalk";

export const checkPageTitle = async (document) => {
  try {
    //finds title on document
    const title = document.querySelector("title");
    //initialize the result output string
    let output = "";
    //the title exists on the document
    if (title) {
      //simulates keyboard accessibility by giving focus to the title element
      await title.focus();
      output += chalk.green("Keyboard accessiblity for page title passed!");
      return output;
    } else {
      output += chalk.red("\nThe website title is not keyboard accessible:");
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
