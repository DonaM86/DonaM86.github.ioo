<!-- https://www.youtube.com/watch?v=yI3yKamH34g -->

<template>
  <!-- använder favorites- arrayen för att visa namn o bild för varje recept.
           Om det inte finns några favoritrecept visas meddelande.  "Ta bort från favoriter", man tar bort då recept ur localstorage -->
  <div class="container">
    <div v-if="favorites.length">
      <div v-for="favorite in favorites" class="result-item">
        <h3>{{ favorite.strMeal }}</h3>
        <img v-if="favorite.strMealThumb" :src="favorite.strMealThumb" alt="Matbild" id="imgmat">
        <p>{{ favorite.strInstructions }}</p>
        <button @click="removeFromFavorites(favorite)" class="remove-favorite-button">Ta bort från favoriter</button>
      </div>
    </div>
    <p v-else>Du har inga sparade favoriter.</p>
  </div>
</template>

<script>
export default {
  data() {
    //  "data()" definierar "favorites"-arrayen från localStorage och returnerar en tom array om det inte finns några sparade favoriter. "removeFromFavorites()" tar emot ett recept och använder "JSON.parse()" för att
    //  hämta favorit-array från localStorage. Om arrayen inte finns avslutas funktionen.
    return {
      favorites: JSON.parse(localStorage.getItem('favorites')) || []
    };
  },
  methods: {
    // removeFromFavorites()", hämtar "favorites"-arrayen från localStorage med "JSON.parse()".
    // Om det inte finns någon array, avslutas funktionen med "return"
    removeFromFavorites(recipe) {
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      if (!favorites) {
        return;
      }
      // Annars används "findIndex()" för att söka efter receptet i "favorites"-array.
      // Sedan används "splice()" för att ta bort detta favoritrecept från arrayen.
      let index = favorites.findIndex(favorite => favorite.idMeal === recipe.idMeal);
      favorites.splice(index, 1);
      this.favorites = favorites;
      localStorage.setItem('favorites', JSON.stringify(favorites));
      // "favorites"-array för  "localStorage" uppdateras med "JSON.stringify()",
      // och receptet tas bort.
    }
  }
};
</script>

<style lang="scss">
$search-bar-font-size: 16px;
$search-bar-color: #320404;
$search-bar-padding: 8px;
$search-bar-border: 2px solid #ccc;

$category-font-size: 16px;
$category-color: #320404;
$category-padding: 8px;
$category-border: 2px solid #ccc;

$result-item-border: 1px solid #ccc;
$result-item-border-radius: 5px;
$result-item-margin-bottom: 20px;
$result-item-padding: 20px;


#search-bar {
  font-size: $search-bar-font-size;
  color: $search-bar-color;
  padding: $search-bar-padding;
  border: $search-bar-border;
}


#category {
  font-size: $category-font-size;
  color: $category-color;
  padding: $category-padding;
  border: $category-border;
}


.result-item {
  border: $result-item-border;
  border-radius: $result-item-border-radius;
  margin-bottom: $result-item-margin-bottom;
  padding: $result-item-padding;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }



  p {

    font-size: 20px;
    margin-bottom: 10px;
    color: #320404;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
}


.remove-favorite-button {
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #756464;
  }
}

p {
  font-size: 25px;
  color: #320404;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
