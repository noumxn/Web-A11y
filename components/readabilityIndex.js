import chalk from 'chalk';
import textReadability from 'text-readability';

/*
 * @description Use plain language and avoid figures of speech, idioms, and complicated metaphors.
 *              Write content at an 8th grade reading level.
 **/

export const checkReadability = (document) => {
  try {
    const validTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // Extract text content from the specified tags in the DOM document
    const textContent = validTags
      .map(tagName => Array.from(document.getElementsByTagName(tagName)))
      .flat()
      .map(element => element.textContent)
      .join(' ');

    // Calculate Flesch-Kincaid Grade Level
    const fleschGradeLevel = textReadability.fleschKincaidGrade(textContent);

    // Check if the grade level is at or below 8
    if (fleschGradeLevel <= 12) {
      return chalk.green(`Readability test passed! (Flesch-Kincaid Grade Level: ${fleschGradeLevel.toFixed(2)}`)
    } else {
      return chalk.red(`Readability test failed! (Flesch-Kincaid Grade Level: ${fleschGradeLevel.toFixed(2)}`)
    }
  } catch (e) {
    return `${chalk.red('Error parsing the HTML file:')} ${e}`;
  }
};
