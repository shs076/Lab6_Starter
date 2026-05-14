// main.js

window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem("recipes")) || [];
}

function addRecipesToDocument(recipes) {
	const main = document.querySelector("main");

	recipes.forEach((recipe) => {
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipe;
		main.append(recipeCard);
	});
}

function saveRecipesToStorage(recipes) {
	localStorage.setItem("recipes", JSON.stringify(recipes));
}

function initFormHandler() {
	const form = document.querySelector("form");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const recipeObject = {};

		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		recipeObject.rating = Number(recipeObject.rating);
		recipeObject.numRatings = Number(recipeObject.numRatings);

		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipeObject;

		const main = document.querySelector("main");
		main.append(recipeCard);

		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		form.reset();
	});

	const clearButton = document.querySelector("button.danger");

	clearButton.addEventListener("click", () => {
		localStorage.clear();

		const main = document.querySelector("main");
		main.innerHTML = "";
	});
}