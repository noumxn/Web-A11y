import chalk from "chalk";

/**
 * @function checkAutoplay
 * @param {Document} document
 * @return {string} Success message if no audio or video elements have autoplay
 * @return {string} Failure message if any audio or video elements have autoplay
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 10.A
 * Make sure media does not autoplay
 * Unexpected video and audio can be distracting and disruptive, especially for certain kinds
 * of cognitive disability such as ADHD. Certain kinds of autoplaying video and animation can be a
 * trigger for vestibular and seizure disorders.
 **/

export const checkAutoplay = (document) => {
  try {
    const media = document.querySelectorAll("audio[autoplay], video[autoplay]");
    const other = document.querySelectorAll("iframe");

    for (let element of other) {
      let source = element.getAttribute("src");
      if (source.includes("autoplay=1")) {
        return chalk.red("\nMedia element with autoplay found");
      }
    }

    if (media.length > 0) {
      return chalk.red("\nMedia element with autoplay found");
    } else {
      return chalk.green("\nMedia autoplay check passed!");
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
