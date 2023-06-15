/**
 * 
 * @param {{ nodeName: string, attributes: any, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} vnode 
 * @returns 
 */
export function render(vnode){
  if(typeof vnode==='string' || typeof vnode === 'number'){
    return document.createTextNode(vnode)
  }

  let node = document.createElement(vnode.nodeName)

  for(let name in Object((vnode.attributes || {}))){
    if (typeof vnode.attributes[name] === "function") {
      const fn = vnode.attributes[name]
      const fnName = getFunctionNameInsideOfAnotherFunction(fn)
      window[fnName] = fn
      node[name] = eval(`(${fn})`)
    } else {
      node.setAttribute(name, vnode.attributes[name])
    }
  }

  for(let i=0; i<(vnode.children || []).length; i++){
    node.appendChild(render(vnode.children[i]))
  }

  return node
}

export function rerender(vnode) {
  let node;

  if (vnode.attributes && vnode.attributes.id) {
    node = getElementById(vnode.attributes.id);
  }

  // if (typeof vnode === 'string' || typeof vnode === 'number') {
  //   return document.createTextNode(vnode);
  // }

  if (node) {
    // Renderiza os filhos recursivamente
    for (let i = 0; i < (vnode.children || []).length; i++) {
      const childNode = rerender(vnode.children[i]);
      node.appendChild(childNode);
    }

    return node;
  } else {
    // Cria um novo elemento
    node = document.createElement(vnode.nodeName);

    for (let name in Object((vnode.attributes || {}))) {
      if (typeof vnode.attributes[name] === 'function') {
        node[name] = eval(`(${vnode.attributes[name]})`);
      } else {
        node.setAttribute(name, vnode.attributes[name]);
      }
    }

    for (let i = 0; i < (vnode.children || []).length; i++) {
      const childNode = rerender(vnode.children[i]);
      node.appendChild(childNode);
    }

    return node;
  }
}

let previousVDOM = null;

export function rerenderVDOM(vdom) {
  diffAndUpdate(previousVDOM, vdom)

  console.log(previousVDOM, vdom)

  previousVDOM = vdom;
}

export function renderVDOM(vdom) {
  let dom = render(vdom)

  previousVDOM = vdom;

  document.getElementById('root').append(dom)
}

/**
 * 
 * @param {string | node} id 
 * @returns 
 */
export function getElementById(id) {
  if (!id) {
    return null;
  }
  return document.querySelector(`[id="${id}"]`);
}

// Função para realizar o diffing e gerar patches
function diffAndUpdate(oldVNode, newVNode) {
  // Verificar se os elementos são iguais
  if (JSON.stringify(oldVNode) === JSON.stringify(newVNode)) {
    return; // Nenhuma alteração necessária
  }

  if (!oldVNode){
    const node = render(newVNode)
    const parent = newVNode.parentNode;

    const parentElement = getElementById(parent.attributes.id)

    parentElement.appendChild(node)
  }

  if (newVNode.child && typeof oldVNode === 'string' && newVNode.child !== oldVNode) {
    const node = render(newVNode.child)
    const parent = newVNode.parentNode;
    
    const parentElement = getElementById(parent.attributes.id)
    
    const oldValue = parentElement.firstChild; // Obtém o nó de texto existente dentro do elemento <h1>

    // Substitui o nó de texto existente pelo novo nó de texto
    parentElement.replaceChild(node, oldValue);

    return
  }

  // Verificar se os tipos dos elementos são diferentes
  if (typeof oldVNode !== typeof newVNode || oldVNode.nodeName !== newVNode.nodeName) {
    // Substituir o elemento antigo pelo novo elemento na DOM
    const parent = oldVNode.parentNode;
    if (parent) {
      parent.replaceChild(render(newVNode), oldVNode);
    }
    return;
  }

  // Verificar atributos-chave dos elementos
  const oldAttributes = oldVNode.attributes || {};
  const newAttributes = newVNode.attributes || {};
  const attributeKeys = Object.keys({ ...oldAttributes, ...newAttributes });

  for (let key of attributeKeys) {
    const oldValue = oldAttributes[key];
    const newValue = newAttributes[key];

    // Verificar se o valor do atributo é diferente
    if (oldValue !== newValue) {
      // Atualizar o atributo no elemento da DOM
      const element = getElementById(oldVNode.attributes.id);
      if (element) {
        if (typeof newValue === "function") {
          const fnName = getFunctionNameInsideOfAnotherFunction(newValue)
          window[fnName] = newValue
          element[key] = eval(`(${newValue})`)
        } else {
          element.setAttribute(key, newValue);
        }
      }
    }
  }

  // Verificar os filhos dos elementos recursivamente
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    const children = typeof newChildren[i] === 'string' 
      ? { child: newChildren[i], parentNode: newVNode }
      : { ...newChildren[i], parentNode: newVNode }
    diffAndUpdate(oldChildren[i], { ...children, parentNode: newVNode });
  }
}

export function getFunctionNameInsideOfAnotherFunction(fn) {
  const fnString = fn.toString().replace(/\s/g, '');
  const functionName = fnString.match(/(\w+)\(/)[1];
  return functionName
}
