import { expect } from "chai";
import { checkPauseMedia } from "../components/pauseMedia.js";
import { JSDOM } from "jsdom";
import chalk from "chalk";

describe("Media Controls tests", () => {

    it("should fail because video element does not have controls enabled", () => {
        const html1 = `<html><body>
          <video></video>
          </body></html>`;
        const dom1 = new JSDOM(html1);
        const { document: document1 } = dom1.window;
        const result1 = checkPauseMedia(document1);
        expect(result1).to.include(chalk.red("Media element cannot be paused:"));
    });

    it("should fail because audio element does not have controls enabled", () => {
        const html1 = `<html><body>
          <audio></audio>
          </body></html>`;
        const dom1 = new JSDOM(html1);
        const { document: document1 } = dom1.window;
        const result1 = checkPauseMedia(document1);
        expect(result1).to.include(chalk.red("Media element cannot be paused:"));
    });

    it("should pass because video element has controls enabled", () => {
        const html1 = `<html><body>
          <video controls></video>
          </body></html>`;
        const dom1 = new JSDOM(html1);
        const { document: document1 } = dom1.window;
        const result1 = checkPauseMedia(document1);
        expect(result1).to.include(chalk.green("All media elements can be paused!"));
    });

    it("should pass because audio element has controls enabled", () => {
        const html1 = `<html><body>
          <audio controls></audio>
          </body></html>`;
        const dom1 = new JSDOM(html1);
        const { document: document1 } = dom1.window;
        const result1 = checkPauseMedia(document1);
        expect(result1).to.include(chalk.green("All media elements can be paused!"));
    });
})