/*
 * @async
 * @param {string} string
 * @return {boolean} Returns true when string matches regex for URL
 * @description Validates that given param string is a valid URL
 **/

export const isValidURL = (string) => {
  string = string.toLowerCase();
  const res = string.match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  );
  const localhostRes = string.match(
    /((http([s]){0,1}:\/\/){0,1}(localhost|127.0.0.1){1}(([:]){0,1}[\0-9]{4}){0,1}\/{0,1}){1}/g,
  );

  return !res || !localhostRes;
};
