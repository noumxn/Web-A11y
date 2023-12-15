import { expect } from "chai";
import chalk from "chalk";
import fs from "fs";
import { JSDOM } from "jsdom";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { checkSelectionContrast } from "../components/selectionColor.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

const cssContent1 = `
p {
    color: ffffff;
}
p::selection {
  color: ffffff;
  background-color: eeeeee;
}
`;
const cssContent2 = `
p {
    color: ffffff;
}
p::selection {
  color: red;
  background-color: yellow;
}
`;

describe("Selection Color Contrast check", async () => {
  it("should fail because selection color contrast is too low", async () => {
    await fs.writeFileSync(filePath, cssContent1);
    const html1 = `<!DOCTYPE html>
    <html>
        <body><p>
        Some content
        </p></body>
    </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkSelectionContrast(document1);
    expect(result1).to.include("Low contrast in ::selection for");
  });

  it("should pass because selection color contrast meets requirements", async () => {
    await fs.writeFileSync(filePath, cssContent2);
    const html2 = `<!DOCTYPE html>
    <html>
        <body>
            <p>
            Some content
            </p>
        </body>
    </html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = await checkSelectionContrast(document2);
    expect(result2).to.include(
      chalk.green("Selection Color Contrast test passed!"),
    );
  });
});
