/*
 * @file components/index.js
 * @description Inward facing interface that calls all the functions that test a web-page for accessibility
 **/

import {checkAriaAttr} from './ariaLabel.js';
import {checkAltText} from './altText.js'
import {checkCaptions} from './captions.js';
import {checkAudioDesc} from './audioDesc.js';
import {checkTimeBasedMediaAlt} from './altPresentations.js';
import {checkParagraphs} from './paragraphText.js';
import {checkNonSensoryRef} from './nonSensoryRef.js';
import {checkReadability} from './readabilityIndex.js';


/*
 * @function testAccessibility
 * @param {Document} document
 * @description Calls the funcRunner(func, document) function with each accessibility testing function
 * @todo Sort these in order of priority
 **/

export const testAccessibility = (document) => {
  funcRunner(checkAriaAttr, document);
  funcRunner(checkAltText, document);
  funcRunner(checkCaptions, document);
  funcRunner(checkAudioDesc, document);
  funcRunner(checkTimeBasedMediaAlt, document);
  funcRunner(checkParagraphs, document);
  funcRunner(checkNonSensoryRef, document);
  funcRunner(checkReadability, document);
}

/*
 * @function funcRunner
 * @param {function} func
 * @param {Document} document
 * @description Executes the function passed in as param, while passing document as its arguement, and logs the output returned
 **/

function funcRunner(func, document) {
  const output = func(document);
  if (output) console.log(output);
}
