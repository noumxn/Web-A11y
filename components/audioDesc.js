import chalk from "chalk";

/**
 * @function checkAudioDesc
 * @param {Document} document
 * @return {string} Success message if all video elements have audio descriptions
 * @return {string} Failure message if any video elements are missing audio descriptions
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * Ensure time based media have audio descriptions.
 * This enables people who have difficulty hearing understand the context of a video
 **/

export const checkAudioDesc = (document) => {
  try {
    let output = "";
    const videoElements = document.querySelectorAll("video");
    for (let element of videoElements) {
      const hasAudioDescription = element.querySelector(
        'track[kind="descriptions"]',
      );
      if (!hasAudioDescription) {
        output =
          output +
          `${chalk.red(
            "\nMultimedia element without audio descriptions:",
          )}${chalk.cyan(element.outerHTML)}`;
      }
    }
    if (output.length === 0) {
      return chalk.green("\nMultimedia Audio Description test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
