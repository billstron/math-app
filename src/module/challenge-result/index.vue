<template>
  <div class="result">
    <h1>Latest Challenge</h1>
    <div class="metric-row">
      <icon class="right" name="check"/> {{ numberCorrect }}
    </div>
    <div class="metric-row">
      <icon class="wrong" name="times"/> {{ numberWrong }}
    </div>
    <div class="metric-row">
      <icon name="clock-o"/>
        {{ Math.floor(duration / 60) }} min
        {{ duration - Math.floor(duration / 60) * 60 }} s
    </div>
    <p-button
      :click="tryAgain"
      label="Try Again"
    />
  </div>
</template>

<script>
import Icon from 'vue-awesome';
import PButton from '../../components/PButton.vue';

const methods = {
  setup() {
    const mathType = this.$router.currentRoute.params.mathType;
    const data = JSON.parse(this.$cookie.get(`challenge/${mathType}`));
    this.numberCorrect = data.answers.filter(({ correct }) => correct ).length;
    this.numberWrong = data.answers.filter(({ correct }) => correct == false ).length;
    this.duration = data.duration || undefined;
  },

  tryAgain () {
    this.$router.push(`/challenge/${this.mathType}`);
  }
};

const model = {
  numberCorrect: null,
  numberWrong: null,
  duration: null,
};

export default {
  name: 'challenge-result',
  components: {
    Icon,
    PButton
  },
  methods,
  data() {
    return model;
  },
  mounted() {
    console.log('mounted');
    this.setup();
  }
};
</script>

<style scoped>
h1 {
  margin: 5px 0;
}
.result {

}

.metric-row {
  font-size: 24px;
  margin: 20px 0;
  padding-left: 50px;
  text-align: left;
}

.fa-icon {
  width: 50px;
}

.right {
  color: green;
}


.wrong {
  color: red;
}
</style>
