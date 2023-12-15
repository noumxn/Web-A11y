# Web-A11y

Web-a11y is a cutting-edge command line tool designed for comprehensive accessibility testing of websites. Simplify your development workflow and ensure your sites meet all accessibility standards with Web-a11y's efficient and user-friendly interface

## Setup and Use:

1. Clone the repository using the following command:
   ```bash
   git clone https://github.com/SE4AIResearch/Accessibility-Testing.git
   ```
2. Check out the project repository:

   ```bash
   cd Assessibility-Testing/
   ```

3. Before using the tool, please ensure that you have the following runtime dependencies installed on your system: node.js and npm (or any other package manager). If you do not have these dependencies installed, please follow the instructions below to install and set them up locally:

   - To install node.js and npm, please check out the node.js website (https://nodejs.org/en/) and download the appropriate installer for your OS. Follow the installation instructions provided by the installer.

4. Once you have successfully installed these, you can run the following commands to install the development dependencies:

   ```bash
   npm i
   ```

5. To run the tool, you need to run the following command. The `<url>` can be a URL to any webpage you want to test for accessibility:
   ```bash
   npm start <url>
   ```
6. To manually test a webpage for accessibility, you can add its HTML content to a file name `output.html` and the linked CSS content in `output.css` at the root of the project and run the following command:
   ```bash
   npm start -m
   ```
   OR
   ```bash
   npm start --manual
   ```
7. There are tests set up for ensuring reliability of all features and accuracy of accessibility assessment. You can run these tests using the following command:
   ```bash
   npm run test
   ```

## Authors:

- Ashna Razdan
- Cindy Lee
- Zuting Chen
- Nouman Syed

## Documentation:

Each component and its functionality has been carefully documented. To access documentation, clone the repository, and then check out `docs/index.html`.
