import {expect} from 'chai';
import chalk from 'chalk';
import {JSDOM} from 'jsdom';
import {checkParagraphs} from '../components/paragraphText.js';

describe('Paragraph Validity Check', () => {
  it('should fail because missing leading and trailing spaces in both paragraphs', () => {
    const html1 = `<!DOCTYPE html>
<html>
<head>
    <title>Test Case</title>
</head>
<body><p>This paragraph lacks both beginning and ending blank lines.</p><p>Another invalid paragraph. No Blank lines before and after.</p></body>
</html>`;
    const dom1 = new JSDOM(html1);
    const {document: document1} = dom1.window;
    const result1 = checkParagraphs(document1);
    expect(result1).to.include(chalk.red('Paragraph not properly formatted:'));
  });

  it('should fail because missing leading and trailing spaces in first paragraph', () => {
    const html2 = `<!DOCTYPE html>
<html>
<head>
    <title>Test Case</title>
</head>
<body><p>This paragraph lacks a blank line before it.</p><p>
      Another valid paragraph.
      Blank lines before and after.
  </p>
</body>
</html>`;
    const dom2 = new JSDOM(html2);
    const {document: document2} = dom2.window;
    const result2 = checkParagraphs(document2);
    expect(result2).to.include(chalk.red('Paragraph not properly formatted:'));
  });

  it('should pass because given paragraph has leading and trailing spaces', () => {
    const html3 = `<!DOCTYPE html>
<html>
<head>
    <title>Test Case</title>
</head>
<body>
  <p>
      This is a valid paragraph.
      It starts with a blank line but lacks one after.
  </p>
</body>
</html>`;
    const dom3 = new JSDOM(html3);
    const {document: document3} = dom3.window;
    const result3 = checkParagraphs(document3);
    expect(result3).to.equal(chalk.green('Paragraph recognition test passed!'));
  });

  it('should pass because both paragraph have leading and trailing spaces', () => {
    const html4 = `<!DOCTYPE html>
<html>
<head>
    <title>Test Case</title>
</head>
<body>
  <p>
      This is a valid paragraph.
      It starts with a blank line but lacks one after.
  </p>
  <p>
      Another valid paragraph.
      Blank lines before and after.
  </p>
</body>
</html>`;
    const dom4 = new JSDOM(html4);
    const {document: document4} = dom4.window;
    const result4 = checkParagraphs(document4);
    expect(result4).to.equal(chalk.green('Paragraph recognition test passed!'));
  });
});
