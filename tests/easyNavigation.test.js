import {expect} from 'chai';
import {checkSkipLinks} from '../components/easyNavigation.js';
import {JSDOM} from 'jsdom';
import chalk from 'chalk';

describe('Skip Link', () => {
    it('should contain skip link for users using keyboard shortcuts', () => {
        const html1 = `<html><body><a href="#main-content"></a></body></html>`;
        const dom1 = new JSDOM(html1);
        const {document: document1} = dom1.window;
        const result1 = checkSkipLinks(document1);
        expect(result1).to.include(chalk.green('Skip Link test passed!'));
      });
    
    it('does not contain skip link for users using keyboard shortcuts', () => {
      const html1 = `<html><body><a href="someLink"></a></body></html>`;
      const dom1 = new JSDOM(html1);
      const {document: document1} = dom1.window;
      const result1 = checkSkipLinks(document1);
      expect(result1).to.include(chalk.red('Missing skip link'));
    });
    

})