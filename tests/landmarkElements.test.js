import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkLandmarkElements } from "../components/landmarkElements.js";

describe("Landmark Elements Tests", () => {
  it("should pass when high-priority landmark elements are present", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
      </head>
      <body>
        <header></header>
        <nav></nav>
        <main></main>
        <footer></footer>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkLandmarkElements(document);
    expect(result).to.include(
      chalk.green("High-Priority Landmark Elements check passed!"),
    );
  });

  it("should issue a warning when non-high-priority landmark elements are present", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
      </head>
      <body>
        <header></header>
        <nav></nav>
        <main></main>
        <footer></footer>
        <section></section> <!-- Non-high-priority landmark element -->
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkLandmarkElements(document);
    expect(result).to.include(
      chalk.yellow("Some non-high-priority landmark elements are present."),
    );
  });

  it("should fail when one or more high-priority landmark elements are missing", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
      </head>
      <body>
        <!-- Missing one or more high-priority landmark elements -->
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkLandmarkElements(document);
    const missingElements = "header, nav, main, footer"; // Add the missing high-priority elements
    expect(result).to.include(
      chalk.red(
        `One or more high-priority landmark elements are missing: ${missingElements}`,
      ),
    );
  });
});
