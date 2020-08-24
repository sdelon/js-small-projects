const form = document.querySelector('form')
const todoItem = document.querySelector('#todo-item')
const todoCat = document.querySelector('#todo-category')
const todoList = document.querySelector('#todolist')

const setTodoData = (todo, category) => {
    localStorage.setItem('todo', todo)
    localStorage.setItem('todocat', category)
}


const lineThroughItem = randomID => {
    [...todoList.children].filter(item => {
        [...item.children].filter(item => {
            if(item.dataset.id === randomID.toString()) {
                item.firstElementChild.classList.toggle('done')
            }  
        })
    })
}

const deleteItem = randomID => {
    [...todoList.children].filter(item => {
        [...item.children].filter(item => {
            if(item.dataset.id === randomID.toString()) {
                item.remove()
            } 
        })
    })
}

const addTodoItem = e => {
    e.preventDefault()
    let newItem = todoItem.value
    let newItemCat = todoCat.value
    setTodoData(newItem, newItemCat)
    updateDOM()
}

const updateDOM = () => {
    let randomID = Math.floor(Math.random() * 1000)

    let updatedTodo = localStorage.getItem('todo')
    let updatedTodoCat = localStorage.getItem('todocat')

    todoList.childNodes.forEach(todo => {
        if(todo?.dataset?.todocat === updatedTodoCat.toLowerCase()) {
            todo.innerHTML += `
            <div data-id="${randomID}" class="todoitem" onclick="lineThroughItem(${randomID})" id="todo">
            <p><input class="todoitem-checkbox" type="checkbox">${updatedTodo}</p>
            <button class="todoitem-btn ${updatedTodoCat.toLowerCase()}" onclick="deleteItem(${randomID})">Effacer</button>
            </div>
        `
        }      
    })
}

form.addEventListener('submit', addTodoItem)