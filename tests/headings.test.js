import {expect} from "chai";
import {checkHeadings} from "../components/headings.js"
import {JSDOM} from "jsdom";
import chalk from "chalk";

describe("Single H1 Heading", () => {
  it("should fail because there are more than one h1 headings", () => {
    const html1 = `<html><body>
      <h1>Heading 1</h1>
      <p>This article discusses various aspects of nature, including wildlife, ecosystems, and environmental conservation.</p>
      <h1>Heading 2</h1>
      <p>This article discusses various aspects of nature, including wildlife, ecosystems, and environmental conservation.</p>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const {document: document1} = dom1.window;
    const result1 = checkHeadings(document1);
    expect(result1).to.include(
      chalk.red("More than one H1 tag found on the web-page:"),
    );
  });

  it("should pass because there is no h1 heading", () => {
    const html2 = `<html><body>
      <p>This article discusses various aspects of nature, including wildlife, ecosystems, and environmental conservation.</p>
      </body></html>`;
    const dom2 = new JSDOM(html2);
    const {document: document2} = dom2.window;
    const result2 = checkHeadings(document2);
    expect(result2).to.equal(
      chalk.green("H1 Tag test passed!"),
    );
  });

  it("should pass because there is only one h1 heading", () => {
    const html3 = `<html><body>
      <h1>Introduction to Nature and Wildlife</h1>
      <p> Some Content</p>
      <h2>Heading 2</h2>
      <p> Some Content</p>
      <h2>Heading 3</h2>
      <p> Some Content </p>
      </body></html>`;
    const dom3 = new JSDOM(html3);
    const {document: document3} = dom3.window;
    const result3 = checkHeadings(document3);
    expect(result3).to.equal(
      chalk.green("H1 Tag test passed!"),
    );
  });
});
