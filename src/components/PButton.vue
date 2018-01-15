<template>
  <button
    v-on:click="click"
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

</style>
