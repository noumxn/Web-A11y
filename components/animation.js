import chalk from "chalk";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = "../output.css";
const scriptDirectory = __dirname;
const cssFilePath = path.resolve(scriptDirectory, cssPath);

/**
 * @function checkFlashes
 * @param {Document} document
 * @return {string} Success message if all animations flashes 3 times per second or less
 * @return {string} Failure message if an animation flashes more than 3 times per second
 * @throws Error parsing the HTML file
 * @desc ERROR
 * @description
 * 14.A
 * Ensure animations are subtle and do not flash too much
 * Certain kinds of strobing or flashing animations will trigger seizures
 * Others may be distracting and disruptive, especially for certain kinds of
 * cognitive disability such as ADHD
 **/

export const checkAnimationFlash = async () => {
    try {
        let output = "Make sure that all animations do not flash more than 3 times per second";
        const cssContent = await fs.readFile(cssFilePath, "utf8");

        const flashViolations = checkFlashes(cssContent);

        if (flashViolations.length != 0) {
            flashViolations.forEach(violation => {
                output += "Animation named: '" + violation;
            });
        }

        if (output.length == 0) {
            return chalk.green("Animations do not exceed flash limit!")
        }
        else { return chalk.yellow(output); }

    } catch (err) {
        return `${chalk.red("Error processing the document or CSS file:")}${err}`;
    }
};

export const checkReducedMotion = async () => {
    try {
        const cssContent = await fs.readFile(cssFilePath, "utf8");
        const kfPattern = /@keyframes\s+([\w-]+)\s*{[^}]*}/g;
        const mediaQueryPattern = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[^}]*}/g;
        const animations = [];

        // Find keyframes
        let keyframes;
        while ((keyframes = kfPattern.exec(cssContent)) !== null) {
            const animationName = keyframes[1];
            animations.push({ name: animationName });
        }

        if (animations.length == 0 || mediaQueryPattern.test(cssContent)) {
            return chalk.green("All animations obey the prefers-reduced-motion media query");
        }
        else {
            return chalk.red("Animations do not obey the prefers-reduced-motion query");
        }

    } catch (err) {
        return `${chalk.red("Error processing the document or CSS file:")}${err}`;
    }
};


function countKeyframes(cssCode, animationName) {
    const keyframesPattern = new RegExp(`@keyframes\\s+${animationName}\\s*{([^}]*)}`, 'g');

    const keyframesMatches = cssCode.match(keyframesPattern);

    if (keyframesMatches) {
        // Extract the keyframes block
        const keyframesBlock = keyframesMatches[0];

        // Count the number of frames
        const framesCount = (keyframesBlock.match(/(?:\d+%)\s*{/g) || []).length;

        return framesCount;
    }

    // If the animation name is not found
    return 0;
}

function checkFlashes(cssContent) {
    const kfPattern = /@keyframes\s+([\w-]+)\s*{[^}]*}/g;
    const animPattern = /\s*animation\s*:\s*([^;]+);/g;
    const durPattern = /\b(\d*\.?\d+)(s|ms)\b/g;
    const flashesPerSec = 3; //limit flashes to 3 or less each second
    const animations = [];

    // Find keyframes
    let keyframes;
    while ((keyframes = kfPattern.exec(cssContent)) !== null) {
        const animationName = keyframes[1];
        const frames = countKeyframes(cssContent, animationName);
        animations.push({ name: animationName, duration: 0, frames: frames });
    }

    // Find animations in regular rules
    let matches;
    while ((matches = animPattern.exec(cssContent)) !== null) {
        const properties = matches[1].split(',');
        for (const prop of properties) {
            const parts = prop.trim().split(' ');
            const animationName = parts[0];
            const durationMatch = parts.find(part => durPattern.test(part));

            if (durationMatch) {
                const [unit] = durationMatch.match(/\b(\d*\.?\d+)(s|ms)\b/);
                const durationInSeconds = unit;

                const animation = animations.find(a => a.name === animationName);
                if (animation) {
                    animation.duration = Math.max(animation.duration, durationInSeconds);
                }
            }
        }
    }
    const violations = animations
        .filter(animation => animation.frames / animation.duration > flashesPerSec)
        .map(animation => animation.name);

    return violations;
}