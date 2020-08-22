const submit = document.querySelector('#submit')
const search = document.querySelector('#search')
const results = document.querySelector('#result-heading')
const mealsContainer = document.querySelector('#meals')
const singleMeal = document.querySelector('#single-meal')
const randomBtn = document.querySelector('#random')


function searchMeal(e) {
    e.preventDefault()

    // Clear single meal
    singleMeal.innerHTML = ""

    // Get search term
    const term = search.value;
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                results.innerHTML = `<h2>Search results for ${term}</h2>`
                if(data.meals === null) {
                    results.innerHTML = `<h5>There are no search results. Try again !</h5>`
                } else {
                    mealsContainer.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-info" data-mealid="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('')
                }
            })
            // Clea search Text
            search.value = ''
    } else {
        alert('please type in a search term')
    }
}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]
        addMealToDOM(meal)
    })
}

// Fetch random Meal
function getRandomMeal() {
    results.innerHTML = '';
    mealsContainer.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]
        addMealToDOM(meal)
    })
}

// Add Meal to DOM
function addMealToDOM(meal) {
    const ingredients = []

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    } 
    console.log(ingredients)
    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}

submit.addEventListener('submit', searchMeal)
mealsContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) return item.classList.contains('meal-info')
        else return false 
    })
    if(mealInfo) {
        const mealID = mealInfo.dataset.mealid
        getMealById(mealID)
    }
})
randomBtn.addEventListener('click', getRandomMeal)