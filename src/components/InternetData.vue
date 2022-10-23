<template>
  <div class="internet-data-root">
    <b-progress
      v-for="dataKey in internetDataKeys"
      :key="dataKey"
      :value="internet_data[dataKey]"
      size="is-medium"
      type="is-primary"
      show-value
    >
      {{ mapping[dataKey] + " - " + internet_data[dataKey] + "%" }}
    </b-progress>
  </div>
</template>

<script>
export default {
  name: "InternetData",
  props: ["internet_data", "type"],
  data() {
    return {
      mapping: {
        priv_alle_tech_10: "Bis 10 mBit/s",
        priv_alle_tech_16: "Bis 16 mBit/s",
        priv_alle_tech_30: "Bis 30 mBit/s",
        priv_alle_tech_50: "Bis 50 mBit/s",
        priv_alle_tech_100: "Bis 100 mBit/s",
        priv_alle_tech_200: "Bis 200 mBit/s",
        priv_alle_tech_400: "Bis 400 mBit/s",
        priv_alle_tech_1000: "Bis 1000 mBit/s",

        gew_lg_tech_10: "Bis 10 mBit/s",
        gew_lg_tech_16: "Bis 16 mBit/s",
        gew_lg_tech_30: "Bis 30 mBit/s",
        gew_lg_tech_50: "Bis 50 mBit/s",
        gew_lg_tech_100: "Bis 100 mBit/s",
        gew_lg_tech_200: "Bis 200 mBit/s",
        gew_lg_tech_400: "Bis 400 mBit/s",
        gew_lg_tech_1000: "Bis 1000 mBit/s",
      },
    };
  },
  computed: {
    internetDataKeys() {
      if (this.type == "priv") {
        return Object.keys(this.internet_data).filter((elem) => {
          return elem.includes("priv_alle_tech");
        });
      } else {
        return Object.keys(this.internet_data).filter((elem) => {
          return elem.includes("gew_lg_tech");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
