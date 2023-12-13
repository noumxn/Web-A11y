import fs from "fs";
import {expect} from "chai";
import {JSDOM} from "jsdom";
import {checkLinkDecoration} from "../components/linkDecoration.js";
import path from "path";
import chalk from "chalk";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);


const cssContent = `
a {
    text-decoration: underline;
}
`;


describe("Link Decoration tests", async () => {
    it("should fail because link is not underlined", async () => {
        fs.writeFileSync(filePath, '');
        const html1 = `<!DOCTYPE html>
    <html>
        <body><p>
            <a href="/">This is a link</a>
        </p></body>
    </html>`;
        const dom1 = new JSDOM(html1);
        const {document: document1} = dom1.window;
        const result1 = await checkLinkDecoration(document1);
        expect(result1).to.include(chalk.yellow("\nLink found without corresponding CSS property or inline style:"));
    });
});


describe("Link Decoration tests", async () => {
    it("should pass because link is underlined", async () => {
        fs.writeFileSync(filePath, cssContent);
        const html2 = `<!DOCTYPE html>
    <html>
        <body>
            <p>
                <a href="/">This is a link</a>
            </p>
        </body>
    </html>`;
        const dom2 = new JSDOM(html2);
        const {document: document2} = dom2.window;
        const result2 = await checkLinkDecoration(document2);
        expect(result2).to.include(chalk.green("Link Decoration test passed!"));
    });
});
