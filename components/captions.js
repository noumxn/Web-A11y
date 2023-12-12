import chalk from "chalk";

/**
 * @function checkCaptions
 * @param {Document} document
 * @return {string} Success message if all video elements have captions
 * @return {string} Failure message if any video elements have missing captions
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 11.A
 * Confirm the presence of captions.
 * Captions allow a person who cannot hear the audio content of a video to still understand its content.
 **/

export const checkCaptions = (document) => {
  try {
    let output = "";
    const videoElements = document.querySelectorAll("video");
    for (let element of videoElements) {
      const hasCaption = element.querySelector('track[kind="captions"]');
      if (!hasCaption) {
        output =
          output +
          `${chalk.red("\nVideo element without captions:")}${chalk.cyan(
            element.outerHTML,
          )}`;
      }
    }
    if (output.length === 0) {
      return chalk.green("Video Captions test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
