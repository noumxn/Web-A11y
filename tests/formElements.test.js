import { checkFieldsetLegend } from "../components/formElements.js";
import { JSDOM } from "jsdom";
import { expect } from "chai";

describe("Fieldset and Legend Tests", () => {
  it("should pass when fieldset and legend are used appropriately", () => {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Test Page</title>
        </head>
        <body>
          <form>
            <fieldset>
              <legend>Form Section</legend>
              <!-- Form fields go here -->
            </fieldset>
          </form>
        </body>
        </html>
        `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkFieldsetLegend(document);
    const expectedSuccessMessage = "Fieldset and Legend test passed!";
    expect(result.includes(expectedSuccessMessage)).to.be.true;
  });

  it("should fail when legend is missing for fieldset", () => {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Test Page</title>
        </head>
        <body>
          <form>
            <fieldset>
              <!-- Form fields go here -->
            </fieldset>
          </form>
        </body>
        </html>
        `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkFieldsetLegend(document);
    const expectedFailureMessage = "Fieldset and Legend test failed!";
    expect(result.includes(expectedFailureMessage)).to.be.true;
  });

  it("should fail when fieldset is missing for legend", () => {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Test Page</title>
        </head>
        <body>
          <form>
            <legend>Form Section</legend>
            <!-- Form fields go here -->
          </form>
        </body>
        </html>
        `;
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const result = checkFieldsetLegend(document);
    const expectedFailureMessage = "Fieldset and Legend test failed!";
    expect(result.includes(expectedFailureMessage)).to.be.true;
  });
});
