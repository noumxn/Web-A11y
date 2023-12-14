import { expect } from "chai";
import chalk from "chalk";
import { checkSessionTimeout } from "../components/sessionTimeout.js";

const date0 = new Date();
const date1 = new Date();
const date2 = new Date();
const oneMinMs = 1 * 60 * 1000;
const fifteenHoursMs = 15 * 60 * 60 * 1000;
const twentyOneHoursMs = 21 * 60 * 60 * 1000;
date0.setTime(date0.getTime() + oneMinMs);
date1.setTime(date1.getTime() + fifteenHoursMs);
date2.setTime(date2.getTime() + twentyOneHoursMs);

describe("Check session timeout tests", () => {
  it("should fail because session expires immediately", () => {
    const cookie1 = [
      `VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgSA%3D%3D; Domain=.youtube.com; Expires=${date0}; Path=/; Secure; HttpOnly; SameSite=lax`,
    ];
    const result1 = checkSessionTimeout(undefined, cookie1);
    expect(result1).to.include("Session expires at");
  });

  it("should fail because session expires before 20 hours", () => {
    const cookie2 = [
      `VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgSA%3D%3D; Domain=.youtube.com; Expires=${date1}; Path=/; Secure; HttpOnly; SameSite=lax`,
    ];
    const result2 = checkSessionTimeout(undefined, cookie2);
    expect(result2).to.include("Session expires at");
  });

  it("should pass because session expires after 20 hours", () => {
    const cookie3 = [
      `VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgSA%3D%3D; Domain=.youtube.com; Expires=${date2}; Path=/; Secure; HttpOnly; SameSite=lax`,
    ];
    const result3 = checkSessionTimeout(undefined, cookie3);
    expect(result3).to.include(chalk.green("Session Timeout test passed!"));
  });
});
