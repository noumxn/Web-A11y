/**
 * @file components/index.js
 * @description Inward facing wrapper interface that calls all the functions that test a web-page for accessibility
 **/

import chalk from "chalk";
import { checkTimeBasedMediaAlt } from "./altPresentations.js";
import { checkAltText } from "./altText.js";
import { checkAriaAttr } from "./ariaLabel.js";
import { checkAudioDesc } from "./audioDesc.js";
import { checkAutocomplete } from "./autocomplete.js";
import { checkAutoplay } from "./autoplay.js";
import { checkButtonType } from "./buttonType.js";
import { checkCaptions } from "./captions.js";
import { checkColorContrasts } from "./colorContrast.js";
import { checkFocusStyles, checkLinkElements } from "./controls.js";
import { checkDescriptiveHeadings } from "./descriptiveHeadings.js";
import { checkSkipLinks } from "./easyNavigation.js";
import { checkErrorMessage } from "./errorMessages.js";
import { checkFieldsetLegend } from "./formElements.js";
import { checkGlobalCode } from "./globalCode.js";
import { checkHeadingOrder } from "./headingOrder.js";
import { checkHeadings } from "./headings.js";
import { checkHorizontalScrolling } from "./horizontalScrolling.js";
import { checkKeyboardAccessibility } from "./keyboardAccessible.js";
import { checkLandmarkElements } from "./landmarkElements.js";
import { checkTextAlignment } from "./langAlignment.js";
import { checkLinearContentFlow } from "./linearContentFlow.js";
import { checkLinkDecoration } from "./linkDecoration.js";
import { checkLists } from "./lists.js";
import { checkNewTab } from "./newTab.js";
import { checkSensoryRefs } from "./nonSensoryRef.js";
import { checkOrientationSupport } from "./orientation.js";
import { checkPageTitle } from "./pageTitle.js";
import { checkPauseMedia } from "./pauseMedia.js";
import { checkReadability } from "./readabilityIndex.js";
import { checkSelectionContrast } from "./selectionColor.js";
import { checkSessionTimeout } from "./sessionTimeout.js";
import {
  checkTableCaptions,
  checkTableHeaders,
  checkTableStructure,
} from "./tables.js";
import { checkTitleTooltips } from "./titleTooltips.js";
import { checkElementContent } from "./elementContent.js";
import { checkInteractiveElementSize } from "./easyActivation.js";
import { checkViewportZoom } from "./viewportZoom.js";

/**
 * @function testAccessibility
 * @param {Document} document
 * @description Calls the funcRunner(func, document) function with each accessibility testing function
 * @todo Sort these in order of priority
 */

export const testAccessibility = async (document, cookie, output) => {
  console.warn(
    chalk.yellow("Accessibility Manual Checks Required:\n"),
    chalk.cyan(
      "- Verify text alternatives for complex images, including text within images.\n",
      "- Ensure error messages, states (error, warning, success), and media controls are clearly associated and not color-dependent.\n",
      "- Test in specialized browsing modes, with 200% text size, checking content proximity and interactive item spacing.\n",
      "- Assess color contrast for icons\n",
      "- Ensure the is no text overlapping on images or videos, and avoid color-only information.\n",
      "- Maintain a simple, consistent layout.",
    ),
  );
  funcRunner(checkAriaAttr, document, undefined, output);
  funcRunner(checkAltText, document, undefined, output);
  funcRunner(checkCaptions, document, undefined, output);
  funcRunner(checkAudioDesc, document, undefined, output);
  funcRunner(checkTimeBasedMediaAlt, document, undefined, output);
  funcRunner(checkReadability, document, undefined, output);
  funcRunner(checkDescriptiveHeadings, document, undefined, output);
  funcRunner(checkKeyboardAccessibility, document, undefined, output);
  funcRunner(checkPageTitle, document, undefined, output);
  funcRunner(checkLinkElements, document, undefined, output);
  funcRunner(checkFocusStyles, document, undefined, output);
  funcRunner(checkTableStructure, document, undefined, output);
  funcRunner(checkTableHeaders, document, undefined, output);
  funcRunner(checkTableCaptions, document, undefined, output);
  funcRunner(checkSkipLinks, document, undefined, output);
  funcRunner(checkHeadings, document, undefined, output);
  funcRunner(checkHeadingOrder, document, undefined, output);
  funcRunner(checkLists, document, undefined, output);
  funcRunner(checkGlobalCode, document, undefined, output);
  funcRunner(checkSensoryRefs, document, undefined, output);
  funcRunner(checkAutoplay, document, undefined, output);
  funcRunner(checkPauseMedia, document, undefined, output);
  funcRunner(checkViewportZoom, document, undefined, output);
  funcRunner(checkNewTab, document, undefined, output);
  funcRunner(checkLandmarkElements, document, undefined, output);
  funcRunner(checkTitleTooltips, document, undefined, output);
  funcRunner(checkFieldsetLegend, document, undefined, output);
  funcRunner(checkAutocomplete, document, undefined, output);
  funcRunner(checkErrorMessage, document, undefined, output);
  funcRunner(checkSessionTimeout, document, cookie, output);
  funcRunner(checkLinkDecoration, document, undefined, output);
  funcRunner(checkButtonType, document, undefined, output);
  funcRunner(checkColorContrasts, document, undefined, output);
  funcRunner(checkSelectionContrast, document, undefined, output);
  funcRunner(checkOrientationSupport, undefined, undefined, output);
  funcRunner(checkHorizontalScrolling, document, undefined, output);
  funcRunner(checkElementContent, document, undefined, output);
  funcRunner(checkTextAlignment, document, undefined, output);
  funcRunner(checkLinearContentFlow, document, undefined, output);
  funcRunner(checkInteractiveElementSize, undefined, document);
};

/**
 * @function funcRunner
 * @param {function} func
 * @param {Document} document
 * @description Executes the function passed in as param, while passing document as its arguement, and logs the output returned
 **/

async function funcRunner(func, document, cookie, output) {
  let res = undefined;
  res = await func(document, cookie);
  if (res.includes("passed!")) {
    output.pass += res;
  } else {
    output.fail += res;
  }
}
