<template>
  <div class="list-entry-root columns">
    <div class="column is-6">{{ label }}:</div>
    <div class="column is-6">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ListEntry",
  props: ["label", "value"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
