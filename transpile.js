/**
 * 
 * @param {string} nodeName 
 * @param {{[key:string]:any}} attributes 
 * @param {Array<string | { nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }>} children 
 * @returns {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} children 
 */
export function h(nodeName, attributes, ...children){
  if(!attributes) attributes = {}

  // vue usa ^/: para definir se é props/attributes

  return { nodeName, attributes, children }
}

/**
 * 
 * @param {(args) => {}} fn 
 */
export function createComponentNode(fn, props){
  window.currentComponent = fn 

  return h('div', { ...props }, fn(props));
}