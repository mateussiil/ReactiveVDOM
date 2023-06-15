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

export function findNodeByKey(key, node) {
  if (node.attributes?.id === key) {
    return node;
  }

  for (const child of (node.children || [])) {
    if (typeof child !== 'string') {
      const foundNode = findNodeByKey(key, child);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
}
