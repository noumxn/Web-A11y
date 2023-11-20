import chalk from "chalk";

/*
 * @function checkHeadingOrder
 * @param {Document} document
 * @return {string} Success message if heading elements are in a logical sequence and no levels are skipped
 * @return {string} Failure message if heading elements are not in a logical sequence or if levels are skipped
 * @throws Error parsing the HTML file
 * @type ERROR
 * @description
 * 5.C
 * Heading elements should be written in a logical sequence.
 * The order of heading elements should descend, based on the “depth” of the content.
 * For example, a h4 element should not appear on a page before the first h3 element declaration.
 * 5.D
 * Don't skip heading levels.
 * For example, don't jump from a h2 to a h4, skipping a h3 element. If heading levels are being
 * skipped for a specific visual treatment, use CSS classes instead.
 **/

export const checkHeadingOrder = (document) => {
  try {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let currMax = 0;

    for (const heading of headings) {
      const level = parseInt(heading.tagName[1]);

      if (level > currMax + 1) {
        return chalk.red(
          `Heading order incorrect. h${currMax + 1} tag missing.`,
        );
      } else if (level === currMax + 1) {
        currMax++;
      } else if (level === currMax) {
        continue;
      }
    }

    return chalk.green("Heading Order test passed!");
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
