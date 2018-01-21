<template>
  <button
    v-on:click.stop="click"
    :disabled="disabled"
  >{{ label }}</button>
</template>

<script>
export default {
  name: 'p-button',
  props: [ 'click', 'label', 'disabled' ],
}
</script>

<style scoped>
button {
  width: 100%;
  background-color: #aaaaaa;
  border-radius: 3px;
  color: white;
  font-size: 24px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

button:disabled {
  background-color: #b9b8b8;
  color: #eaeaea;
  border: none;
  border-bottom: 1px solid #949494;
  border-right: 1px solid #949494;
}

button:focus {
  outline: none;
}

button:active {
  border: none;
  border-top: 1px solid black;
  border-left: 1px solid black;
}
</style>
