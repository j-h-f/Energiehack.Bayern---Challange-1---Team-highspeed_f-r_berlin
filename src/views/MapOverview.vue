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
        <MglMarker
          class="width-100 pos_abs"
          :coordinates="center"
          color="blue"
        />

        <MglNavigationControl position="bottom-right" />

        <MglGeojsonLayer
          v-if="geojson"
          :sourceId="geojson.name"
          :source="geojson"
          layerId="gemeindenLayer"
          :layer="geojsonLayer"
        />
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglMarker,
  MglGeojsonLayer,
  MglNavigationControl,
} from "vue-mapbox";
import SearchBox from "@/components/SearchBox.vue";
import DetailBox from "@/components/DetailBox.vue";
import SearchResultBox from "@/components/SearchResultBox.vue";
import axios from "axios";

export default {
  name: "MapOverview",
  components: {
    MglMap,
    MglMarker,
    MglGeojsonLayer,
    SearchBox,
    DetailBox,
    SearchResultBox,
    MglNavigationControl,
  },
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
      geojson: null,
      geojsonLayer: {
        id: "gemeindenLayer",
        source: {
          type: "geojson",
          data: null,
        },
        type: "line",
      },
    };
  },
  created() {
    this.mapbox = Mapbox;
    axios
      .get("data/Gemeinden.geojson")
      .then((res) => {
        this.geojson = res.data;
        this.geojsonLayer.source.data = this.geojson;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    setActiveCity(e) {
      this.activeCity = e;
      this.center = [
        this.activeCity.coordinates_data.x,
        this.activeCity.coordinates_data.y,
      ];
      this.zoom = 9;
      this.geojsonLayer.source.data = this.geojson.features.filter((elem) => {
        return (
          elem.properties.AGS_0 ==
          this.activeCity.city_data["Amtl. Gemeindeschlüssel"]
        );
      })[0];
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
  position: absolute;
  top: 0;
  left: 0;
}

:deep(mapboxgl-marker mapboxgl-marker-anchor-center) {
  position: absolute;
}
</style>
