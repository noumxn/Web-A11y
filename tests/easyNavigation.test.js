import {expect} from 'chai';
import {checkCaptions} from '../components/captions.js';
import {JSDOM} from 'jsdom';
import chalk from 'chalk';

describe('Easy Navigation', () => {
    it('should initiate skip link for users using keyboard shortcuts', () => {
        const html1 = `<html><body><video></video></body></html>`;
        const dom1 = new JSDOM(html1);
        const {document: document1} = dom1.window;
        const result1 = checkCaptions(document1);
        expect(result1).to.include(chalk.red('Multimedia element without captions:'));
      });
    

})