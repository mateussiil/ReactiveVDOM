# Virtual DOM e Reatividade

Este projeto utiliza os conceitos de Virtual DOM e reatividade para criar uma abordagem eficiente e flexível para renderização de elementos na interface do usuário.

## Virtual DOM
O Virtual DOM é uma técnica usada para criar uma representação virtual da estrutura da interface do usuário em memória. Em vez de interagir diretamente com o DOM real, manipulamos essa representação virtual e, em seguida, sincronizamos as mudanças com o DOM real.

A principal vantagem do Virtual DOM é que podemos realizar operações de comparação eficientes para determinar quais partes da interface do usuário precisam ser atualizadas. Em vez de manipular diretamente os elementos no DOM, podemos fazer uma comparação de árvore virtual para encontrar as diferenças entre a representação atual e a nova representação. Isso permite que atualizemos apenas as partes necessárias, evitando renderizações completas e melhorando o desempenho.

## Função h

A função h é uma função de criação de elementos do Virtual DOM. Ela permite criar objetos que representam elementos da interface do usuário de forma concisa e legível. A função h recebe como argumentos o nome do elemento (como uma string), os atributos desse elemento (como um objeto) e os filhos desse elemento (como argumentos adicionais). Ela retorna um objeto que representa o elemento no Virtual DOM.

Por exemplo:

```javascript
const element = h('div', { class: 'container' }, 
  h('h1', null, 'Título'),
  h('p', null, 'Texto de exemplo')
);
```

Nesse exemplo, estamos criando um elemento <div> com a classe "container" e dois filhos: um elemento <h1> e um elemento <p>. A função h torna a criação de elementos do Virtual DOM mais legível e expressiva.


## render

A função render é reponsável por fazer a primeira inicialização da dom.

## diffAndUpdate

Nesta função está implementado os conceitos de diffing e reconciliation. O diffing é responsável por verificar quais foram as alterações realizadas na virtual dom enquanto o reconciliation busca realizar somente as alterações necessárias na dom


## Parse

Em parse.js eu criei uma simples para fazer um parse de um template e transforma em na virtual, que atualmente é semelhante ao html mas eu tenho a inteção de fazer uma marcação própria semelhante ao React Native

Exemplo 

```javascript
let template = `
  <div id="boo">
    <ul><li id="foo">Oi</li></ul>
    Hello world
  </div>
`

let parsedObject = parse(template)

## parseObject = {nodeName: "div", attributes: {id:"foo"}, children: [
  {nodeName: "ul", attributes: {}, children: [
    {nodeName: "li", attributes: {id="foo"}, children: [
      "Oi"
    ]}
  ]},
  {nodeName: "text", attributes: {}, children: ["Hello World"]}
]}
```

## Reatividade

A reatividade é um conceito fundamental para criar interfaces do usuário dinâmicas e responsivas. Com a reatividade, podemos estabelecer uma relação entre as dependências dos dados e os elementos que os utilizam. Sempre que os dados são atualizados, os elementos dependentes são automaticamente atualizados para refletir essas mudanças.

A reatividade permite criar uma ligação automática entre os dados e a interface do usuário, eliminando a necessidade de atualizações manuais. Isso torna o desenvolvimento mais produtivo e ajuda a manter a consistência da interface.

## Contribuição
Sinta-se à vontade para contribuir com este projeto, seja através de sugestões, correções de bugs ou implementação de novos recursos. Toda contribuição é bem-vinda!

## Licença
Este projeto é licenciado sob a Licença MIT. Leia o arquivo LICENSE para obter mais informações sobre os direitos e restrições deste projeto.

Espero que este README básico seja útil para você começar a entender os conceitos de Virtual DOM, a função h e a reatividade. Você pode personalizar e adicionar mais informações relevantes ao seu README, conforme necessário, para explicar melhor o seu projeto.