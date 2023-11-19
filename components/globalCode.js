import chalk from "chalk";

export const checkGlobalCode = (document) => {
  try {
    const allHtmlTags = document.querySelectorAll("html");

    for (const htmlTag of allHtmlTags) {
      // Global Code A: Use a lang attribute on the html element.
      const langAttribute = htmlTag.getAttribute("lang");
      if (!langAttribute) {
        let output = chalk.red("Missing lang attribute on the <html> tag:");
        output += `\n${chalk.cyan(htmlTag.outerHTML)}`;
        return output;
      }

      //Global Code B: Provide a unique title for each page or view.
      const titleElements = document.querySelectorAll("title");
      if (!titleElements || titleElements.length === 0) {
        return chalk.red("Missing <title> tag in the HTML file!");
      }

      const titles = Array.from(titleElements).map((title) =>
        title.textContent.trim()
      );

      const uniqueTitles = [...new Set(titles)];

      if (titles.length !== uniqueTitles.length) {
        return chalk.red(`Non-unique title found: ${titles.join(", ")}`);
      }
    }

    return chalk.green("Lang attribute and unique title exist for all <html> tags!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
