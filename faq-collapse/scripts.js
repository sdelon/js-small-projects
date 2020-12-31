const arrowDown = document.querySelectorAll('.arrow')
const QContainer = document.querySelectorAll('[data-faq]')
const AContainer = [...document.querySelectorAll('[data-answer]')]

const expandFAQ = e => {
    let faqDiv = e.currentTarget.offsetParent
 
  
    AContainer.filter(answer => {
        if(answer.dataset.answer === faqDiv.dataset.faq) {
            answer.classList.toggle('hidden')
            faqDiv.classList.toggle('bg-white')
            if(!answer.classList.contains('hidden')) {
                faqDiv.firstElementChild.lastElementChild.src = "./x-circle.svg"
            } else {
                faqDiv.firstElementChild.lastElementChild.src = "./arrow-down-circle.svg"
            }
        }
    })
}

arrowDown.forEach(arrow => arrow.addEventListener('click', expandFAQ))
