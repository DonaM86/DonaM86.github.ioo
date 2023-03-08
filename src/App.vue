<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Hem</router-link></li>
        <li><router-link to="/favorites">Favoriter</router-link></li>
      </ul>
    </nav>
    <div id="banner-image-container">
      <img src="../public/mks.jpg" alt="Min bild" id="banner-image">
    </div>
    <router-view :title="title"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "Sök dina recept här"
    };
  }
};
</script>

<style>
body {
  background-color: #e0aed4
}

#banner-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800vh;
  height: 70vh;
  margin: 0 auto;

}

#banner-image {
  width: 100%;
  height: 100%;

}

nav {
  background-color: #f2a3de;
  color: #050523;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 60px;
}

nav ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 15px;
}

nav li {
  margin: 0 10px;
}

nav a {
  text-decoration: none;
  color: #4b042c;
  font-weight: bold;
  font-size: 2rem;
  font-style: initial;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

@media only screen and (max-width: 600px) {
  nav {
    height: auto;


  }

  nav a {
    font-size: 3rem;
  }

  #banner-image-container {
    height: auto;


  }
}
</style>
