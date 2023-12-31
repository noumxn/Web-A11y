import { JSDOM } from "jsdom";
import { checkButtonAccess } from "../components/buttons.js";
import { expect } from "chai";

describe("Keyboard Button Tests", () => {
  it("should pass after finding all the buttons", async () => {
    const html1 = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Visible Button</title>
    </head>
    <body>
      <button id="visibleButton">Click me</button>
    </body>
    </html>
    `;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkButtonAccess(document1);
    expect(result1).to.include(
      "Keyboard accessibility for all buttons has passed!",
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
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = await checkButtonAccess(document2);
    expect(result2).to.include("No buttons found.");
  });

  it("should fail because a button is invisible", async () => {
    const html3 = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invisible Button Example</title>
        <style>
          #invisibleButton {
            display: none;
          }
        </style>
      </head>
      <body>
        <button id="invisibleButton" disabled>I'm invisible and not focusable</button>
      </body>
      </html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = await checkButtonAccess(document3);
    expect(result3).to.include("Button 1 is invisible or not focusable");
  });
});
