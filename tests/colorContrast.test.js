import fs from "fs";
import { expect } from "chai";
import { JSDOM } from "jsdom";
import { checkColorContrasts } from "../components/colorContrast.js";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

const cssContent1 = `
p {
    color: ffffff;
}
a {
    color: eeeeee;
}
`;
const cssContent2 = `
p {
    color: ffffff;
}
a {
    color: 020202;
}
`;

describe("Color Contrast check", async () => {
  it("should fail because color contrast is too low", async () => {
    fs.writeFileSync(filePath, cssContent1);
    const html1 = `<!DOCTYPE html>
    <html>
        <body><p>
            <a href="/">This is a link</a>
        </p></body>
    </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = await checkColorContrasts(document1);
    expect(result1).to.include(
      chalk.red("Low contrast between element and parent:"),
    );
  });
});

describe("Link Decoration tests", async () => {
  it("should pass because color contrast meets requirements", async () => {
    fs.writeFileSync(filePath, cssContent2);
    const html2 = `<!DOCTYPE html>
    <html>
        <body>
            <p>
                <a href="/">This is a link</a>
            </p>
        </body>
    </html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = await checkColorContrasts(document2);
    expect(result2).to.include(chalk.green("Color contrast test passed!"));
  });
});
