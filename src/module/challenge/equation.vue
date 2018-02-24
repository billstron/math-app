<template>
  <div class="equation">
    <div class="inner">
      <number-display
        :value="equation[0]"
      />
      <icon
        class="math-sign"
        v-bind:name="signIcon"
      />
      <number-display
        :value="equation[1]"
      />
      <span class="math-sign">=</span>
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
import Icon from 'vue-awesome';
import PButton from '../../components/PButton.vue';
import NumberDisplay from '../../components/NumberDisplay.vue';
import NumberInput from '../../components/NumberInput.vue';

const model = {
  signIcon: 'times',
};

const methods = {
  checkIt(event) {
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

  compute: (a, b) => null,
}

const signMap = {
  multiplication : {
    icon: 'times',
    fn: (a, b) => a * b,
  },
  addition: {
    icon: 'plus',
    fn: (a, b) => a + b,
  },
  subtraction: {
    icon: 'minus',
    fn: (a, b) => a - b,
  }
};

export default {
  name: 'equation',
  props: [ 'equation', 'value', 'tag', 'mathType' ],
  components: {
    Icon,
    PButton,
    NumberDisplay,
    NumberInput
  },
  data: () => model,
  methods,
  mounted () {
    this.signIcon = signMap[this.mathType].icon;
    this.compute = signMap[this.mathType].fn;
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
}

.fa-icon {
  margin: 10px;
}

</style>
