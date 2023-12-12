import chalk from "chalk";

/**
 * @function checkSessionTimeout
 * @param {Array} cookie
 * @return {string} Success message if the webpage has a session timeout greater than 20 hours
 *                  or no session timeout
 * @return {string} Failure message if the webpage has a session timeout less than 20 hours
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 2.G
 * Setting minumim session timeout to 20 hours
 * If the session timeout is less, it may interrupt the user causing screen readers to lose track of position/progress.
 **/

export const checkSessionTimeout = (document, cookie) => {
  try {
    if (!cookie) {
      return `${chalk.green("Session Timeout test passed!")}`;
    }
    const expirationRegex = /Expires=([^;]+)/;
    const currDate = new Date();
    let sessionDates = [];
    for (let info in cookie) {
      const expirationMatch = cookie[info].match(expirationRegex);
      if (expirationMatch) {
        let expirationDate = expirationMatch[1].trim();
        expirationDate = new Date(expirationDate);
        if (currDate > expirationDate) continue;
        sessionDates.push(expirationDate);
      }
    }
    const closestDate = new Date(Math.min(...sessionDates));
    const timeDifference = Math.abs(closestDate - currDate);
    const twentyHoursMs = 20 * 60 * 60 * 1000;
    if (timeDifference <= twentyHoursMs) {
      return `${chalk.red(
        `Session expires at ${closestDate} and has a max age of ${timeDifference}`,
      )}`;
    } else {
      return `${chalk.green("Session Timeout test passed!")}`;
    }
  } catch (e) {
    throw `${chalk.red("Error parsing the HTML file:")} ${e}`;
  }
};
