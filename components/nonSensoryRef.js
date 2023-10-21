import chalk from "chalk";

/*
 * @description ADAPTABLE CONTENT: Ensure content is presented in a readable and functional manner without losing information
 **/

export const checkNonSensoryRef = (document) => {
  try {
    let output = "";

    // Sensory characteristics
    // TODO: Find a better list of sensory characteristics
    const sensoryCharacteristics = [
      "shaped",
      "colored",
      "bottom",
      "beside",
      "top",
    ];

    const hasNonSensoryInformation = (reference) => {
      return !sensoryCharacteristics.some((char) => reference.includes(char));
    };

    const references = document.querySelectorAll(
      'a, button, [role="button"], [role="link"], input',
    );

    references.forEach((element, index) => {
      let text = "";

      if (element.tagName === "INPUT") {
        const id = element.getAttribute("id");
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label) {
            text = label.textContent;
          }
        }
      } else {
        text = element.textContent;
      }

      if (!hasNonSensoryInformation(text)) {
        output += `${chalk.red(
          "\nReference relies on sensory characteristics:",
        )}${chalk.cyan(element.outerHTML)}`;
      }
    });

    if (output.length === 0) {
      return chalk.green("Non-sensory references test passed!");
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file: ")}${e}`;
  }
};
