import { expect } from "chai";
import { checkElementContent } from "../components/elementContent.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Check Element Content", () => {
  it("should give a warning because content is non-descriptive", () => {
    const html1 = `<!DOCTYPE html>
    <html>
    <head>
        <title>Test Page</title>
    </head>
    <body>
        <a href="#">A</a>
    </body>
    </html>
    `;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkElementContent(document1);
    expect(result1).to.include(
      chalk.yellow("\nElement with non-descriptive content:"),
    );
  });

  it("should fail because no content", () => {
    const html2 = `<!DOCTYPE html>
    <html>
    <head>
        <title>Test Page</title>
    </head>
    <body>
        <button></button>
        <label for="inputField"></label>
    </body>
    </html>
    `;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkElementContent(document2);
    expect(result2).to.include(chalk.red("\nElement with empty content:"));
  });

  it("should pass because valid descriptive content", () => {
    const html3 = `<!DOCTYPE html>
    <html>
    <head>
        <title>Test Page</title>
    </head>
    <body>
        <button>Click Me</button>
        <a href="#">Visit Link</a>
    </body>
    </html>
    `;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkElementContent(document3);
    expect(result3).to.include(chalk.green("Element Content test passed!"));
  });
});
