const form = document.querySelector('form')
const search = document.querySelector('#search')
const results = document.querySelector('#result-heading')
const mealsContainer = document.querySelector('#meals')
const singleMeal = document.querySelector('#single-meal')
const randomBtn = document.querySelector('#random')


async function searchForMeals(e) {
    e.preventDefault()
    let keyword = search.value;
    
    try {
        const res =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        const { meals } = await res.json()
        results.innerHTML = `<h2>Search results for ${keyword}</h2>`
        updateMealsContainer(meals)
    } catch(err) {
        console.log(err)
    }
}

async function getMealRecipe(mealID) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        const { meals: mealRecipe } = await res.json()
        updateMealRecipe(mealRecipe)
    } catch(err) {
        console.log(mealRecipe)
    }
}

async function getRandomRecipe() {
    results.innerHTML = '';
    mealsContainer.innerHTML = '';
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        const { meals: mealRecipe } = await res.json()
        updateMealRecipe(mealRecipe)
    } catch(err) {
        console.log(mealRecipe)
    }
}

function updateMealRecipe(meal) {
    // Clear main div
    singleMeal.innerHTML = ''

    meal.forEach(recipe => {
        console.log(recipe)
        const mealRecipe = document.createElement('article')
        mealRecipe.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img width="100px" loading="lazy" src="${recipe.strMealThumb}">
            <div>
                <p>Category : ${recipe.strCategory} | Country : ${recipe.strArea}</p>
            </div>
            <p>${recipe.strInstructions}</p>
            <div>
                <h3>Ingredients</h3>
                <small>${recipe.strIngredient1}</tag>
            </div>
            <p>Recipe from <a href="${recipe.strSource}">${pathname(recipe.strSource)}</a></p>
        `
        singleMeal.appendChild(mealRecipe)
    })    
}

const pathname = url => {
    const newUrl = new URL(url)
    return newUrl.hostname
}


function updateMealsContainer(meals) {
    // Clear main div
    mealsContainer.innerHTML = '';
  
    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.innerHTML = `<div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
      </div>`;
      mealsContainer.appendChild(mealDiv);
      mealDiv.onclick = function() { 
          getMealRecipe(meal.idMeal) 
      };
    })
}

form.addEventListener('submit', searchForMeals)
randomBtn.addEventListener('click', getRandomRecipe)