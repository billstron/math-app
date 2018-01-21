<template>
  <div>
    <div class="challenge-selector">
      <router-link class="button" to="/multiplication/challenge">
        <icon name="times"/>
      </router-link>
      <div class="label">Multiplication</div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome';

export default {
  components: {
    Icon,
  },
  name: 'home',
}
</script>

<style scoped>
.challenge-selector {
  display: inline-block;
  text-align: center;
}

.button {
  background-color: #dddddd;
  display: block;
  width: 150px;
  height: 150px;
  text-align: center;
  border-radius: 75px;
  float:left;
}

.button .fa-icon {
  color: white;
  font-size: 50px;
  padding: 20px;
  width: 100px;
  height: 100px;
}

.challenge-selector .label {
  font-size: 20px;
}
</style>
