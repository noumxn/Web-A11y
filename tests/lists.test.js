import { expect } from "chai";
import { checkLists } from "../components/lists.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Lists Tests", () => {
  it("should pass since there is no list content outside of the <ul> element", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include("passed!");
  });

  it("should fail since there are bullet points", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
            &#x2022 content
            &#x25E6 more content
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include(
      "Use list elements (<ul>, <ol>, <dl>) for list content instead of",
    );
  });

  it("should fail since there are triangle bullet points", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
            &#x2023 content
            &#x25B9 more content
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include(
      "Use list elements (<ul>, <ol>, <dl>) for list content instead of",
    );
  });

  it("should fail since there are square bullet points", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
            &#x25AA content
            &#x25A0 more content
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include(
      "Use list elements (<ul>, <ol>, <dl>) for list content instead of ",
    );
  });

  it("should fail since there are asterisks", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
            * content
            * more content
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include(
      "Use list elements (<ul>, <ol>, <dl>) for list content instead of",
    );
  });

  it("should fail since there are hyphens", () => {
    const html1 = `<html>
        <body>
            <ul>
            <li>content</li>
            </ul>
            - content
            - more content
            &#x2043 even more content
        </body>
        </html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkLists(document1);
    expect(result1).to.include(
      "Use list elements (<ul>, <ol>, <dl>) for list content instead of",
    );
  });
});
