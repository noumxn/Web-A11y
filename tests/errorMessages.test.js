import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkErrorMessage } from "../components/errorMessages.js";

describe("Check error messages for forms", () => {
  it("should fail because error messages not displayed properly in forms", () => {
    const html1 = `<html><body>
      <form id="login-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Submit</button>
      </form>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkErrorMessage(document1);
    expect(result1).to.include(
      chalk.yellow(
        `Form with id="login-form" may not be throwing appropriate errors for invalid submission.`,
      ),
    );
  });

  it("should pass because error messages are displayed properly in forms", () => {
    const html2 = `<html><body>
      <form id="login-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Submit</button>
      </form>
      <div class="error-list">
      </body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkErrorMessage(document2);
    expect(result2).to.include(chalk.green("Form Errors Display test passed!"));
  });
});
