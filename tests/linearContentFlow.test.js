import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkLinearContentFlow } from "../components/linearContentFlow.js";

describe("Linear Content Flow Tests", () => {
  it("should pass when tabindex values are either 0 or -1", async () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unique Title</title>
        </head>
        <body>
          <button tabindex="0">Button 1</button>
          <button tabindex="-1">Button 2</button>
          <button tabindex="0">Button 3</button>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = await checkLinearContentFlow(document);
    expect(result).to.include(
      chalk.green(
        "Linear content flow check passes! All tabindex values are 0 or -1 or there are no elements with tabindex values.",
      ),
    );
  });

  it("should fail when tabindex value is not 0 or -1", async () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unique Title</title>
        </head>
        <body>
          <button tabindex="0">Button 1</button>
          <button tabindex="2">Button 2</button>
          <button tabindex="-1">Button 3</button>
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result = await checkLinearContentFlow(document);
    expect(result).to.include(
      chalk.red(
        "Element with ID '' has tabindex value 2. It should be 0 or -1.",
      ),
    );
  });
});
