import {expect} from 'chai';
import chalk from 'chalk';
import {JSDOM} from 'jsdom';
import {checkNonSensoryRef} from '../components/nonSensoryRef.js';

describe('Non Sensory References', () => {
  it('should fail', () => {
    const html1 = `<!DOCTYPE html><html><button type="button">Click the red colored button</button><head></head></html>`;
    const dom1 = new JSDOM(html1);
    const {document: document1} = dom1.window;
    const result1 = checkNonSensoryRef(document1);
    expect(result1).to.include(chalk.red('Reference relies on sensory characteristics:'));
  });

  it('should fail', () => {
    const html2 = `<!DOCTYPE html><html><head><title>Test Case</title></head><body><a href="#">Click the round shaped button</a></body></html>`;
    const dom2 = new JSDOM(html2);
    const {document: document2} = dom2.window;
    const result2 = checkNonSensoryRef(document2);
    expect(result2).to.include(chalk.red('Reference relies on sensory characteristics:'));
  });

  it('should fail', () => {
    const html3 = `<!DOCTYPE html><html>
      <label for="submit-button">Enter your input at the bottom of the page</label>
      <input type="submit" id="submit-button" value="Submit Form">
      <body></body></html>`;
    const dom3 = new JSDOM(html3);
    const {document: document3} = dom3.window;
    const result3 = checkNonSensoryRef(document3);
    expect(result3).to.include(chalk.red('Reference relies on sensory characteristics:'));
  });

  it('should pass', () => {
    const html4 = `<!DOCTYPE html><html><body></body></html>`;
    const dom4 = new JSDOM(html4);
    const {document: document4} = dom4.window;
    const result4 = checkNonSensoryRef(document4);
    expect(result4).to.equal(chalk.green('Non-sensory references test passed!'));
  });
});
