const formTodo = document.querySelector('form')
const displayTodos = document.querySelector('#displayTodo')

const createTodoEl = (value) => {
    const divTodo = document.createElement('div')
    divTodo.className = 'bg-white text-gray-600 text-2xl text-left shadow-lg w-full py-5 px-8 mb-0.5'
    divTodo.setAttribute('data-todo', value)
    divTodo.innerText = value
    displayTodos.appendChild(divTodo)
}

// const underlineOrDeleteTodo = (e, arr) => {
//     const leftClick = e.which === 1
//     const rightClick = e.which === 2

//     if(leftClick) {
//         e.target.classList.add('line-through')
//         e.target.classList.add('opacity-50')
//     } else if(rightClick) {
//         arr.filter(todo => todo.innerText !== e.target.dataset.todo) 
//     }
// }

const todosArr = []

const submitFormTodo = e => {
    e.preventDefault()
    let value = formTodo[0].value

    todosArr.push(value)
    createTodoEl(value)

    console.log(todosArr)
    const todos = document.querySelectorAll('[data-todo]')
    todos.forEach(todo => todo.addEventListener('click', (e) => {
        const leftClick = e.which === 1
        if(leftClick) {
            e.target.classList.add('line-through')
            e.target.classList.add('opacity-50')
        }
    }))

    todos.forEach(todo => todo.addEventListener('dblclick', (e) => {
        const leftClick = e.which === 1
        if(leftClick) {
            todos.filter(todo => e.target.innerText !== todo.dataset.todo)
        }
    }))
}

formTodo.addEventListener('submit', submitFormTodo)