<template>
  <div>
    <number-display
      :value="equation[0]"
    />
    <number-display
      :value="equation[1]"
    />
    <number-input
      v-bind:value="value"
      v-on:input="onInput"
      v-on:enter="checkIt"
    />
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

const methods = {
  checkIt() {
    if (this.value == null) {
      return null;
    }
    const correctAnswer = this.equation.reduce((ans, next) => ans * next, 1);
    this.$emit('answered', correctAnswer == this.value);
  },
  onInput (value) {
    this.$emit('input', value);
  }
}

export default {
  name: 'multiplication-equation',
  props: [ 'equation', 'value' ],
  components: {
    PButton,
    NumberDisplay,
    NumberInput
  },
  methods
}
</script>
