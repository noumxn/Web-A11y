import {expect} from "chai";
import {checkTextAlignment} from "../components/langAlignment.js";
import {JSDOM} from "jsdom";
import chalk from "chalk";

describe("Check Language Text Alignment", () => {
    it("should pass because english is right aligned", () => {
        const html1 = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Passing Test Case</title>
                <style>
                    .ltr-text {
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <p class="ltr-text">This is a paragraph in English (LTR).</p>
            </body>
            </html>
        `;
        const dom1 = new JSDOM(html1);
        const {document: document1} = dom1.window;
        const result1 = checkTextAlignment(document1);
        expect(result1).to.include("Text Alignment test passed!");
    });

    it("should pass because arabic is left aligned", () => {
        const html2 = `
                <!DOCTYPE html>
            <html lang="ar">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Failing Test Case</title>
                <style>
                    .ltr-text {
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <p class="ltr-text">هذا هو فقرة باللغة العربية (RTL).</p>
            </body>
            </html>
        `;
        const dom2 = new JSDOM(html2);
        const {document: document2} = dom2.window;
        const result2 = checkTextAlignment(document2);
        expect(result2).to.include("Text Alignment test passed!");
    });
});
