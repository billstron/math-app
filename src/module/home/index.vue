<template>
  <div>
    <div class="home">
      <h1>20-Q Challenge</h1>
      <div class="challenge-selector">
        <router-link class="button" to="/challenge/addition">
          <icon name="plus"/>
        </router-link>
        <div class="label">Addition</div>
      </div>
      <div class="challenge-selector">
        <router-link class="button" to="/challenge/subtraction">
          <icon name="minus"/>
        </router-link>
        <div class="label">Subtraction</div>
      </div>
      <div class="challenge-selector">
        <router-link class="button" to="/challenge/multiplication">
          <icon name="times"/>
        </router-link>
        <div class="label">Multiplication</div>
      </div>
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
h1 {
  margin: 5px 0;
}
.challenge-selector {
  display: inline-block;
  text-align: center;
}

.button {
  background-color: #dddddd;
  display: block;
  width: 120px;
  height: 120px;
  text-align: center;
  border-radius: 75px;
  float:left;
  margin: 10px;
}

.button .fa-icon {
  color: white;
  font-size: 30px;
  padding: 10px;
  width: 100px;
  height: 100px;
}

.challenge-selector .label {
  font-size: 20px;
}
</style>
