import { expect } from "chai";
import { checkAudioDesc } from "../components/audioDesc.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Audio Description Component for videos", () => {
  it("should fail when track is missing for video elements", () => {
    const html1 = `<html><body><video></video></body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAudioDesc(document1);
    expect(result1).to.include(
      chalk.red("Multimedia element without audio descriptions:"),
    );
  });

  it("should fail when track is present but does not have descriptions as property", () => {
    const html2 = `<html><body><video><track kind="" /></video></body></html>`;
    const dom2 = new JSDOM(html2);
    const { document: document2 } = dom2.window;
    const result2 = checkAudioDesc(document2);
    expect(result2).to.include(
      chalk.red("Multimedia element without audio descriptions:"),
    );
  });

  it("should pass when video elements have appropriate audio descriptions", () => {
    const html3 = `<html><body><video><track kind="descriptions" /></video></body></html>`;
    const dom3 = new JSDOM(html3);
    const { document: document3 } = dom3.window;
    const result3 = checkAudioDesc(document3);
    expect(result3).to.equal(
      chalk.green("Multimedia Audio Description test passed!"),
    );
  });
});
