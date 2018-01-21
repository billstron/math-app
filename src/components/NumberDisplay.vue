<template>
  <div>{{ value }}</div>
</template>

<script>
export default {
  name: 'number-display',
  props: [ 'value' ],
}
</script>

<style scoped>
div {
  font-size: 40px;
  float: left;
}
</style>
