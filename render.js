/**
 * 
 * @param {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} vnode 
 * @returns 
 */
export function render(vnode){
  if(typeof vnode==='string'){
    return document.createTextNode(vnode)
  }

  let node = document.createElement(vnode.nodeName)

  for(let name in Object((vnode.attributes || {}))){
    if (typeof vnode.attributes[name] === "function") {
      node[name] = eval(`(${vnode.attributes[name]})`)
    } else {
      node.setAttribute(name, vnode.attributes[name])
    }
  }

  for(let i=0; i<(vnode.children || []).length; i++){
    node.appendChild(render(vnode.children[i]))
  }

  return node
}