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

  return h('div', { class: 'app', id: "app" },  
    h('div', { class: 'app', id: "1" },
      h('h1', { id: "h1_v1" }, 'Simple vDOM'),
      h('h1', { id: "h1_count" }, `Count ${count}`),
      h(
        'ul', { id: "ul" },
        ...list.map(item => h('li', { id: `li_${item}` }, item))
      ),
      h('button', {
        id: "updateCount",
        onclick: () => updateCount(count + 1)
      }, 'Atualize o count'),
      h('button', {
        id: "addList",
        onclick: () => updateList([...list, 'oi'])
      }, 'Adicione na lista')
    )
  );
};

const currentApp = createComponentNode(App, { list, count })

renderVDOM(currentApp)
