import fs from "fs";
import { expect } from "chai";
import { checkOrientationSupport } from "../components/orientation.js";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);
const noOrientationCSS = `
/* Your default styles for both portrait and landscape orientations */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

p {
  margin: 20px;
}

a {
  color: #007bff;
  text-decoration: none;
}
`;

const responsiveCSS = `
/* Your default styles for both portrait and landscape orientations */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

p {
  margin: 20px;
}

a {
  color: #007bff;
  text-decoration: none;
}

/* Media query for landscape orientation */
@media (orientation: landscape) {
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  p {
    text-align: center;
  }
}
`;

describe("Orientation Check", () => {
  it("should pass because there are media queries supporting orientation", async () => {
    fs.writeFileSync(filePath, responsiveCSS);

    const result = await checkOrientationSupport();
    const expectedMessage = chalk.green("Rotation support test passed!");
    expect(result).to.include(expectedMessage);
  });
  it("should return warning because there are no media queries restricting orientation", async () => {
    fs.writeFileSync(filePath, noOrientationCSS);

    const result = await checkOrientationSupport();
    const expectedMessage = chalk.yellow(
      "Warning: No @media queries with orientation found in the CSS. Consider setting orientation styles.",
    );
    expect(result).to.include(expectedMessage);
  });
});
