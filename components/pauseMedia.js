import chalk from "chalk";

export const checkPauseMedia = (document) => {
    try {
        const media = document.querySelectorAll("audio, video");
        let output = "";


        media.forEach(element => {
            if (!element.hasAttribute("controls")) {
                output += `${chalk.red(
                    "\nMedia element cannot be paused:",
                )} ${chalk.cyan(element.outerHTML)}`;
            }
        });

        if (output.length === 0) {
            return chalk.green("All media elements can be paused!");
        }

        return chalk.red(output);
    }
    catch (e) {
        return `${chalk.red("Error parsing the HTML file:")}${e}`;
    }
}