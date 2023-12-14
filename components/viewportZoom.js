import chalk from "chalk";

/**
 * @function checkViewportZoom
 * @param {Document} document
 * @return {string} Success message if meta element has viewport zoom enabled or by default
 * @return {string} Failure message if meta element is disabled
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 2.D Ensure that viewport zoom is not disabled.
 * Some people need to increase the size of text to a point where they can read it.
 * Do not stop them from doing this, even for web apps with a native app-like experience.
 * Even native apps should respect Operating System settings for resizing text.
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
      return chalk.green("\nViewport Zoom test passed!");
    } else {
      return chalk.red("\nViewport zoom is disabled.");
    }
  } catch (e) {
    return chalk.red(e.message);
  }
};
