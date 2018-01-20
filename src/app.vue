<template>
  <div>
    <top-bar></top-bar>
    <router-view></router-view>
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
