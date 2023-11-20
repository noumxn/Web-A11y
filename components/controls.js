import chalk from "chalk";

/*
 * @function checkLinkElements
 * @param {Document} document
 * @return {string} Success message if all links use the a element
 * @return {string} Failure message if any links do not use the a element
 * @throws Error parsing the HTML file
 * @description
 * 7.A
 * The a element should be used 
 * Heading elements construct a document outline, and should not be used for purely visual design.
 **/

export const checkLinkElements = (document) => {
    const links = document.querySelectorAll('[href]');
  
    for (const link of links) {
    const nodeElement = link.nodeName.toLowerCase();
      if (nodeElement !== 'a' && nodeElement !== 'link') {
        return chalk.red(`Element with href="${link.getAttribute('href')}" is not an <a> element. Element is ${link.outerHTML}`);
      }
    }
  
    return chalk.green('All elements with href attributes use the <a> element!');
  };

  
export const checkFocusStyles = (document) => {
  const controls = document.querySelectorAll('[href], button');

  for (const control of controls) {
    const nodeElement = control.nodeName.toLowerCase();
    if (nodeElement !== 'a' && nodeElement !== 'link' || nodeElement == "button") {
      control.focus();

      if (!document.activeElement.isSameNode(control)) {
          return chalk.red(`Element ${control.outerHTML} does not have a :focus state.`);
      }
    }
  }

  return chalk.green('All control elements attributes have a :focus state!');
};