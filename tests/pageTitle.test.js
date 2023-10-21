import { JSDOM } from "jsdom";
import chalk from "chalk";
import { checkPageTitle } from "../components/pageTitle.js";
import { expect } from "chai";

describe("Keyboard Page Title Tests", () => {
  it("should pass after finding the page title", async () => {
    const html1 = `<!DOCTYPE html>
<html>
<head>
    <title>Test Case</title>
</head>
</html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkPageTitle(document1);
    expect(result1).to.include(
      chalk.green("Keyboard accessiblity for page title passed!")
    );
  });
  it("should fail because there is no page title", async () => {
    const html1 = `<!DOCTYPE html>
<html>
<body>
<p>This is not a page title</p>
</body>
</html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkPageTitle(document1);
    expect(result1).to.include(
      chalk.red("\nThe website title is not keyboard accessible:")
    );
  });
});
