/**
 * 
 * @param {string} nodeName 
 * @param {{[key:string]:any}} attributes 
 * @param {Array<string | { nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }>} children 
 * @returns {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} children 
 */
export function h(nodeName, attributes, ...children){
  attributes['key'] = attributes['key'] || Math.floor(Date.now() * Math.random()).toString(36)

  return { nodeName, attributes, children }
}


export function findByKey(key, node) {
  if (node.attributes?.id === key) {
    return node;
  }

  for (const child of (node.children || [])) {
    if (typeof child !== 'string') {
      const foundNode = findByKey(key, child);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
}