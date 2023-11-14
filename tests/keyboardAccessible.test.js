import { JSDOM } from "jsdom";
import chalk from "chalk";
import { checkKeyboardAccessibility } from "../components/keyboardAccessible.js";
import { expect } from "chai";

describe("Keyboard Accessibility Tests", () => {
  it("should pass after finding all focusable elements", async () => {
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
    const result1 = await checkKeyboardAccessibility(document1);
    const expectedSuccessMessage =
      "Keyboard accessibility for all elements has passed!";
    expect(result1.includes(expectedSuccessMessage)).to.be.true;
  });

  it("should fail because it can't find focusable elements", async () => {
    const html2 = `
      <!DOCTYPE html>
      <html>
        <body>
        </body>
      </html>
    `;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = await checkKeyboardAccessibility(document2);
    const expectedErrorMessage = "No focusable elements found.";
    expect(result2.includes(expectedErrorMessage)).to.be.true;
  });

  it("should fail because an element is invisible", async () => {
    const html3 = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invisible Element</title>
        <style>
          #invisibleElement {
            display: none;
          }
        </style>
      </head>
      <body>
        <button id="invisibleElement" disabled>I'm invisible and not focusable</button>
      </body>
      </html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = await checkKeyboardAccessibility(document3);
    const expectedErrorMessage = "Element 1 is invisible or not focusable";
    expect(result3.includes(expectedErrorMessage)).to.be.true;
  });
});
