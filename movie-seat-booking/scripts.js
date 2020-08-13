const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const textSeatsCount = document.querySelector('#count')
const textSeatsPrice = document.querySelector('#total')
const optionMovie = document.querySelector('#movie')

populateUI()

let moviePrice = parseInt(optionMovie.value)

const setMovieData = (index, price) => {
    localStorage.setItem('selectedMovieIndex', index)
    localStorage.setItem('selectedMoviePrice', price)
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))    

    const numberOfSeats = selectedSeats.length;
    textSeatsCount.innerText = numberOfSeats
    textSeatsPrice.innerText = numberOfSeats * moviePrice

    setMovieData(optionMovie.selectedIndex, optionMovie.value);
}

const updatePriceOfMovie = e => {
    moviePrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
}

const addSeat = e => {
    let clickedSeat = e.target
    if(clickedSeat.classList.contains('seat') && !clickedSeat.classList.contains('occupied')) {
        clickedSeat.classList.toggle('selected')
    }
    updateSelectedCount()
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')   

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,i) => {
            if(selectedSeats.indexOf(i) > -1) {
                seat.classList.add('selected')
            }
        }) 
    }

    if(selectedMovieIndex !== null) {
        optionMovie.selectedIndex = selectedMovieIndex
    }
}


optionMovie.addEventListener('change', updatePriceOfMovie)
seats.forEach(seat => seat.addEventListener('click', addSeat))

// Initiate the count and total set
updateSelectedCount()