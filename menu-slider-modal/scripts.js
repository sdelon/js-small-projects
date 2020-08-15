const btnHamburger = document.querySelector('#toggle')
const btnCloseModal = document.querySelector('#close')
const btnOpenModal = document.querySelector('#open')
const modal = document.querySelector('#modal')


btnHamburger.addEventListener('click', () => document.body.classList.toggle('show-nav'))
btnOpenModal.addEventListener('click', () => modal.classList.add('show-modal'))
btnCloseModal.addEventListener('click', () => modal.classList.remove('show-modal'))

// Hide modal on outside click
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false )