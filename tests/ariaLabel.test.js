import { expect } from "chai";
import { checkAriaAttr } from "../components/ariaLabel.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Aria Attributes Component", () => {
  it("should detect complex element without both aria-label and aria-labelledby", () => {
    const html1 = `<html><body><input type="text" placeholder="text" /></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAriaAttr(document1);
    expect(result1).to.include(
      chalk.red("Complex element without appropriate label:"),
    );
  });

  it("should detect button without appropriate label", () => {
    const html2 = `<html><body><button></button></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkAriaAttr(document2);
    expect(result2).to.include(
      chalk.red("Complex element without appropriate label:"),
    );
  });

  // TODO: Uncomment after finding a better way to handle anchor tags
  // it('should detect anchor link without appropriate label', () => {
  //   const html3 = `<html><body><a href="#">Click me</a></body></html>`;
  //   const dom3 = new JSDOM(html3);
  //   const {document: document3} = dom3.window;
  //   const result3 = checkAriaAttr(document3);
  //   expect(result3).to.include(chalk.red('Complex element without appropriate label:'));
  // });

  it("should pass when elements have appropriate labels", () => {
    const html4 = `<html><body><input type="text" aria-label="Enter text" placeholder="text" /></body></html>`;
    const dom4 = new JSDOM(html4);
    const { document: document4 } = dom4.window;
    const result4 = checkAriaAttr(document4);
    expect(result4).to.equal(chalk.green("Aria Attributes test passed!"));
  });
});
