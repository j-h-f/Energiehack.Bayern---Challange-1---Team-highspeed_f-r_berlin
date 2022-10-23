<template>
  <div
    class="has-background-light max-width-30 has-radius box ml-5 mt-5 overflow foreground"
  >
    <h1 class="title is-1 has-text-primary">Kartenansicht</h1>
    <div>
      <SearchBar v-model="searchResult" />
    </div>
    <hr class="seperator" />
    <h3 class="title is-3 has-text-left has-text-primary">
      Attraktive Gemeinden:
    </h3>
    <div class="mb-3" v-for="city in bestCities" :key="city.ident">
      <b-button type="is-primary" @click="selectCity(city)">{{
        city.name
      }}</b-button>
    </div>
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
      bestCities: [],
    };
  },
  created() {
    this.$http.get("highscore", { params: { results: 19 } }).then((res) => {
      console.log(res.data);
      this.bestCities = res.data;
    });
  },
  methods: {
    selectCity(city) {
      this.$emit("city_select", city);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
