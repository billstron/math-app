<template>
  <input
    type="tel"
    v-bind:value="value"
    v-on:input="update($event.target.value)"
    v-on:keyup.enter="onEnter"
    v-bind:id="tag"
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
    if (value.length == 0 || value == '-') {
      this.currentValue = value;
      return null;
    }
    this.currentValue = Number(value);
    this.$emit('input', this.currentValue);
  }
};

export default {
  name: 'number-input',
  props: [ 'value', 'tag' ],
  methods,
  data() {
    return model;
  },
}
</script>

<style scoped>
input {
  font-size: 40px;
  float: left;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid black;
  width: 80px;
  text-align: center;
  padding-bottom: 0;
  line-height: 44px;
  border-radius: 0;
}

input:focus {
  outline: none;
}
</style>
