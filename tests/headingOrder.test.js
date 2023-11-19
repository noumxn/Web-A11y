import { expect } from "chai";
import { checkHeadingOrder } from "../components/headingOrder";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Heading Order", () => {
  it("should fail because heading level 4 is skipped", () => {
    const html1 = `
      <html>
        <head>
          <title>Invalid Test Case 1</title>
        </head>
        <body>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h5>Heading 2</h5>
        </body>
      </html>
      `;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkHeadingOrder(document1);
    expect(result1).to.include("Heading order incorrect.");
  });

  it("should fail because heading level 2 is skipped", () => {
    const html2 = `
      <html>
        <head>
          <title>Invalid Test Case 2</title>
        </head>
        <body>
          <h1>Heading 1</h1>
          <h3>Heading 3</h3>
          <h2>Heading 2</h2>
          <h4>Heading 4</h4>
          <h3>Heading 3</h3>
          <h2>Heading 2</h2>
        </body>
      </html>
      `;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkHeadingOrder(document2);
    expect(result2).to.include("Heading order incorrect.");
  });

  it("should fail because heading level 3 is skipped", () => {
    const html3 = `
      <html>
        <body>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h4>Heading 3</h4>
        </body>
      </html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkHeadingOrder(document3);
    expect(result3).to.include("Heading order incorrect.");
  });

  it("should pass because heading order is correct and no levels skipped", () => {
    const html4 = `<html>
      <body>
      <h1>Heading 1</h1>
        <h2>Heading 2</h2>
          <h3>Heading 3</h3>
            <p>Some Content</p>
          <h3>Heading 3</h3>
            <p>Some Content</p>
        <h2>Heading 2</h2>
          <h3>Heading 3</h3>
            <p>Some Content</p>
          <h3>Heading 3</h3>
            <p>Some Content</p>
      </body>
    </html>`;
    const dom4 = new JSDOM(html4);
    const { document: document4 } = dom4.window;
    const result4 = checkHeadingOrder(document4);
    expect(result4).to.equal(chalk.green("Heading Order test passed!"));
  });

  it("should pass because heading order is correct and no levels skipped", () => {
    const html5 = `<html><body>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      </body></html>`;
    const dom5 = new JSDOM(html5);
    const { document: document5 } = dom5.window;
    const result5 = checkHeadingOrder(document5);
    expect(result5).to.equal(chalk.green("Heading Order test passed!"));
  });
});
