/**
 * 
 * @param {string} nodeName 
 * @param {{[key:string]:any}} attributes 
 * @param {Array<string | { nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }>} children 
 * @returns {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} children 
 */
export function h(nodeName, attributes, ...children){
  return {nodeName, attributes, children}
}