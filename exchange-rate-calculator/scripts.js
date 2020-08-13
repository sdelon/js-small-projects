const btn = document.querySelector('button')
const selectCurrencyOne = document.querySelector('#currency-one')
const selectCurrencyTwo = document.querySelector('#currency-two')
const amountCurrencyOne = document.querySelector('#amount-one')
const displayRate = document.querySelector('#amount-two')
const actualRate = document.querySelector('#rate')

async function calculateRate() {
    let currencyOne = selectCurrencyOne.value
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        let { rates } = await res.json()
        let arrOfRates = Object.entries(rates)

        for(let [curr, rate] of arrOfRates) {
            if(curr === selectCurrencyTwo.value) {
                let exchangeRate = rate * amountCurrencyOne.value
                displayRate.textContent = exchangeRate.toFixed(2).toString()
                actualRate.textContent = `1 ${currencyOne} = ${rate} ${curr}`
            }
        }
    } catch(err) {
        console.log(err)
    }
}

const swapCurrency = () => {
    const temp = selectCurrencyOne.value
    selectCurrencyOne.value = selectCurrencyTwo.value
    selectCurrencyTwo.value = temp
    calculateRate()
}

selectCurrencyOne.addEventListener('change', calculateRate)
selectCurrencyTwo.addEventListener('change', calculateRate)
amountCurrencyOne.addEventListener('change', calculateRate)
btn.addEventListener('click', swapCurrency)