import { h } from './transpile.js'
import { stringToObject } from './utils.js';

/**
 * 
 * @param {string} jsx 
 */
export function parse(jsx){
  const jsxRegex = /<([A-Za-z][A-Za-z0-9]*)\s*([^>]*)\/?>/g;

  const jsxString = jsx || '<div id="myDiv">Hello, World!</div>';

  const matches = jsxRegex.exec(jsxString);

  if (matches) {
    const tag = matches[1]; // Captura o nome da tag
    let attributes = matches[2]; // Captura os atributos

    if (attributes) attributes = attributesToObject(attributes)

    console.log('Tag:', tag);
    console.log('Atributos:', attributes);

    // Para capturar o conteúdo (children), você pode fazer uma busca subsequente
    const contentRegex = />([^<]*)</g;
    const contentMatches = contentRegex.exec(jsxString);

    let children;

    if (contentMatches) {
      children = contentMatches[1].trim(); // Captura o conteúdo e remove espaços em branco extras
      console.log('children:', children);
    }

    return h(tag, attributes, children)
  }
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function attributesToObject(str) {
  return stringToObject(str)
}