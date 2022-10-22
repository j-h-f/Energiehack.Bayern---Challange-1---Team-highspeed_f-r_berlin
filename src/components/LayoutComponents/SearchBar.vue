<template>
  <div class="search-bar-root">
    <div class="columns">
      <div class="column is-8">
        <b-input
          v-model="searchedName"
          type="text"
          placeholder="Gemeinde suchen"
          @keypress.enter="searchTerm"
        ></b-input>
      </div>
      <div class="column is-4">
        <b-button type="primary" @click="searchTerm">Suchen</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  model: {
    event: "success",
  },
  data() {
    return {
      searchedName: "",
    };
  },
  methods: {
    searchTerm() {
      this.$http
        .get("/search", { params: { q: this.searchedName } })
        .then((res) => {
          this.$emit("success", res.data);
        })
        .catch((err) => {
          console.log(err);
          this.$emit("error");
        });
    },
  },
};
</script>

<style></style>
