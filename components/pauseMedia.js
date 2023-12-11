import chalk from "chalk";

/**
 * @function checkPauseMedia
 * @param {Document} document
 * @return {string} Success message if all media elements can be paused
 * @return {string} Failure message if any media element can not be paused
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 10.C
 * Check to see that all media can be paused.
 * Provide a global pause function on any media element. If the device has a keyboard,
 * ensure that pressing the Space key can pause playback. Make sure you also don't
 * interfere with the Space key's ability to scroll the page/view when not focusing
 * on a form control.
 **/

export const checkPauseMedia = (document) => {
  try {
    const media = document.querySelectorAll("audio, video");
    let output = "";

    media.forEach((element) => {
      if (!element.hasAttribute("controls")) {
        output += `${chalk.red(
          "\nMedia element cannot be paused:",
        )} ${chalk.cyan(element.outerHTML)}`;
      }
    });

    if (output.length === 0) {
      return chalk.green("All media elements can be paused!");
    }

    return chalk.red(output);
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
