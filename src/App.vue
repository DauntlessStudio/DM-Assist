<template>
  <div class="root">
    <div class="nav">nav</div>
    <div class="main">main</div>
    <div class="notes">notes</div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  width: 100vw;
}
.root {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    'nav main main main main'
    'nav main main main main'
    'nav notes notes notes notes';
}
.nav {
  background-color: blue;
  grid-area: nav;
}
.main {
  background-color: orange;
  grid-area: main;
}
.notes {
  background-color: lavender;
  grid-area: notes;
}
</style>
