<template>
  <input
    type="tel"
    :value="currentValue"
    @input="update"
    v-on:keyup.enter="onEnter"
    :id="tag"
  />
</template>

<script>

export default {
  name: 'number-input',
  props: [ 'modelValue', 'tag' ],
  emits: ['update:modelValue'],
  data() {
    return {
      currentValue: undefined,
      prevValue: undefined,
    };
  },
  watch: {
    modelValue(value) {
      this.prevValue = this.currentValue;
      this.currentValue = value;
    },
  },
  methods: {
    onEnter() {
      this.$emit('enter', this.currentValue);
    },

    update ($event) {
      const { value } = $event.target;
      if (isNaN(Number(value))) {
        this.currentValue = this.prevValue;
      } else {
        this.currentValue = Number(value);
      }
      
      if (this.currentValue !== this.prevValue) {
        this.$emit('update:modelValue', value)
      }
      this.prevValue = this.currentValue;
    },
  },
  mounted() {
    this.prevValue = this.currentValue;
    this.currentValue = this.value;
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
  line-height: 40px;
  border-radius: 0;
  margin-top: 0;
  padding-top: 0;
}

input:focus {
  outline: none;
}
</style>
