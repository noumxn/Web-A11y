import { JSDOM } from "jsdom";
import { checkViewportZoom } from "../components/viewportZoom.js";
import { expect } from "chai";
import chalk from "chalk";

describe("Viewport Zoom Tests", () => {
  it("should pass when viewport zoom is enabled", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
        <title>Test Page</title>
      </head>
      <body>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkViewportZoom(document);
    expect(result).to.equal(chalk.green("Viewport Zoom test passed!"));
  });

  it("should fail when viewport zoom is disabled", () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>Test Page</title>
      </head>
      <body>
      </body>
      </html>
      `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkViewportZoom(document);
    expect(result).to.equal(chalk.red("Viewport zoom is disabled."));
  });
});
