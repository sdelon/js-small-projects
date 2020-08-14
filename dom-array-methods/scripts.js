const btnGroup = document.querySelector('.btn-group')
const user = document.querySelector('#user')
const addUserBtn = document.getElementById('foreach');
const doubleBtn = document.getElementById('map');
const showMillionairesBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('reduce');

let userArr = []

async function getRandomUser() {
    try {
        const res = await fetch('https://randomuser.me/api')
        const data = await res.json()
        const user = data.results[0]
        const newUser = {
          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000)
        }
        addData(newUser)
    } catch(err) {
        console.log(err)
    }  
}

const addData = obj => {
    userArr.push(obj)  
    updateDOM()
}

const formatMoney = value => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`


const doubleMoney = () => {
    userArr = userArr.map(user => {
        return {...user, money: user.money * 2}
    })
    updateDOM()
}


const filterMoney = () => {
    userArr = userArr.filter(user => user.money > 1000000)
    updateDOM()
}

const sortMoney = () => {
    userArr.sort((a,b) => b.money - a.money)
    updateDOM()
}

function updateDOM(providedData = userArr) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  
    providedData.forEach(item => {
      const userEl = document.createElement('div');
      userEl.classList.add('person');
      userEl.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
      main.appendChild(userEl);
    })
}

const sumMoney = () => {
    let sum = userArr.reduce((acc, user) => (acc + user.money),0)
    const total = document.createElement('div')
    total.innerHTML = `
        <h2><strong>Total Wealth</strong>${formatMoney(sum)}</h2>
    `
    main.appendChild(total)
} 

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', filterMoney)
sortBtn.addEventListener('click', sortMoney)
calculateWealthBtn.addEventListener('click', sumMoney)