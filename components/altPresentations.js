import chalk from "chalk";

/**
 * @function checkTimeBasedMediaAlt
 * @param {Document} document
 * @return {string} Success message if all time based media has alt text
 * @return {string} Failure message if any time based media does not have alt text
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * Verify the availability of alternative presentations for time-based media.
 **/

export const checkTimeBasedMediaAlt = (document) => {
  try {
    let output = "";

    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((element) => {
      const hasDescriptions = element.querySelector(
        'track[kind="descriptions"]',
      );
      if (!hasDescriptions) {
        output += `${chalk.red(
          "\nAudio without appropriate descriptions:",
        )} ${chalk.cyan(element.outerHTML)}`;
      }
    });

    if (output.length === 0) {
      return chalk.green("Time-Based Media Alternatives test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
