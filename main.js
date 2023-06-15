import { rerenderVDOM, renderVDOM } from './render.js';
import { createComponentNode, h } from './transpile.js';

window.list = [1, 2, 3, 4, 5]
window.count = 0

function updateList(newList) {
  window.list = newList;
  rerenderVDOM(createComponentNode(App, { list: newList, count: window.count }))
}

function updateCount(newCount) {
  window.count = newCount;
  rerenderVDOM(createComponentNode(App, { count: newCount, list: window.list }))
}

const App = (props) => {
  const { list, count = 0 } = props;

  return h('div', { class: 'app', id: "app" }, null, 
    h('div', { class: 'app', id: "1" },null,
      h('h1', { id: "h1_v1" },null, 'Simple vDOM'),
      h('h1', { id: "h1_count" },null, `Count ${count}`),
      h(
        'ul', { id: "ul" },null,
        ...list.map(item => h('li', { id: `li_${item}` },null, item))
      ),
      h('button', {
        id: "updateCount",
        onclick: () => updateCount(count + 1)
      },null, 'Atualize o count'),
      h('button', {
        id: "addList",
        onclick: () => updateList([...list, 'oi'])
      },null, 'Adicione na lista')
    )
  );
};

const currentApp = createComponentNode(App, { list, count })

renderVDOM(currentApp)
