import {expect} from 'chai';
import chalk from 'chalk';
import {JSDOM} from 'jsdom';
import {checkReadability} from '../components/readabilityIndex.js';

describe('Readability Index Tests', () => {
  it('should fail because Readability Index is above max level', () => {
    const html1 = `<!DOCTYPE html>
<html>
<body><p>In the realm of quantum computing, the burgeoning field of quantum error correction stands as a beacon of promise. By harnessing the peculiar properties of superposition and entanglement, researchers endeavor to design fault-tolerant quantum codes that can shield delicate quantum states from the pernicious influence of decoherence and noise, thereby paving the way for the realization of robust and scalable quantum computational architectures.</p></body>
</html>`;
    const dom1 = new JSDOM(html1);
    const {document: document1} = dom1.window;
    const result1 = checkReadability(document1);
    expect(result1).to.include('Readability test failed! (Flesch-Kincaid Grade Level:');
  });

  it('should pass because Readability Index is below max level', () => {
    const html2 = `<!DOCTYPE html>
<html>
<body><p>This paragraph lacks a blank line before it.</p><p>
      Another valid paragraph.
      Blank lines before and after.
  </p>
</body>
</html>`;
    const dom2 = new JSDOM(html2);
    const {document: document2} = dom2.window;
    const result2 = checkReadability(document2);
    expect(result2).to.include('Readability test passed! (Flesch-Kincaid Grade Level:');
  });
});
