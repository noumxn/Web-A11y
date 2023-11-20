import { expect } from "chai";
import { checkDescriptiveHeadings } from "../components/descriptiveHeadings.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Descriptive Headings", () => {
  it("should fail because heading is not relevent to corrosponding content", () => {
    const html1 = `<html><body>
      <h1>Sport Highlights from this week</h1>
      <p>This article discusses various aspects of nature, including wildlife, ecosystems, and environmental conservation.</p>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkDescriptiveHeadings(document1);
    expect(result1).to.include(
      chalk.yellow("The heading may not be very descriptive of its content:"),
    );
  });

  it("should pass because heading is relevent to corrosponding content", () => {
    const html2 = `<html><body>
      <h1>Introduction to Nature and Wildlife</h1>
      <p>This article discusses various aspects of nature, including wildlife, ecosystems, and environmental conservation.</p>
      </body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkDescriptiveHeadings(document2);
    expect(result2).to.equal(
      chalk.green("All the Heading elements are descriptive!"),
    );
  });
});
