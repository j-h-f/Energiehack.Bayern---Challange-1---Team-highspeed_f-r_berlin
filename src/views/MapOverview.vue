<template>
  <div class="map-overview-root is-flex overflow">
    <SearchBox v-model="searchResult" @city_select="setActiveCity" />
    <SearchResultBox
      v-if="searchResult.length > 1"
      :searchResult="searchResult"
      @input="setActiveCity"
      @close="searchResult = []"
    />
    <DetailBox
      @close="activeCity = null"
      :activeCity="activeCity"
      v-if="activeCity"
    />

    <div class="box filterbox max-width-30">
      <b-field>
        <b-checkbox v-model="showCityBorders"> Gemeindegrenzen </b-checkbox>
      </b-field>
      <b-field>
        <b-checkbox v-model="showLewInfrastructure">
          Zeige LEW-Ausbaugebiete
        </b-checkbox>
      </b-field>
    </div>

    <div class="is-background width-100">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="center"
        :zoom="zoom"
      >
        <!-- <MglMarker v-if="activeCity" :coordinates="center" color="blue" /> -->

        <MglNavigationControl position="bottom-right" />

        <MglGeojsonLayer
          ref="cityBorders"
          v-if="geojson"
          :sourceId="geojson.name"
          :source="geojson"
          layerId="gemeindenLayer"
          :layer="geojsonLayer"
        />
        <MglGeojsonLayer
          v-if="geojson"
          ref="selectedCity"
          :sourceId="geojson.name"
          layerId="aktiveGemeindenLayer"
          :layer="geojsonLayerActive"
        />
        <MglGeojsonLayer
          ref="lewInfrastructure"
          v-if="lewInfrastructureSource"
          sourceId="lew_infrastructure"
          :source="lewInfrastructureSource"
          layerId="lew_infrastructure_layer"
          :layer="lew_infrastructure_layer"
        />
      </MglMap>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  // MglMarker,
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
    // MglMarker,
    MglGeojsonLayer,
    SearchBox,
    DetailBox,
    SearchResultBox,
    MglNavigationControl,
  },
  watch: {
    searchResult(newResult) {
      if (newResult.length == 1) {
        console.log(newResult[0]);
        this.setActiveCity(newResult[0]);
      }
    },
    // showCityBorders() {
    //   if (!this.showCityBorders) {
    //     this.$refs.cityBorders.remove();
    //   }
    // },
    // showLewInfrastructure() {
    //   if (!this.showLewInfrastructure) {
    //     this.$refs.lewInfrastructure.remove();
    //   }
    // },
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
      showCityBorders: true,
      showLewInfrastructure: true,
      geojson: null,
      lewInfrastructureSource: null,
      geojsonLayer: {
        id: "gemeindenLayer",
        source: {
          type: "geojson",
          data: null,
        },
        type: "line",
      },
      geojsonLayerActive: {
        id: "gemeindenLayerAktiv",
        source: {
          type: "geojson",
          data: null,
        },
        type: "fill",
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "hover"], true],
            "rgba(0, 75, 173, 0.5)",
            "rgba(0, 75, 173, 0)",
          ],
        },
      },
      lew_infrastructure_layer: {
        id: "lew_infrastructure_layer",
        type: "circle",
        source: {
          type: "geojson",
          data: null,
        },
        paint: {
          "circle-color": "rgba(0, 75, 173, 1)",
        },
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
    axios.get("https://nfsb.schwiha.de/poi/lew-infrastructure").then((res) => {
      this.lewInfrastructureSource = res.data;
      this.lew_infrastructure_layer.source.data = this.lewInfrastructureSource;
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
      this.geojsonLayerActive.source.data = this.geojson.features.filter(
        (elem) => {
          return (
            elem.properties.AGS_0 ==
            this.activeCity.city_data["Amtl. Gemeindeschlüssel"]
          );
        }
      )[0];
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
$test: rgba(0, 75, 173, 0.514);
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

.filterbox {
  z-index: 1;
  position: absolute;
  right: 1.5rem;
  margin-top: 1.5rem;
}

// :deep(mapboxgl-marker mapboxgl-marker-anchor-center) {
//   position: absolute;
// }
</style>
