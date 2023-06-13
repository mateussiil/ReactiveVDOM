import { parse } from './parse.js';
import { render } from './render.js';

let vdom = `
  <div id="foo" key="1">
    <ul><li>Oi</li></ul>
    Hello world
  </div>
`

let parsedObject = parse(vdom)

let dom = render(parsedObject)

document.getElementById('root').append(dom)