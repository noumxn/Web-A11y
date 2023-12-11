import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "text/html; charset=utf-8";

/**
 * @async
 * @function validateHtml
 * @param {string} htmlContent
 * @return {boolean} returns false when no HTML validity issues
 * @return {Array} returns markupErrors when there are HTML validity issues
 * @description Validates HTML using the w3 HTML Validator API
 **/

export const validateHtml = async (htmlContent) => {
  try {
    const { data } = await axios.post(
      "https://validator.w3.org/nu/?out=json",
      htmlContent,
    );
    let markupErrors = [];
    for (let msg of data.messages) {
      if (msg.type === "error") {
        markupErrors.push(msg.message);
      }
    }
    if (markupErrors.length === 0) {
      return false;
    } else {
      return markupErrors;
    }
  } catch (e) {
    console.error("Error while validating HTML content: ", e);
  }
};
