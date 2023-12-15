import fs from "fs/promises";
import { expect } from "chai";
import { checkInteractiveElementSize } from "../components/easyActivation.js";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

const validCSS = `
/* Your default styles */
button, a {
  width: 44px;
  height: 44px;
}
`;

const invalidCSS = `
/* Your default styles */
button {
  width: 30px;
  height: 30px;
}

a {
  width: 50px;
  height: 50px;
}
`;

describe("Interactive Element Size Check", () => {
  beforeEach(async () => {
    // Reset the CSS file before each test
    await fs.writeFile(filePath, "");
  });

  it("should pass because interactive elements have the required size", async () => {
    await fs.writeFile(filePath, validCSS);

    const result = await checkInteractiveElementSize();
    const expectedMessage = chalk.green(
      "Interactive element size test passed!",
    );
    expect(result.trim()).to.equal(expectedMessage);
  });

  it("should return warning because some interactive elements do not have the required size", async () => {
    await fs.writeFile(filePath, invalidCSS);

    const result = await checkInteractiveElementSize();
    const expectedMessage = chalk.yellow(
      "Warning: Some interactive elements have insufficient size. Ensure buttons and links are at least 44 x 44 pixels.",
    );
    expect(result.trim()).to.equal(expectedMessage);
  });
});
