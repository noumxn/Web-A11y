import chalk from "chalk";

/*
 * @function checkDescriptiveHeadings
 * @param {Document} document
 * @return {string} Success message if all heading elements are descriptive of their content
 * @return {string} Failure message if any heading element is not descriptive of its content
 * @throws Error parsing the HTML file
 * @description 
 * 5.A
 * Use heading elements to introduce content.
 * Heading elements construct a document outline, and should not be used for purely visual design.
 * @todo Remove stop words before matching heading to the content
 **/

export const checkDescriptiveHeadings = (document) => {
  let output = ""

  const calcSimilarity = (heading, content) => {
    const lowerHeading = heading.textContent.toLowerCase();
    const lowerContent = content.toLowerCase();
    const keyTerms = lowerHeading.split(" ");
    const matchingTerms = keyTerms.filter(term => lowerContent.includes(term));
    const percentageMatch = matchingTerms.length / keyTerms.length;

    if (percentageMatch < 0.4) {
      output += `${chalk.red('\nThe heading may not be very descriptive of its content:')} ${chalk.cyan(heading.outerHTML)}`
    }
    return
  };

  const headingElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const headings = document.querySelectorAll(headingElements);

  for (const h of headings) {
    let nextNode = h.nextElementSibling;
    let content = "";

    // Accumulate content for each heading
    while (nextNode && !headingElements.includes(nextNode.nodeName.toLowerCase())) {
      if (nextNode.textContent.trim() !== '') {
        content += nextNode.textContent.trim(); // Accumulate content
      }
      nextNode = nextNode.nextElementSibling;
    }

    // Call calcSimilarity only if there is content
    if (content.trim() !== '') {
      calcSimilarity(h, content.trim());
    }

    if (output.length === 0) {
      return chalk.green(`All the Heading elements are descriptive!`);
    } else {
      return output;
    }
  }
};

