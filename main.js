import { parse } from './parse.js';
import { render } from './render.js';

let vdom = `
  <div id="foo" key="1">
    Hello world
  </div>
`

let objectParsed = parse(vdom)

console.log({ objectParsed })

let dom = render(objectParsed)

document.getElementById('root').append(dom)