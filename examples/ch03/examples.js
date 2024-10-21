hFragment([
    h('h1', { class: 'title' }, ['My counter']),
    h('div', { class: 'container' }, [
        h('button', {}, ['decrement']),
        h('span', {}, ['0']),
        h('button', {}, ['increment']),
    ])
])

function lipsum(n) {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
      ut aliquip ex ea commodo consequat.`

    return hFragment(
        Array(n).fill(h('p', {}, [text]))
    )
}

/**
 * Würde folgendes ausgeben TodoList(['Walk the dog', 'Water the plants]) 
 * der Code für das Ergebnis dazu würde wie folgt aussehen
 * @example
 * {
 *  tag: 'ul',
 *  type: 'element',
 *  children: [
 *      { tag: 'li', type: 'element', children: [ 'Walk the dog' ] },
 *      { tag: 'li', type: 'element', children: [ 'Water the plants' ] }
 *  ]
 * }
 * <ul>
 *   <li>Walk the dog</li>
 *   <li>Water the plants</li>
 * </ul>
*/
// function TodosList( todos ) {
//     return h('ul', {}, todos.map( todo => h('li', {}, [ todo ])))
// }

function TodoItem( todo, idxInList, editingIdxs ) {
    const isEditing = editingIdxs.has( idxInList )

    return h('li', {}, [
        isEditing
        ? TodoInEditMode( todo, idxInList )
        : TodoInReadMode( todo, idxInList )
    ])
}

function TodosList( todos ) {
    return h('ul', {},
        state.todos.map(
            ( todo, i ) => TodoItem( todo, i, state.editingIdxs )
        )
    )
}

function MessageComponent({ level, message }) {
    return h('div', { class: `message message--${level}`}, [
        h('p', {}, [ message ])
    ])
}

function App( state ) {
    return hFragment([
        h('h1', {}, ['My TODOs']),
        CreateTodo( state ),
        TodosList( state )
    ])
}