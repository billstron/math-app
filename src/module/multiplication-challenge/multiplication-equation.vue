<template>
  <div class="equation">
    <div class="inner">
      <number-display
        :value="equation[0]"
      />
      <icon class="math-sign" name="times"/>
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

const methods = {
  checkIt(event) {
    document.getElementById('input-tag').focus();
    if (this.value == null) {
      return null;
    }
    const correctAnswer = this.equation.reduce((ans, next) => ans * next, 1);
    this.$emit('answered', correctAnswer == this.value);
  },

  onInput (value) {
    this.$emit('input', value);
  },
}

export default {
  name: 'multiplication-equation',
  props: [ 'equation', 'value', 'tag' ],
  components: {
    Icon,
    PButton,
    NumberDisplay,
    NumberInput
  },
  methods
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
