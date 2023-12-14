import fs from "fs";
import { expect } from "chai";
import { checkOrientationSupport } from "../components/orientation.js";
import { JSDOM } from "jsdom";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

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
    // Mock the file system operations
    fs.writeFileSync(filePath, responsiveCSS);

    const html = `<!DOCTYPE html>
      <html>
          <body><p>
              <a href="/">This is a link</a>
          </p></body>
      </html>`;

    const dom = new JSDOM(html, { runScripts: "dangerously" });
    const { document: documentWithCSS } = dom.window;

    const result = await checkOrientationSupport(documentWithCSS);

    const expectedMessage = chalk.green(
      "Rotation support test passed!",
    );
    expect(result).to.include(expectedMessage);
  });
});
