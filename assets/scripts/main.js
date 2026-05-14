// main.js

window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	let recipes = JSON.parse(localStorage.getItem("recipes"));

	if (!recipes) {
		recipes = [
			{
				imgSrc: "./assets/images/1_spooky-ghost-cookies.jpeg",
				imgAlt: "Spooky Ghost Cookies",
				titleLnk: "https://www.delish.com/holiday-recipes/halloween/a28637917/ghost-cookies-recipe/",
				titleTxt: "Spooky Ghost Cookies",
				organization: "Delish.com",
				rating: 5,
				numRatings: 1,
				lengthTime: "2 hr",
				ingredients: "Light corn syrup, almond, black food coloring, powdered sugar,"
			},
			{
				imgSrc: "./assets/images/2_frightfully-easy-ghost-cookies.jpeg",
				imgAlt: "Ghost cookies in pumpkin bowl",
				titleLnk: "https://www.pillsbury.com/recipes/frightfully-easy-ghost-cookies/bed2af7e-59a0-4b68-be25-1dcaeca66254",
				titleTxt: "Frightfully Easy Ghost Cookies",
				organization: "Pillsbury",
				rating: 4,
				numRatings: 90,
				lengthTime: "30 min",
				ingredients: "Peanut butter filled, chocolate chips, candy coating"
			},
			{
				imgSrc: "./assets/images/3_ingredient-ghost-halloween-cookies.jpeg",
				imgAlt: "Ghost cookies in metal tin",
				titleLnk: "https://butterwithasideofbread.com/easy-ghost-halloween-cookies/",
				titleTxt: "3 Ingredient Easy Ghost Halloween Cookies",
				organization: "Butter with a Side of Bread",
				rating: 0,
				numRatings: 0,
				lengthTime: "10 min",
				ingredients: "White almond bark, mini chocolate chips"
			}
		];

		localStorage.setItem("recipes", JSON.stringify(recipes));
	}

	return recipes;
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