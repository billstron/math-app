<template>
  <div class="top-bar">
    <div class="left-content">
      <router-link v-if="showBack" to="/"><fa-icon icon="fa-chevron-left"></fa-icon></router-link>
      Math App
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  computed: {
    showBack() {
      return this.$route.path !== '/';
    },
  },
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
