import fs from "fs-extra";

/*
 * @function saveToOutputFile
 * @param {string} htmlContent
 * @description Saves HTML content to a file called 'output.html'
 **/

export const saveToOutputFile = async (htmlContent) => {
  fs.outputFileSync('output.html', htmlContent, 'utf-8');
  console.log('HTML content saved to output.html');
}
