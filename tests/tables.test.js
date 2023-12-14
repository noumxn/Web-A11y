import { expect } from "chai";
import {
  checkTableStructure,
  checkTableHeaders,
  checkTableCaptions,
} from "../components/tables.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Table Structure", () => {
  it("should pass when the table contains all the correct elements", () => {
    const html1 = `<html><body><table><thead></thead><tbody></tbody></table></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkTableStructure(document1);
    expect(result1).to.include("passed!");
  });

  it("should fail when the table does not contain all the correct elements", () => {
    const html2 = `<html><body><table><thead></thead></table></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkTableStructure(document2);
    expect(result2).to.include(
      "An invalid table was found. The table is missing a <tbody>.",
    );
  });
});

describe("Table Headers", () => {
  it("should pass when the table header contains all the correct elements", () => {
    const html1 = `<html><body><table><thead><tr><th></th></tr></thead><tbody></tbody></table></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkTableHeaders(document1);
    expect(result1).to.include("passed!");
  });

  it("should fail when the table header contains <td> instead of <th>", () => {
    const html2 = `<html><body><table><thead><tr><td></td></tr></thead><tbody></tbody></table></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkTableHeaders(document2);
    expect(result2).to.include(
      "The table header contain(s) <td> element(s) where it should be <th>.",
    );
  });

  it("should fail when the table header does not contain <th>", () => {
    const html2 = `<html><body><table><thead><tr></tr></thead><tbody></tbody></table></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkTableHeaders(document2);
    expect(result2).to.include("The table header is missing <th> element(s).");
  });
});

describe("Table Captions", () => {
  it("should pass when there's a caption element inside the table", () => {
    const html1 = `<html><body><table><caption></caption></table></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkTableCaptions(document1);
    expect(result1).to.include("passed!");
  });

  it("should fail the table element does not have a caption element", () => {
    const html2 = `<html><body><table></table></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkTableCaptions(document2);
    expect(result2).to.include("Table(s) are missing the caption element.");
  });
});
