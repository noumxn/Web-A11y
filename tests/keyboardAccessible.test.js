import { JSDOM } from "jsdom";
import chalk from "chalk";
import { checkKeyboardAccessibility } from "../components/keyboardAccessible.js";
import { expect } from "chai";

describe("Keyboard Accessibility Tests", () => {
  it("should pass after finding all focusable elements, button ", async () => {
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
    expect(result1).to.equal(
      chalk.green("Keyboard accessibility for all elements has passed!"),
    );
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
    expect(result2).to.equal(chalk.red("\nNo focusable elements found."));
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
    expect(result3).to.include(
      chalk.red("\nElement is invisible or not focusable: "),
    );
  });
  it("should pass after finding input:not([type='hidden'])", async () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Focusable Elements Test</title>
        </head>
        <body>
          <button id="btn1">Click me</button>
          <a href="#" id="link1">Link</a>
          <input type="text" id="input1">
          <input type="hidden" id="hiddenInput">
        </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document: document1 } = dom.window;
    const result4 = await checkKeyboardAccessibility(document1);
    expect(result4).to.equal(
      chalk.green("Keyboard accessibility for all elements has passed!"),
    );
  });
  it("should fail after finding an invisible or not focusable element", async () => {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Non-Accessible Page</title>
      </head>
      <body>
        <button id="btn1" style="display: none;">Invisible Button</button>
        <a href="#" id="link1" disabled>Disabled Link</a>
        <input type="hidden" id="input1">
        <div tabindex="-1" id="div1">Not Focusable Div</div>
      </body>
      </html>`;

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const result5 = await checkKeyboardAccessibility(document);
    expect(result5).to.include(
      chalk.red("\nElement is invisible or not focusable: "),
    );
  });
});
