import chalk from "chalk";

export const checkGlobalCode = (document) => {
  try {
    const allHtmlTags = document.querySelectorAll("html");

    for (const htmlTag of allHtmlTags) {
      const langAttribute = htmlTag.getAttribute("lang");

      if (!langAttribute) {
        let output = chalk.red("Missing lang attribute on the <html> tag:");
        output += `\n${chalk.cyan(htmlTag.outerHTML)}`;
        return output;
      }
    }

    return chalk.green("Lang attribute exists for all <html> tags!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
