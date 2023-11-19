import { expect } from "chai";
import { checkLinkElements } from "../components/controls.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Link Elements", () => {
  it("should pass when there are no link elements", () => {
    const html1 = `<html><body></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLinkElements(document1);
    expect(result1).to.include(chalk.green("All elements with href attributes use the <a> element!"));
  });

  it("should fail when links are not in a element", () => {
    const html2 = `<html><body><div href="link.com"></div></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkLinkElements(document2);
    console.log(result2);
    expect(result2).to.include(chalk.red('Element with href="link.com" is not an <a> element. Element is <div href="link.com"></div>'));
  });

  it("should pass for links used to import styles and scripts", () => {
    const html3 = `<html><head><link rel="stylesheet" href="styles.css"><head><body></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkLinkElements(document3);
    expect(result3).to.equal(chalk.green("All elements with href attributes use the <a> element!"));
  });
});
