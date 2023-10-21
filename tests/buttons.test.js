import { JSDOM } from "jsdom";
import chalk from "chalk";
import { checkButtonAccess } from "../components/buttons.js";
import { expect } from "chai";

describe("Keyboard Button Tests", () => {
  it("should pass after finding the all the buttons", async () => {
    const html1 = `<!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    <button>Green</button>
    </body>
    </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkButtonAccess(document1);
    expect(result1).to.include(
      chalk.green("Keyboard accessiblity for all buttons have passed!")
    );
  });

  it("should fail because it can't find the button", async () => {
    const html2 = `
    <!DOCTYPE html>
    <html>
      <body>
      </body>
    </html>
    `;
    const dom1 = new JSDOM(html2);
    const { document: document2 } = dom1.window;
    const result2 = await checkButtonAccess(document2);
    expect(result2).to.include(`${chalk.red("\nButton is not found.")}`);
  });
});
