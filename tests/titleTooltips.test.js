import { checkTitleTooltips } from "../components/titleTooltips.js";
import { JSDOM } from "jsdom";
import { expect } from "chai";
import chalk from "chalk";

describe("Title Tooltips Tests", () => {
  it("should pass when no elements with tooltips have a title attribute", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
      </head>
      <body>
        <p>Paragraph without tooltip</p>
        <span>Span without tooltip</span>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkTitleTooltips(document);
    expect(result).to.equal(chalk.green("Tooltips test passed!"));
  });

  it("should fail when an element with a tooltip has a title attribute", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
      </head>
      <body>
        <p title="Important information">Paragraph with tooltip</p>
        <span title="Tooltip for span">Span with tooltip</span>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkTitleTooltips(document);
    const expectedFailureMessage = "Element with title attribute for tooltip";
    expect(result.includes(expectedFailureMessage)).to.be.true;
  });
});
