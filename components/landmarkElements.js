import chalk from "chalk";

/*
 * @function checkLandmarkElements
 * @param {Document} document
 * @return {string} Success message if high-priority landmark elements are present
 * @return {string} Warning message if high-priority landmark elements are missing, but others are present
 * @return {string} Failure message if high-priority landmark elements are missing
 * @type ERROR
 * @throws Error parsing the HTML file
 * @description
 * 2.D Ensure that important content regions are marked using landmark elements.
 **/

const hasHighPriorityLandmarkElements = (document) => {
  try {
    const highPriorityElements = ["header", "nav", "main", "footer"];
    const allLandmarkElements = document.querySelectorAll(
      "header, nav, main, aside, footer, section, article",
    );

    const missingHighPriority = highPriorityElements.filter((element) => {
      return !document.querySelector(element);
    });

    if (missingHighPriority.length > 0) {
      // High-priority elements are missing
      return missingHighPriority;
    }

    // Check for additional elements that are not high-priority
    const additionalElements = Array.from(allLandmarkElements).filter(
      (element) => {
        return !highPriorityElements.includes(element.tagName.toLowerCase());
      },
    );

    if (additionalElements.length > 0) {
      // Some additional elements are present (not high-priority)
      return "warning";
    }

    // All high-priority elements are present
    return true;
  } catch (e) {
    throw new Error(`Error checking landmark elements: ${e}`);
  }
};

export const checkLandmarkElements = (document) => {
  try {
    const result = hasHighPriorityLandmarkElements(document);
    if (result === true) {
      return chalk.green("High-Priority Landmark Elements check passed!");
    } else if (result === "warning") {
      return chalk.yellow(
        "Some non-high-priority landmark elements are present.",
      );
    } else {
      const missingElements = result.join(", ");
      return chalk.red(
        `One or more high-priority landmark elements are missing: ${missingElements}`,
      );
    }
  } catch (e) {
    return chalk.red(e.message);
  }
};
