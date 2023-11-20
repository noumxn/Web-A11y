import chalk from "chalk";
import color from "color-string";

/*
 * @function checkSensoryRefs
 * @param {Document} document
 * @return {string} Success message if no Positional/Sensory references found
 * @return {string} Failure message if any Positional/Sensory references found
 * @throws Error parsing the HTML file
 * @type WARNING
 * @description
 * 13.E
 * Make sure instructions are not visual only
 * Use a combination of characteristics to write cues, particularly the actual names of
 * sections and elements, rather than just descriptions like location (“on the right”).
 **/

export const checkSensoryRefs = (document) => {
  let output = "";

  const descriptiveElements = document.querySelectorAll(
    "p, div, input, a, button, textfield, img, span",
  );
  for (let element of descriptiveElements) {
    let elemContent = element.textContent.trim();
    elemContent = elemContent.replace(/\s{2,}/g, " ");
    if (matchSentenceFormat(elemContent) && elemContent.length < 200) {
      output += `${chalk.yellow(
        "\nThis text might be using Positional/Sensory references to refer to elements:",
      )} ${chalk.cyan(elemContent)}`;
    }
  }
  if (output.length === 0) {
    return chalk.green(`Positional/Sensory References test passed!`);
  } else {
    return output;
  }
};

function matchSentenceFormat(sentence) {
  sentence = sentence.toLowerCase();

  const verbRegex = /(press|click|select|choose|pick|provide|input|type)/i;
  const elementRegex = /(button|image|text field|link)/i;
  const positionRegex = /(top|bottom|left|right)(-(top|bottom|left|right))?/i;
  const sizeRegex = /(small|medium|large|big|tiny|huge)/i;
  const shapeRegex = /(round|square|box|circle|circular|circle|shaped)/i;

  const verbs = sentence.match(verbRegex);
  const elements = sentence.match(elementRegex);
  const positions = sentence.match(positionRegex);
  const sizes = sentence.match(sizeRegex);
  const shapes = sentence.match(shapeRegex);
  let colors = false;

  const words = sentence.split(" ");
  for (let word of words) {
    if (color.get.rgb(word)) {
      colors = true;
      break;
    }
  }

  return (
    verbs !== null &&
    elements !== null &&
    (positions !== null || colors !== null || sizes !== null || shapes !== null)
  );
}
