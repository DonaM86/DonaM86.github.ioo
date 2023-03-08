
<template>
  <div>
    <h2>{{ title }}</h2>
    <!-- https://www.youtube.com/watch?v=yI3yKamH34g -->
    <!-- sökbar med kategorier, -->
    <input type="text" v-model="query" placeholder="Sök efter ingredienser..." id="search-bar" />
    <select v-model="category" id="category">
      <option value="">Alla Kategorier</option>
      <option value="Beef">Nötkött</option>
      <option value="Chicken">Kyckling</option>
      <option value="Dessert">Dessert</option>
      <option value="Lamb">Lamm</option>
      <option value="Miscellaneous">Blandat</option>
      <option value="Pasta">Pasta</option>
      <option value="Pork">Fläsk</option>
      <option value="Seafood">Havsprodukter</option>
      <option value="Side">Sidorätt</option>
      <option value="Starter">Förrätt</option>
      <option value="Vegetarian">Vegetarisk</option>
    </select>
  <!-- Sök"-knappen, triggas funktionen "search" i Vue-instansen, vilket hämtar receptdata från databasen och
                                                visar resultaten i en div som endast visas om det finns resultat. -->
    <button @click="search">Sök</button>
    <div v-if="results && results.length">
      <div v-for="result in results" class="result-item">
        <h3>{{ result.strMeal }}</h3>
        <img v-if="result.strMealThumb" :src="result.strMealThumb" alt="Foto på mat">
        <p>{{ result.strInstructions }}</p>

      <!-- Spara som favorit"-knappen, triggas "saveToFavorites"-metoden som tar emot matreceptet som en parameter och
                                                      lägger till det i en array med favoritrecept -->
        <button @click="saveToFavorites(result)" class="favorite-button">Spara som favorit</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      query: "",
      category: "",
      results: [],
      title: "Sök dina recept här"
    };
  },


  methods: {
    async search() {
      console.log("Searching for recipes...");
      try {
        let endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.query}`;
        if (this.category) {
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.category}`;
        }
        const response = await fetch(endpoint);
        const data = await response.json();
        if (!data.meals) {
          console.log("Inga sökresultat hittades.");
          this.results = [];
        } else {
          console.log(data.meals);
          this.results = data.meals;
        }
      } catch (error) {
        console.error(error);

      }
    },
    // metoden används för att spara ett matrecept som favorit genom att lagra det i webbläsarens cacheminne (localStorage).
    saveToFavorites(recipe) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));

    },
  },
};
</script>
<style lang="scss">
$font-size: 16px;
$color: #333;
$padding: 8px;
$border: 2px solid #ccc;

#search-bar {
  font-size: $font-size;
  color: $color;
  padding: $padding;
  border: $border;

}

#category {
  font-size: $font-size;
  color: $color;
  padding: $padding;
  border: $border;
}


.search-form button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-form button:hover {
  background-color: #0062cc;
}

.results-container {
  margin-top: 20px;
}

.result-item {
  border: 25px solid #ccc;
  border-radius: 5px;
  padding: px;
  margin-bottom: 20px;

}

.result-item h3 {
  margin-top: 3%;
  margin-bottom: 10px;
}


.result-item img {
  max-width: 100%;
  margin-top: 3rem;
}

.result-item p {
  margin: 3rem 0;
}

.favorite-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 1rem;
  cursor: pointer;
}

.favorite-button:hover {
  background-color: #3e8e41;
}
</style>
