import { expect } from "chai";
import { checkTimeBasedMediaAlt } from "../components/altPresentations.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Audio Description Component for Audios", () => {
  it("should fail when track is missing for audio elements", () => {
    const html1 = `<html><body><audio></audio></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkTimeBasedMediaAlt(document1);
    expect(result1).to.include(
      chalk.red("Audio without appropriate descriptions:"),
    );
  });

  it("should fail when track is present but does not have descriptions as property", () => {
    const html2 = `<html><body><audio><track kind="" /></audio></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkTimeBasedMediaAlt(document2);
    expect(result2).to.include(
      chalk.red("Audio without appropriate descriptions:"),
    );
  });

  it("should pass when video elements have appropriate audio descriptions", () => {
    const html3 = `<html><body><audio><track kind="descriptions" /></audio></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkTimeBasedMediaAlt(document3);
    expect(result3).to.equal(
      chalk.green("Time-Based Media Alternatives test passed!"),
    );
  });
});
