/**
 * 
 * @param {string} nodeName 
 * @param {{[key:string]:any}} attributes 
 * @param {Array<string | { nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }>} children 
 * @returns {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} children 
 */
export function h(nodeName, attributes, props, ...children){
  if(!attributes) attributes = {}

  return { nodeName, attributes, props, children }
}

/**
 * 
 * @param {(args) => {}} fn 
 */
export function createComponentNode(fn, props){
  window.currentComponent = fn 

  return h('div', null, { ...props }, fn(props));
}