import { parse } from "./parse"

let template = `
  <div id="boo" key="1">
    <ul><li id="foo">Oi</li></ul>
    Hello world
  </div>
`

let parsedObject = parse(template)

parsedObject
  .children
  .push(h('button', {
    id: "button",
    onclick: (e) => { console.log('oi') }
  }, 'Clique'))