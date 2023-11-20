import { expect } from "chai";
import { checkSensoryRefs } from "../components/nonSensoryRef.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("", () => {
  it("should fail", () => {
    const html1 = `<html><body>
      <p>Click on the button below</p>
      <button></button>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkSensoryRefs(document1);
    expect(result1).to.include(
      chalk.yellow(
        "\nThis text might be using Positional/Sensory references to refer to elements:",
      ),
    );
  });

  it("should fail", () => {
    const html1 = `<html><body>
      <div>Select one of the links below</div>
      <a href="#"></a>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkSensoryRefs(document1);
    expect(result1).to.include(
      chalk.yellow(
        "\nThis text might be using Positional/Sensory references to refer to elements:",
      ),
    );
  });

  it("should fail", () => {
    const html1 = `<html><body>
      <button></button>
      <p>PRESS THE BLUE BUTTON ABOVE</p>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkSensoryRefs(document1);
    expect(result1).to.include(
      chalk.yellow(
        "\nThis text might be using Positional/Sensory references to refer to elements:",
      ),
    );
  });

  it("should pass", () => {
    const html2 = `<html><body>
      <p>Refer to Image 1.1</p>
      <img>
      </body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkSensoryRefs(document2);
    expect(result2).to.equal(
      chalk.green("Positional/Sensory References test passed!"),
    );
  });
});
