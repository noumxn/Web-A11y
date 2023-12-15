import { expect } from "chai";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { checkAltText } from "../components/altText.js";

describe("Alt Text Component", () => {
  it("should detect missing alt text property", () => {
    const html1 = `<html><body><img /></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAltText(document1);
    expect(result1).to.include(
      chalk.red("\nImage without appropriate alt text:"),
    );
  });

  it("should detect empty alt text property", () => {
    const html2 = `<html><body><img alt="" /></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkAltText(document2);
    expect(result2).to.include(
      chalk.red("\nImage without appropriate alt text:"),
    );
  });

  it('should fail because role="img" but no alt text detected', () => {
    const html3 = `<html><body><svg role="img"></svg></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkAltText(document3);
    expect(result3).to.include(
      chalk.red("\nImage without appropriate alt text:"),
    );
  });

  it("should pass because img has alt text", () => {
    const html4 = `<html><body><img alt="this will pass" /></body></html>`;
    const dom4 = new JSDOM(html4);
    const { document: document4 } = dom4.window;
    const result4 = checkAltText(document4);
    expect(result4).to.include(chalk.green("\nAlt Text test passed!"));
  });

  it("should pass without alt text because it is hidden from users", () => {
    const html5 = `<html><body><img aria-hidden="true" /></body></html>`;
    const dom5 = new JSDOM(html5);
    const { document: document5 } = dom5.window;
    const result5 = checkAltText(document5);
    expect(result5).to.include(chalk.green("Alt Text test passed!"));
  });
});
