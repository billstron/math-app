<template>
  <div>
    <div>
      <icon name="check"/> {{ numberCorrect }}
    </div>
    <div>
      <icon name="times"/> {{ numberWrong }}
    </div>
    <div v-if="duration">
      <icon name="clock-o"/>
        {{ Math.floor(duration / 60) }} min
        {{ duration - Math.floor(duration / 60) * 60 }} s
    </div>
    <router-link to="/multiplication/challenge">Try Again</router-link>
  </div>
</template>

<script>
import Icon from 'vue-awesome';

const methods = {
  setup() {
    const data = JSON.parse(this.$cookie.get('multiplication/challenge'));
    this.numberCorrect = data.answers.filter(({ correct }) => correct ).length;
    this.numberWrong = data.answers.filter(({ correct }) => correct == false ).length;
    this.duration = data.duration || undefined;
  }
};

const model = {
  numberCorrect: null,
  numberWrong: null,
  duration: null,
};

export default {
  name: 'multiplication-challenge-result',
  components: {
    Icon,
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
