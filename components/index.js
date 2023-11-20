/*
 * @file components/index.js
 * @description Inward facing wrapper interface that calls all the functions that test a web-page for accessibility
 **/

import { checkAriaAttr } from "./ariaLabel.js";
import { checkAltText } from "./altText.js";
import { checkCaptions } from "./captions.js";
import { checkAudioDesc } from "./audioDesc.js";
import { checkTimeBasedMediaAlt } from "./altPresentations.js";
import { checkReadability } from "./readabilityIndex.js";
import { checkDescriptiveHeadings } from "./descriptiveHeadings.js";
import { checkKeyboardAccessibility } from "./keyboardAccessible.js";
import { checkPageTitle } from "./pageTitle.js";
import { checkSkipLinks } from "./easyNavigation.js";
import { checkHeadings } from "./headings.js";
import { checkHeadingOrder } from "./headingOrder.js";
import { checkLists } from "./lists.js";
import { checkSensoryRefs } from "./nonSensoryRef.js";

/*
 * @function testAccessibility
 * @param {Document} document
 * @description Calls the funcRunner(func, document) function with each accessibility testing function
 * @todo Sort these in order of priority
 **/

export const testAccessibility = async (document) => {
  funcRunner(checkAriaAttr, document);
  funcRunner(checkAltText, document);
  funcRunner(checkCaptions, document);
  funcRunner(checkAudioDesc, document);
  funcRunner(checkTimeBasedMediaAlt, document);
  funcRunner(checkReadability, document);
  funcRunner(checkDescriptiveHeadings, document);
  funcRunner(checkKeyboardAccessibility, document);
  funcRunner(checkPageTitle, document);
  funcRunner(checkSkipLinks, document);
  funcRunner(checkHeadings, document);
  funcRunner(checkHeadingOrder, document);
};

/*
 * @function funcRunner
 * @param {function} func
 * @param {Document} document
 * @description Executes the function passed in as param, while passing document as its arguement, and logs the output returned
 **/

async function funcRunner(func, document) {
  const output = await func(document);
  if (output) console.log(output);
}
