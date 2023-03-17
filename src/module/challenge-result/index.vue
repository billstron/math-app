<template>
  <div class="result">
    <h1>Latest Challenge</h1>
    <div class="metric-row">
      <fa-icon class="right" icon="fa-check"/> {{ numberCorrect }}
    </div>
    <div class="metric-row">
      <fa-icon class="wrong" icon="fa-times"/> {{ numberWrong }}
    </div>
    <div class="metric-row">
      <fa-icon icon="fa-clock"/>
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
    const mathType = this.$router.currentRoute.params.mathType;
    this.$router.push(`/challenge/${mathType}`);
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
