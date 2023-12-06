import { expect } from "chai";
import { checkLinkElements, checkFocusStyles } from "../components/controls.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Link Elements", () => {
  it("should pass when there are no link elements", () => {
    const html1 = `<html><body></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLinkElements(document1);
    expect(result1).to.include(
      chalk.green("All elements with href attributes use the <a> element!"),
    );
  });

  it("should fail when links are not in a element", () => {
    const html2 = `<html><body><div href="link.com"></div></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkLinkElements(document2);
    expect(result2).to.include(
      chalk.red(
        'Element with href="link.com" is not an <a> element. Element is <div href="link.com"></div>',
      ),
    );
  });

  it("should pass for links used to import styles and scripts", () => {
    const html3 = `<html><head><link rel="stylesheet" href="styles.css"><head><body></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkLinkElements(document3);
    expect(result3).to.equal(
      chalk.green("All elements with href attributes use the <a> element!"),
    );
  });
});

describe("Focus Styles", () => {
  it("should pass when all control elements have :focus state", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          a:focus, button:focus, input:focus, textarea:focus, select:focus {
            outline: 2px solid #3498db;
          }
        </style>
      </head>
      <body>
        <button>Click me</button>
        <a href="#link">Link</a>
        <textarea></textarea>
        <input></input>
        <select></select>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document: testDocument } = dom.window;
    const result = checkFocusStyles(testDocument);
    expect(result).to.include(
      chalk.green("All control elements attributes have a :focus state!"),
    );
  });

  it("should fail when a link element does not have :focus state", () => {
    const html = `<html><body><a href="#link">Link</a></body></html>`;
    const dom = new JSDOM(html);
    const { document: testDocument } = dom.window;
    const elem = testDocument.querySelector("a");
    elem.focus();
    const result = checkFocusStyles(testDocument);
    expect(result).to.include(
      chalk.red(
        'Element <a href="#link">Link</a> does not have a :focus state.',
      ),
    );
  });

  it("should pass when no control elements are present", () => {
    const html = `<html><body></body></html>`;
    const dom = new JSDOM(html);
    const { document: testDocument } = dom.window;
    const result = checkFocusStyles(testDocument);
    expect(result).to.include(
      chalk.green("All control elements attributes have a :focus state!"),
    );
  });

  it("should fail when mixed control elements have :focus state", () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        a:focus, textarea:focus, select:focus {
          outline: 2px solid #3498db;
        }
      </style>
    </head>
    <body>
      <button>Click me</button>
      <a href="#link">Link</a>
      <textarea></textarea>
      <input></input>
      <select></select>
    </body>
    </html>
    `;
    const dom = new JSDOM(html);
    const { document: testDocument } = dom.window;
    const elem = testDocument.querySelector("button");
    elem.focus();
    const result = checkFocusStyles(testDocument);
    expect(result).to.include(
      chalk.red(
        "Element <button>Click me</button> does not have a :focus state.",
      ),
    );
  });
});
