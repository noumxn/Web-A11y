import { expect } from "chai";
import { JSDOM } from "jsdom";
import { checkButtonType } from "../components/buttonType.js";

describe("Accessible buttons", () => {
  it(`should fail because button does not have type="missing"`, () => {
    const html1 = `<!DOCTYPE html>
<html>
<body>
<button>SUBMIT</button>
</body>
</html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkButtonType(document1);
    expect(result1).to.include(
      `Found a non-submit button without type="button":`,
    );
  });

  it("should pass because Readability Index is below max level", () => {
    const html2 = `<!DOCTYPE html>
<html>
<html>
<body>
<button type="button">SUBMIT</button>
</body>
</html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkButtonType(document2);
    expect(result2).to.include("Button Type test passed!");
  });
});
