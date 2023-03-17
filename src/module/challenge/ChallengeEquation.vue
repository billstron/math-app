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
        v-bind:value="value"
        v-on:input="onInput"
        v-on:enter="checkIt"
      />
    </div>
    <p-button
      :disabled="typeof value !== 'number'"
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
  props: [ 'equation', 'value', 'tag', 'mathType' ],
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
    };
  },
  computed: {
    signIcon() {
      return this.signMap[this.mathType].icon;
    },
  },
  methods: {
    checkIt() {
      document.getElementById('input-tag').focus();
      if (this.value == null) {
        return null;
      }
      const correctAnswer = this.compute(this.equation[0], this.equation[1]);
      this.$emit('answered', correctAnswer == this.value);
    },

    onInput (value) {
      this.$emit('input', value);
    },

    compute: () => null,
  },
  mounted () {
    this.compute = this.signMap[this.mathType].fn;
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
