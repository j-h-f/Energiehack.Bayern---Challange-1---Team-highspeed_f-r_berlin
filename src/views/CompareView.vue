<template>
  <div class="comparison-root">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <DetailBox
              style="max-width: 100%"
              v-if="city_1"
              :activeCity="city_1"
            />
          </div>
          <div class="column is-4">
            <DetailBox
              style="max-width: 100%"
              v-if="city_2"
              :activeCity="city_2"
            />
          </div>
          <div class="column is-4">
            <DetailBox
              style="max-width: 100%"
              v-if="city_3"
              :activeCity="city_3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailBox from "@/components/DetailBox.vue";

export default {
  name: "CompareView",
  components: {
    DetailBox,
  },
  data() {
    return {
      city_1: null,
      city_2: null,
      city_3: null,
    };
  },
  created() {
    this.$http.get("/city/09773182").then((res) => {
      this.city_1 = res.data;
    });

    this.$http.get("/city/09178122").then((res) => {
      this.city_2 = res.data;
    });

    this.$http.get("/city/09774198").then((res) => {
      this.city_3 = res.data;
    });
  },
};
</script>

<style></style>
