import { expect } from "chai";
import { checkAutoplay } from "../components/autoplay.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Autoplay tests", () => {
  it("should pass because there are no media elements with the autoplay attribute", () => {
    const html1 = `<html><body>
      <video></video>
      <audio></audio>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAutoplay(document1);
    expect(result1).to.include(chalk.green("\nMedia autoplay check passed!"));
  });

  it("should fail because there is audio with the autoplay attribute", () => {
    const html1 = `<html><body>
      <video></video>
      <audio autoplay></audio>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAutoplay(document1);
    expect(result1).to.include(
      chalk.red("\nMedia element with autoplay found"),
    );
  });

  it("should fail because there is video with the autoplay attribute", () => {
    const html1 = `<html><body>
      <video autoplay></video>
      <audio></audio>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAutoplay(document1);
    expect(result1).to.include(
      chalk.red("\nMedia element with autoplay found"),
    );
  });

  it("should fail because there is a youtube video that autoplays", () => {
    const html1 = `<html><body>
      <iframe src="https://youtube.com/embed/LDmKobwAG1I?autoplay=1"></iframe>
      </body></html>`;
    const dom1 = new JSDOM(html1);
    const { document: document1 } = dom1.window;
    const result1 = checkAutoplay(document1);
    expect(result1).to.include(
      chalk.red("\nMedia element with autoplay found"),
    );
  });
});
