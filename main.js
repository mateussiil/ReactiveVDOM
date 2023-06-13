import { parse } from './parse.js';
import { render } from './render.js';
import { h } from './transpile.js';

let vdom = `
  <div id="boo" key="1">
    <ul><li id="foo">Oi</li></ul>
    Hello world
  </div>
`

let parsedObject = parse(vdom)

parsedObject
  .children
  .push(h('button', {
    id: "button", 
    onclick: (e) => { console.log('oi') }
  }, 'Clique'))

let dom = render(parsedObject)

document.getElementById('root').append(dom)

const App = (props) => {
  const { list } = props;

  return h('div', { class: 'app' },
    h('h1', null, 'Simple vDOM'),
    h(
      'ul', null,
      ...list.map(item => h('li', null, item))
    )
  );
};
