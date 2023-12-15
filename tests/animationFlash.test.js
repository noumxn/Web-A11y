import { expect } from "chai";
import { checkAnimationFlash } from "../components/animation.js";
import { JSDOM } from "jsdom";
import path from "path";
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const filePath = path.resolve(scriptDirectory, cssPath);

const cssContent1 = `
@keyframes flash {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  
  .element {
    animation: flash 1s infinite;
  }
  `;


describe("Animation flash check", async () => {
    it("should warn the user to check their animations", async () => {
        fs.writeFileSync(filePath, cssContent1);
        const html1 = `<!DOCTYPE html>
    <html>
        <body>
            <div class="element"></div>
        </body>
    </html>`;
        const dom1 = new JSDOM(html1);
        const { document: document1 } = dom1.window;
        const result1 = await checkAnimationFlash(document1);
        expect(result1).to.include(
            chalk.yellow("Make sure that all animations do not flash more than 3 times per second"),
        );
    });
});