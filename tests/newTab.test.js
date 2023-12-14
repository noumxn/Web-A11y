import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkNewTab } from "../components/newTab.js";

describe("New tab link warning check", () => {
  it("should fail because this link opens in a new tab and does not provide appropriate warnings", () => {
    const html1 = `<html><body><a href="https://example.com" target="_blank">This link opens a new tab</a></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkNewTab(document1);
    expect(result1).to.include(
      chalk.red("\nLink opening in a new tab without appropriate warnings:"),
    );
  });

  it("should pass because the link does not open in a new tab", () => {
    const html2 = `<html><body><a href="/login">This does not open a new tab</a></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkNewTab(document2);
    expect(result2).to.include(chalk.green("New Tab Warning test passed!"));
  });

  it("should pass because the link opens in a new tab but also provides required warnings", () => {
    const html3 = `<html><body><a aria-describedby="new-win-desc" href="https://example.com" rel="noopener" 
     target="_blank">external link</a></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkNewTab(document3);
    expect(result3).to.include(chalk.green("New Tab Warning test passed!"));
  });
});
