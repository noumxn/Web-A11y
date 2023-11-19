import chalk from "chalk";

/*
 * @function checkAltText
 * @param {Document} document
 * @return {string} Success message if all image elements have Alternate text property
 * @return {string} Failure message if any image elements have missing Alternate text
 * @throws Error parsing the HTML file
 * @description
 * 4.A
 * Make sure that all img elements have an alt attribute.
 * alt attributes (alt text) give a description of an image for people who may not be able
 * to view them. When an alt attribute isn't present on an image, a screen reader may announce
 * the image's file name and path instead. This fails to communicate the image’s content.
 *
 * 4.B
 * Make sure that decorative images use null alt (empty) attribute values.
 * Null alt attributes are also sometimes known as empty alt attributes. They are made by
 * including no information between the opening and closing quotes of an alt attribute.
 * Decorative images do not communicate information that is required to understand the website's
 * overall meaning. Historically they were used for flourishes and spacer gif images, but tend to
 * be less relevant for modern websites and web apps.
 **/

export const checkAltText = (document) => {
  try {
    let output = "";
    const images = document.querySelectorAll('img, [role="img"]');
    images.forEach((element) => {
      const alt = element.getAttribute("alt");
      const isHidden =
        element.hasAttribute("aria-hidden") &&
        element.getAttribute("aria-hidden") === "true";
      const displayNone =
        element.hasAttribute("style") &&
        element.getAttribute("style") === "display:none";
      const hasDecorativeClass =
        element.classList.contains("decorative") &&
        element.getAttribute("alt") === "";

      if (!alt && !isHidden && !hasDecorativeClass && !displayNone) {
        output =
          output +
          `${chalk.red("\nImage without appropriate alt text:")}${chalk.cyan(
            element.outerHTML,
          )}`;
      }
    });
    if (output.length === 0) {
      return chalk.green("Alt Text test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")}${e}`;
  }
};
