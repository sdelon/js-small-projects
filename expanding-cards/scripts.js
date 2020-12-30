const container = document.querySelector('#cards')

const expandCardClicked = e => {
    let cards = [...e.currentTarget.children]
    console.log(e.target !== cards)

    cards.filter(card => {
        let img = card.children[0]
        let text = card.children[1]
        if(card.id === e.target.offsetParent.id) {
            img.classList.remove('w-32')
            img.classList.add('w-full')
            text.classList.remove('hidden')
        } else if(img.classList.contains('w-full')) {
            img.classList.remove('w-full')
            img.classList.add('w-32')
            text.classList.add('hidden')
        }
    })
}

container.addEventListener('click', expandCardClicked)