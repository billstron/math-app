<template>
  <input
    type="tel"
    v-bind:value="value"
    v-on:input="update($event.target.value)"
    v-on:keyup.enter="onEnter"
  />
</template>

<script>

const model = {
  currentValue: undefined
};

const methods = {
  onEnter() {
    this.$emit('enter', this.currentValue);
  },

  update (value) {
    this.currentValue = Number(value);
    this.$emit('input', this.currentValue);
  }
};

export default {
  name: 'number-input',
  props: [ 'value' ],
  methods,
  data() {
    return model;
  }
}
</script>

<style scoped>
  div {
    font-size: 44px;
  }
</style>
