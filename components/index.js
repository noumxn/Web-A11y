/**
 * @file components/index.js
 * @description Inward facing wrapper interface that calls all the functions that test a web-page for accessibility
 **/

import {checkTimeBasedMediaAlt} from "./altPresentations.js";
import {checkAltText} from "./altText.js";
import {checkAriaAttr} from "./ariaLabel.js";
import {checkAudioDesc} from "./audioDesc.js";
import {checkAutoplay} from "./autoplay.js";
import {checkCaptions} from "./captions.js";
import {checkFocusStyles, checkLinkElements} from "./controls.js";
import {checkDescriptiveHeadings} from "./descriptiveHeadings.js";
import {checkSkipLinks} from "./easyNavigation.js";
import {checkGlobalCode} from "./globalCode.js";
import {checkHeadingOrder} from "./headingOrder.js";
import {checkHeadings} from "./headings.js";
import {checkKeyboardAccessibility} from "./keyboardAccessible.js";
import {checkLists} from "./lists.js";
import {checkNewTab} from "./newTab.js";
import {checkSensoryRefs} from "./nonSensoryRef.js";
import {checkPageTitle} from "./pageTitle.js";
import {checkPauseMedia} from "./pauseMedia.js";
import {checkReadability} from "./readabilityIndex.js";
import {
  checkTableCaptions,
  checkTableHeaders,
  checkTableStructure,
} from "./tables.js";
import {checkViewportZoom} from "./viewportZoom.js";
import {checkLandmarkElements} from "./landmarkElements.js";
import {checkTitleTooltips} from "./titleTooltips.js";
import {checkFieldsetLegend} from "./formElements.js";
import {checkAutocomplete} from "./autocomplete.js";
import {checkErrorMessage} from "./errorMessages.js";
import {checkSessionTimeout} from "./sessionTimeout.js";
import {checkLinkDecoration} from "./linkDecoration.js";

/**
 * @function testAccessibility
 * @param {Document} document
 * @description Calls the funcRunner(func, document) function with each accessibility testing function
 * @todo Sort these in order of priority
 */

export const testAccessibility = async (document, cookie) => {
  funcRunner(checkAriaAttr, document);
  funcRunner(checkAltText, document);
  funcRunner(checkCaptions, document);
  funcRunner(checkAudioDesc, document);
  funcRunner(checkTimeBasedMediaAlt, document);
  funcRunner(checkReadability, document);
  funcRunner(checkDescriptiveHeadings, document);
  funcRunner(checkKeyboardAccessibility, document);
  funcRunner(checkPageTitle, document);
  funcRunner(checkLinkElements, document);
  funcRunner(checkFocusStyles, document);
  funcRunner(checkTableStructure, document);
  funcRunner(checkTableHeaders, document);
  funcRunner(checkTableCaptions, document);
  funcRunner(checkSkipLinks, document);
  funcRunner(checkHeadings, document);
  funcRunner(checkHeadingOrder, document);
  funcRunner(checkLists, document);
  funcRunner(checkGlobalCode, document);
  funcRunner(checkSensoryRefs, document);
  funcRunner(checkAutoplay, document);
  funcRunner(checkPauseMedia, document);
  funcRunner(checkViewportZoom, document);
  funcRunner(checkNewTab, document);
  funcRunner(checkLandmarkElements, document);
  funcRunner(checkTitleTooltips, document);
  funcRunner(checkFieldsetLegend, document);
  funcRunner(checkAutocomplete, document);
  funcRunner(checkErrorMessage, document);
  funcRunner(checkSessionTimeout, document, cookie);
  funcRunner(checkLinkDecoration, document);
};

/**
 * @function funcRunner
 * @param {function} func
 * @param {Document} document
 * @description Executes the function passed in as param, while passing document as its arguement, and logs the output returned
 **/

async function funcRunner(func, document, cookie) {
  const output = await func(document, cookie);
  if (output) console.log(output);
}
