const formTodo = document.querySelector('form')
const displayTodos = document.querySelector('#displayTodo')

const setTodoDataStorage = todo => {
    localStorage.setItem('todo', todo)
}

const createTodoEl = () => {
    todo = localStorage.getItem('todo')

    const divTodo = document.createElement('div')
    divTodo.className = 'bg-white text-gray-600 text-2xl text-left shadow-lg w-full py-5 px-8 mb-0.5'
    divTodo.setAttribute('data-todo', todo)
    divTodo.innerText = todo
    displayTodos.appendChild(divTodo)

    displayTodos.addEventListener('click', lineThroughTodo)
    displayTodos.addEventListener('dblclick', deleteTodo)
}

const lineThroughTodo = (e) => {
    let todosArr = [...displayTodos.children]
    todosArr.filter(todoEl => {
        if(todoEl.dataset.todo === e.target.dataset.todo) {
            todoEl.classList.toggle('opacity-50')
            todoEl.classList.toggle('line-through')
        }
    })
}

const deleteTodo = (e) => {
    let todosArr = [...displayTodos.children]
    todosArr.filter(todoEl => {
        if(todoEl.dataset.todo === e.target.dataset.todo) {
            todoEl.remove()
        }
    })
}

const submitFormTodo = e => {
    e.preventDefault()
    let todoValue = formTodo[0].value
    setTodoDataStorage(todoValue)
    createTodoEl()
    formTodo.reset()
}

createTodoEl()

formTodo.addEventListener('submit', submitFormTodo)