<template>
  <div class="top-bar">
    <div class="left-content">
      <router-link to="/">Math App</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
}
</script>

<style scoped>
  .top-bar {
    position: fixed;
    background-color: #dddddd;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-shadow: 0px 0px 1px 1px #bbbbbb;
    font-size: 24px;
  }

  .left-content {
    float: left;
    display: inline;
    padding: 10px;
  }

  .left-content a {
    color: #5a5a5a;
  }
</style>
