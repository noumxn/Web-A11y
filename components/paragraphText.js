import chalk from "chalk";

/*
 * @description ADAPTABLE CONTENT: Ensure content is presented in a readable and functional manner without losing information
 **/

export const checkParagraphs = (document) => {
  try {
    const paragraphs = [];
    const textNodes = document.querySelectorAll("p");

    let currentParagraph = [];

    for (let i = 0; i < textNodes.length; i++) {
      const textNode = textNodes[i];
      const previousNode = textNode.previousSibling;
      const nextNode = textNode.nextSibling;

      if (!previousNode || !previousNode.textContent.trim()) {
        // Beginning of a paragraph
        currentParagraph = [textNode];
      } else if (!nextNode || !nextNode.textContent.trim()) {
        // End of a paragraph
        currentParagraph.push(textNode);
        paragraphs.push(currentParagraph);
        currentParagraph = [];
      } else {
        // Middle of a paragraph
        currentParagraph.push(textNode);
      }
    }

    if (paragraphs.length === 0) {
      return chalk.green("Paragraph recognition test passed!");
    } else {
      const output = paragraphs.map((paragraph, index) => {
        const paragraphHTML = paragraph.map((node) => node.outerHTML).join(" ");
        return `${chalk.red(`Paragraph not properly formatted:`)} ${chalk.cyan(
          paragraphHTML,
        )}`;
      });
      return output.join("\n");
    }
  } catch (e) {
    return `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
