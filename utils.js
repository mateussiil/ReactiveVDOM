/**
 * 
 * @param {string} str 
 * @returns 
 */
export function stringToObject(str) {
  const obj = {};
  const regex = /(\w+)\s*=\s*["'](.*?)["']/g;

  str.replace(regex, (match, key, value) => {
    obj[key] = value;
    return match;
  });

  return obj;
}

