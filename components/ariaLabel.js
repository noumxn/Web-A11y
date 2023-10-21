import chalk from "chalk";

/*
 * @description PERCIEVABLE: Text Alternatives: Verify the use of aria-label and aria-labeled by for complex elements.
 **/

export const checkAriaAttr = (document) => {
  try {
    let output = "";
    const complexElements = ["input", "button", "select", "textarea"];
    for (const element of complexElements) {
      const ariaElements = document.querySelectorAll(element);
      for (let e of ariaElements) {
        const ariaLabel = e.getAttribute("aria-label");
        const ariaLabelledBy = e.getAttribute("aria-labelledby");
        const hasAssociatedLabel = e.labels && e.labels.length > 0;
        const isHidden =
          e.hasAttribute("type") && e.getAttribute("type") === "hidden";
        const displayNone =
          e.hasAttribute("style") && e.getAttribute("style").includes("none");

        if (
          !ariaLabel &&
          !ariaLabelledBy &&
          !hasAssociatedLabel &&
          !isHidden &&
          !displayNone
        ) {
          output += `${chalk.red(
            "\nComplex element without appropriate label:",
          )}${chalk.cyan(e.outerHTML)}`;
        }
      }
    }
    if (output.length === 0) {
      return chalk.green(`Aria Attributes test passed!`);
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
