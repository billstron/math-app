<template>
  <input
    type="tel"
    v-bind:value="value"
    v-on:input="update($event.target.value)"
    v-on:keyup.enter="onEnter"
    autofocus="autofocus"
    id="this-button"
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
  },
  mounted() {
    if (!('autofocus' in document.createElement('input'))) {
      document.getElementById('this-button').focus();
    }
  }
}
</script>

<style scoped>
  input {
    font-size: 44px;
    float: left;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid black;
    width: 100px;
    text-align: center;
    padding-bottom: 0;
    line-height: 44px;
    border-radius: 0;
  }

  input:focus {
    outline: none;
  }
</style>
