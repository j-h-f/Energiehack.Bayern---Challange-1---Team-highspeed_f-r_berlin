<template>
  <div class="map-overview-root is-flex overflow">
    <SearchBox v-model="searchResult" />
    <SearchResultBox
      v-if="searchResult.length > 0"
      :searchResult="searchResult"
      @input="setActiveCity"
      @close="searchResult = []"
    />
    <DetailBox
      @close="activeCity = null"
      :activeCity="activeCity"
      v-if="activeCity"
    />

    <div class="is-background width-100">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="center"
        :zoom="zoom"
      >
        <MglMarker class="width-100" :coordinates="center" color="blue" />
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import SearchBox from "@/components/SearchBox.vue";
import DetailBox from "@/components/DetailBox.vue";
import SearchResultBox from "@/components/SearchResultBox.vue";

export default {
  name: "MapOverview",
  components: { MglMap, SearchBox, DetailBox, SearchResultBox, MglMarker },
  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoiai1oLWYtMiIsImEiOiJjbDlqcjI0eWUwNG5oM3ZxZHZneTRmYmN4In0.2mqB1vzS7kXBd0NGQjLfMQ",
      // mapStyle: "mapbox://styles/ellichristine/cl9jzkfgp007t16t9vf57d0jr",
      mapStyle: "mapbox://styles/mapbox/light-v10",
      center: [11.385752778581312, 49.22867058547966],
      zoom: 6.75,
      activeCity: null,
      activeCoordinates: null,
      searchResult: [],
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    setActiveCity(e) {
      this.activeCity = e;
      this.center = [
        this.activeCity.coordinates_data.x,
        this.activeCity.coordinates_data.y,
      ];
      this.zoom = 9;
      // this.activeCoordinates = [
      //   parseFloat(e.coordinates_data.x),
      //   parseFloat(e.coordinates_data.y),
      // ];
    },

    show_static_city() {
      this.$http
        .get("/city/09161000", { withCredentials: false })
        .then((res) => {
          console.log(res.data);
          this.activeCity = res.data;
          this.center = [
            res.data.coordinates_data.x,
            res.data.coordinates_data.y,
          ];
          this.zoom = 9;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_pixel_values(sub, total) {
      console.log((sub.replace(".", "") / total.replace(".", "")) * 100 + "%");
      return (sub.replace(".", "") / total.replace(".", "")) * 100 + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";

.width-100 {
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
}

.is-background {
  // position: absolute;
  top: 0;
  left: 0;
}
</style>
