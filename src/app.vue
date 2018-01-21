<template>
  <div class="math-app">
    <top-bar></top-bar>
    <router-view class="body-content"></router-view>
  </div>
</template>

<script>
import TopBar from './module/top-bar/index.vue';

export default {
  name: 'app',
  components: {
    TopBar,
  }
};
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  }
  .math-app {
    padding-top: 50px;
  }

  a {
    text-decoration: none;
  }

  .body-content {
    max-width: 600px;
    margin: auto;
    padding: 0;
    position: relative;
    text-align: center;
  }

  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }
</style>
