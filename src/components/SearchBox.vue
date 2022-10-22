<template>
  <div
    class="has-background-light max-width-30 has-radius box ml-5 mt-5 overflow foreground"
  >
    <h1 class="title is-1 has-text-primary">Kartenansicht</h1>
    <div>
      <SearchBar v-model="searchResult" />
    </div>
    <hr />
  </div>
</template>

<script>
import SearchBar from "@/components/LayoutComponents/SearchBar.vue";

export default {
  name: "SearchBox",
  watch: {
    searchResult() {
      this.$emit("success", this.searchResult);
    },
  },
  model: {
    event: "success",
  },
  components: { SearchBar },
  data() {
    return {
      searchResult: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
