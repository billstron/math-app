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
import { useChallenge } from '@/store';
import PButton from '../../components/PButton.vue';

export default {
  name: 'challenge-result',
  components: {
    PButton
  },
  setup() {
    const challenge = useChallenge();
    return { challenge };
  },
  data() {
    return {
      numberCorrect: null,
      numberWrong: null,
      duration: null,
    };
  },
  computed: {
    lastCompleted() {
      return this.challenge.lastCompleted;
    },
  },
  methods: {
    setup() {
      const { answers = [], duration } = this.lastCompleted;
      this.numberCorrect = answers.filter(({ correct }) => correct ).length;
      this.numberWrong = answers.filter(({ correct }) => correct == false ).length;
      this.duration = duration || undefined;
    },

    tryAgain () {
      const { type } = this.lastCompleted;
      if (type) {
        return this.$router.push(`/challenge/${type}`);
      }
      return this.$router.push(`/`);
    }
  },
  mounted() {
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
