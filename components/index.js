import {checkAriaAttr} from './ariaLabel.js';
import {checkAltText} from './altText.js'
import {checkCaptions} from './captions.js';
import {checkAudioDesc} from './audioDesc.js';
import {checkTimeBasedMediaAlt} from './altPresentations.js';
import {checkParagraphs} from './paragraphText.js';
import {checkNonSensoryRef} from './nonSensoryRef.js';
import {checkReadability} from './readabilityIndex.js';

export const testAccessibility = (document) => {
  // TODO: Sort these in order of priority
  funcRunner(checkAriaAttr, document);
  funcRunner(checkAltText, document);
  funcRunner(checkCaptions, document);
  funcRunner(checkAudioDesc, document);
  funcRunner(checkTimeBasedMediaAlt, document);
  funcRunner(checkParagraphs, document);
  funcRunner(checkNonSensoryRef, document);
  funcRunner(checkReadability, document);
}

function funcRunner(func, document) {
  const output = func(document);
  if (output) console.log(output);
}
