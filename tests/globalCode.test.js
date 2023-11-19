import { JSDOM } from "jsdom";
import chalk from "chalk";
import { checkGlobalCode } from "../components/globalCode.js";
import { expect } from "chai";

describe("Lang Attribute Tests", () => {
  it("should pass when lang attribute and unique title exist on <html> tag", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unique Title</title>
        </head>
        <body>
          <p>Hello World</p>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = checkGlobalCode(document);
    expect(result).to.equal(
      chalk.green("Global Code check pass!"),
    );
  });

  it("should fail when lang attribute is missing on <html> tag", () => {
    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unique Title</title>
        </head>
        <body>
          <p>Hello World</p>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = checkGlobalCode(document);
    expect(result).to.include(
      chalk.red("Missing lang attribute on the <html> tag:"),
    );
  });

  it("should fail when title is not unique", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Not Unique Title</title>
          <title>Not Unique Title</title>
        </head>
        <body>
          <p>Hello World</p>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = checkGlobalCode(document);
    expect(result).to.include(
      chalk.red("Non-unique title found: Not Unique Title, Not Unique Title"),
    );
  });

  it("should fail when autofocus attribute exists on <html> tag", () => {
    const html = `<!DOCTYPE html>
      <html lang="en" autofocus>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unique Title</title>
        </head>
        <body>
          <p>Hello World</p>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = checkGlobalCode(document);
    expect(result).to.include(
      chalk.red("Autofocus attribute exists on the <html> tag:"),
    );
  });
});
