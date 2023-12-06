import chalk from "chalk";

export const checkAutoplay = (document) => {
  try {
    const media = document.querySelectorAll("audio[autoplay], video[autoplay]");
    const other = document.querySelectorAll("iframe");

    for (let element of other) {
      let source = element.getAttribute("src");
      if (source.includes("autoplay=1")) {
        return chalk.red("Media element with autoplay found");
      }
    }

    if (media.length > 0) {
      return chalk.red("Media element with autoplay found");
    } else {
      return chalk.green("No autoplay found!");
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
