import fs from "fs";
import { expect } from "chai";
import { JSDOM } from "jsdom";
import { checkHorizontalScrolling } from "../components/horizontalScrolling.js";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

describe("Horizontal Scrolling Test", () => {
  it("should pass because the main container has no horizontal scrolling", async () => {
    const cssContent1 = `
    body {
        margin: 0;
        padding: 0;
    }
    .container {
        width: 100%;
    }
    .content {
        width: 1200px; /* Example content width */
        background-color: #f0f0f0;
        /* Your content styles go here */
    }
    `;
    fs.writeFileSync(filePath, cssContent1);
    const html1 = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="styles.css">
            <title>Horizontal Scrolling Example</title>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <!-- Your content goes here -->
                </div>
            </div>
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkHorizontalScrolling(document1);
    expect(result1).to.include("passed!");
  });

  it("should fail because the main container has horizontal scrolling", async () => {
    const cssContent2 = `
      body {
          margin: 0;
          padding: 0;
      }

      .container {
          width: 100%;
          overflow-x: auto;
      }

      .content {
          width: 1200px; /* Example content width */
          background-color: #f0f0f0;
          /* Your content styles go here */
      }
    `;

    fs.writeFileSync(filePath, cssContent2);
    const html2 = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="styles.css">
            <title>Horizontal Scrolling Example</title>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <!-- Your content goes here -->
                </div>
            </div>
        </body>
        </html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = await checkHorizontalScrolling(document2);
    expect(result2).to.include(
      chalk.red("The main container has horizontal scrolling."),
    );
  });
});
