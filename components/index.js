import { checkAriaAttr } from "./ariaLabel.js";
import { checkAltText } from "./altText.js";
import { checkCaptions } from "./captions.js";
import { checkAudioDesc } from "./audioDesc.js";
import { checkTimeBasedMediaAlt } from "./altPresentations.js";
import { checkParagraphs } from "./paragraphText.js";
import { checkNonSensoryRef } from "./nonSensoryRef.js";
import { checkPageTitle } from "./pageTitle.js";

export const testAccessibility = (document) => {
  // TODO: Sort these in order of priority
  funcRunner(checkAriaAttr, document);
  funcRunner(checkAltText, document);
  funcRunner(checkCaptions, document);
  funcRunner(checkAudioDesc, document);
  funcRunner(checkTimeBasedMediaAlt, document);
  funcRunner(checkParagraphs, document);
  funcRunner(checkNonSensoryRef, document);
  funcRunner(checkPageTitle, document);
};

//needs to be async so it will wait for output before finishing
async function funcRunner(func, document) {
  const output = await func(document);
  if (output) console.log(output);
}
