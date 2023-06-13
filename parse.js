import { h } from './transpile.js'
import { stringToObject } from './utils.js'

/**
 * 
 * @param {string} jsxString 
 * @returns {{ nodeName: string, attributes: {[key:string]: any} & {id: string | number}, children: Array<string | { nodeName: string, attributes: any, children: any[] }> }} children 
 */
export function parse(jsxString){
  if (!jsxString) return h(jsxString)

  const jsxRegex = /<([A-Za-z][A-Za-z0-9]*)\s*([^>]*)>((?:[^<]*|<(?!\/?\1>))*)<\/\1>/;
  const textRegex = /^[^<>]+$/;

  const matches = jsxRegex.exec(jsxString)

  if (matches) {
    const tag = matches[1] // Captura o nome da tag
    let attributes = matches[2] // Captura os atributos

    attributes = attributesToObject(attributes)

    const content = matches[3].trim()
      .split('\n')
      .map(child => child.trim())
      .filter(child => child !== '') || ''

    let children = []

    for (let i = 0; i < (content || []).length; i++) {
      children.push(parse(content[i]))
    }

    return h(tag, attributes, ...children)
  }else{
    const match = jsxString.match(textRegex);
    return match ? match[0].trim() : "";
  }
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function attributesToObject(str) {
  const obj = stringToObject(str)
  
  return obj
}