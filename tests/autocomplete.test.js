import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkAutocomplete } from "../components/autocomplete.js";

describe("Autocomplete for inputs and textareas check", () => {
  it("should fail because input field does not have expected autocomplete attribute", () => {
    const html1 = `<html>
        <p><label>Customer name: <input name="custname" required></label></p>
      </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAutocomplete(document1);
    expect(result1).to.include(chalk.yellow("\nInput may need autocomplete:"));
  });

  it("should fail because textarea field does not have expected autocomplete attribute", () => {
    const html2 = `<html>
        <p><label>Delivery instructions: <textarea name="comments" maxlength=1000></textarea></label></p>
      </html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkAutocomplete(document2);
    expect(result2).to.include(
      chalk.yellow("\nTextarea may need autocomplete:"),
    );
  });

  it("should pass because input field and textarea field have autocomplete attribute", () => {
    const html3 = `<html>
        <p><label>Customer name: <input name="custname" required autocomplete="shipping name"></label></p>
        <p><label>Delivery instructions: <textarea name="comments" maxlength=1000 autocomplete="delivery instructions"></textarea></label></p>
      </html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkAutocomplete(document3);
    expect(result3).to.include(
      chalk.green("\nAutocomplete Attribute test passed!"),
    );
  });
});
