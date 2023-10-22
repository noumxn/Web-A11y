import chalk from 'chalk';

/*
 * @description PERCIEVABLE: Text Alternatives: Check for appropriate alt text for images, icons, and non-text content.
 **/

export const checkSkipLinks = (document) => {
  try {
    const images = document.querySelectorAll('a, [role="a"]');
    let hasSkip = false;
    images.forEach((element, index) => {
        var linkPattern = new RegExp("#main[\\w-]*", "i");
        const link = element.getAttribute('href');
        if (linkPattern.test(link)) {
            hasSkip = true;
        }
    });
    if (hasSkip) {
      return chalk.green('Skip Link test passed!');
    } else {
      return chalk.red('Missing skip link');
    }
  } catch (e) {
    return `${chalk.red('Error parsing the HTML file:')}${e}`;
  }
};
