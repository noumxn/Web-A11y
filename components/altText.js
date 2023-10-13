import chalk from 'chalk';

/*
 * @description PERCIEVABLE: Text Alternatives: Check for appropriate alt text for images, icons, and non-text content.
 **/

export const checkAltText = (document) => {
  try {
    let output = "";
    const images = document.querySelectorAll('img, [role="img"]');
    images.forEach((element, index) => {
      const alt = element.getAttribute('alt');
      const isHidden = element.hasAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true';
      const displayNone = element.hasAttribute('style') && element.getAttribute('style') === 'display:none'
      const hasDecorativeClass = element.classList.contains('decorative');

      if (!alt && !isHidden && !hasDecorativeClass && !displayNone) {
        output = output + `${chalk.red('\nImage or icon without appropriate alt text:')}${chalk.cyan(element.outerHTML)}`;
      }
    });
    if (output.length === 0) {
      return chalk.green('Alt Text test passed!');
    } else {
      return output;
    }
  } catch (e) {
    return `${chalk.red('Error parsing the HTML file:')}${e}`;
  }
};
