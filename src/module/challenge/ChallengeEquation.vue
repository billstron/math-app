<template>
  <div class="equation">
    <div class="inner">
      <number-display
        :value="equation[0]"
      />
      <fa-icon
        class="math-sign"
        :icon="signIcon"
      />
      <number-display
        :value="equation[1]"
      />
      <fa-icon
        class="math-sign"
        icon="fa-equals"
      />
      <number-input
        tag="input-tag"
        v-model="answer"
        v-on:enter="checkIt"
      />
    </div>
    <p-button
      :disabled="isNaN(Number(answer))"
      :click="checkIt"
      label="Check It"
    />
  </div>
</template>

<script>
import PButton from '../../components/PButton.vue';
import NumberDisplay from '../../components/NumberDisplay.vue';
import NumberInput from '../../components/NumberInput.vue';

export default {
  name: 'ChallengeEquation',
  props: [ 'equation', 'tag', 'mathType' ],
  components: {
    PButton,
    NumberDisplay,
    NumberInput
  },
  data() {
    return {
      signMap: {
        multiplication : {
          icon: 'fa-times',
          fn: (a, b) => a * b,
        },
        addition: {
          icon: 'fa-plus',
          fn: (a, b) => a + b,
        },
        subtraction: {
          icon: 'fa-minus',
          fn: (a, b) => a - b,
        }
      },
      answer: undefined,
    };
  },
  computed: {
    signIcon() {
      return this.signMap[this.mathType].icon;
    },
  },
  watch: {
    equation() {
      this.answer = undefined;
    },
  },
  methods: {
    checkIt() {
      document.getElementById('input-tag').focus();
      const { answer } = this;
      if (answer == null) {
        return null;
      }
      const correctAnswer = this.compute(this.equation[0], this.equation[1]);
      this.$emit('answered', { correct: correctAnswer == answer, answer });
      this.answer = undefined;
    },

    compute(a, b) {
      return this.signMap[this.mathType].fn(a, b);
    },
  },
}
</script>

<style scoped>
.equation {
  display: inline-block;
  width: 100%;
  margin: auto;
  text-align: center;
}

.inner {
  display: inline-block;
  margin: 5% auto;
}

.math-sign {
  float: left;
  font-size: 20px;
  font-weight: bold;
  line-height: 44px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 12px;
}

</style>
