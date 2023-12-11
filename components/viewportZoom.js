import chalk from "chalk";

/**
 * @function checkViewportZoom
 * @param {Document} document
 * @return {string} Success message if meta element has viewport zoom enabled or by default
 * @return {string} Failure message if meta element is disabled
 * @kind ERROR
 * @throws Error parsing the HTML file
 * @description
 * 2. C Ensure that viewport zoom is not disabled.
 **/

const isViewportZoomEnabled = (document) => {
  try {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute("content");
      return !/user-scalable\s*=\s*no/.test(content);
    }
    return true;
  } catch (e) {
    throw new Error(`Error checking viewport zoom: ${e}`);
  }
};

export const checkViewportZoom = (document) => {
  try {
    if (isViewportZoomEnabled(document)) {
      return chalk.green("Viewport Zoom test passed!");
    } else {
      return chalk.red("Viewport zoom is disabled.");
    }
  } catch (e) {
    return chalk.red(e.message);
  }
};
