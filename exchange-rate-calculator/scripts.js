const btn = document.querySelector('button')
const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const amountCurrencyOne = document.querySelector('#amount-one')
const displayRate = document.querySelector('#amount-two')
const actualRate = document.querySelector('#rate')

async function calculateRate() {
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.value}`)
        let { rates } = await res.json()
        let arrOfRates = Object.entries(rates)

        for(let [curr, rate] of arrOfRates) {
            if(curr === currencyTwo.value) {
                let exchangeRate = rate * amountCurrencyOne.value
                displayRate.textContent = exchangeRate.toFixed(2).toString()
                actualRate.textContent = `1 ${currencyOne.value} = ${rate} ${curr}`
            }
        }
    } catch(err) {
        console.log(err)
    }
}

const swapCurrency = () => {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    calculateRate()
}

currencyOne.addEventListener('change', calculateRate)
currencyTwo.addEventListener('change', calculateRate)
amountCurrencyOne.addEventListener('input', calculateRate)
btn.addEventListener('click', swapCurrency)