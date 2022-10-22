<template>
  <div
    class="search-result-root has-background-light max-width-30 has-radius box ml-5 mt-5 overflow foreground"
  >
    <h3 class="title is-3 has-text-left has-text-primary">
      Suchergebnisse
      <b-button
        class="is-pulled-right"
        @click="close"
        icon-left="circle-xmark"
      ></b-button>
    </h3>
    <hr />
    <div
      class="is-flex box has-background-primary has-text-white"
      v-for="result in searchResult"
      :key="result.ident"
      @click="selectResult(result)"
    >
      {{ result.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultBox",
  props: ["searchResult"],
  methods: {
    selectResult(result) {
      this.$emit("input", result);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
