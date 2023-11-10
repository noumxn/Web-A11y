import chalk from 'chalk';

/*
 * @function checkCaptions
 * @param {Document} document
 * @return {string} Success message if all complex elements that need a label, have a valid label
 * @return {string} Failure message if any complex element that needs a label, does not have a valid label
 * @throws Error parsing the HTML file
 * @description 
 * 9.A
 * All inputs in a form are associated with a corresponding label element.
 **/

export const checkAriaAttr = (document) => {
  try {
    let output = "";
    const ariaElements = document.querySelectorAll('input, textarea, button');
    for (let e of ariaElements) {
      const ariaLabel = e.getAttribute('aria-label');
      const ariaLabelledBy = e.getAttribute('aria-labelledby');
      const hasAssociatedLabel = e.labels && e.labels.length > 0;
      const isHidden = e.hasAttribute('type') && e.getAttribute('type') === 'hidden';
      const displayNone = e.hasAttribute('style') && (e.getAttribute('style').includes('none'))

      if (!ariaLabel && !ariaLabelledBy && !hasAssociatedLabel && !isHidden && !displayNone) {
        output += `${chalk.red('\nComplex element without appropriate label:')}${chalk.cyan(e.outerHTML)}`
      }
    }
    if (output.length === 0) {
      return chalk.green(`Aria Attributes test passed!`);
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red('Error parsing the HTML file:')} ${e}`;
  }
};
