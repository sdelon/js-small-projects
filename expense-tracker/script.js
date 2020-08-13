const balance = document.querySelector('#balance')
const income = document.querySelector('#money-plus')
const expense = document.querySelector('#money-minus')
const historyContainer = document.querySelector('#list')
const form = document.querySelector('form')
let text = document.querySelector('#text')
let amount = document.querySelector('#amount')
let allTransactions = []

// Click button : add a <li> to historyContainer with input value text & amount
// update income or expense if + or - in the amount input value
// update balance
const generateId = () => Math.floor(Math.random() * 10000)

const transaction = e => {
  let transaction = {
    id: generateId(),
    text: text.value,
    amout: amount.value
  }
  allTransactions.push(transaction)
}

const newItemInList = () => {
  const li = document.createElement('li')
  li.innerHTML = `<li id="${transaction.id}">${transaction.text} ${transaction.amount}</li>`
  historyContainer.appendChild(li)
}

const updateBalance = e => {
  e.preventDefault()
  transaction()
  newItemInList()
  console.log('clicked')

}

console.log(allTransactions)
form.addEventListener('submit', updateBalance)
