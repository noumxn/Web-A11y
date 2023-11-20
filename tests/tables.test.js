import { expect } from "chai";
import { checkTableStructure } from "../components/tables.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Table Structure", () => {
    it("should pass when the table contains all the correct elements", () => {
      const html1 = `<html><body><table><thead></thead><tbody></tbody></table></body></html>`;
      const dom1 = new JSDOM(html1);
      const { document: document1 } = dom1.window;
      const result1 = checkTableStructure(document1);
      expect(result1).to.include(chalk.green("All table elements are valid!"));
    });
  
    it("should fail when the table does not contain all the correct elements", () => {
      const html2 = `<html><body><table><thead></thead></table></body></html>`;
      const dom2 = new JSDOM(html2);
      const { document: document2 } = dom2.window;
      const result2 = checkTableStructure(document2);
      expect(result2).to.include(chalk.red('An invalid table was found. The table is missing a <tbody>'));
    });
  });