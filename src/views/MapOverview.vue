<template>
  <div class="map-overview-root has-text-left is-flex">
    <div class="columns has-background-light max-width-30 has-radius box m-5">
      <div class="column has-text-centered">
        <h1 class="title is-1 has-text-primary">Kartenansicht</h1>
        <div>
          <b-button @click="show_static_city()" type="is-primary">
            Suche nach Ingolstadt
          </b-button>
        </div>
      </div>
    </div>
    <div class="has-background-light box m-5 max-width-30" v-if="activeCity">
      <h3 class="title is-3 has-text-centered has-text-primary">
        {{ activeCity.name }}
      </h3>
      <ul>
        <li>
          <div class="columns">
            <div class="column is-3">Fläche</div>
            <div class="column is-3">
              {{ activeCity.city_data["Fläche in km²"] }} km²
            </div>
          </div>
        </li>
        <li>
          <div class="columns">
            <div class="column is-3">Einwohner</div>
            <div class="column is-3">
              {{ activeCity.city_data["Einwohner"] }}
            </div>
          </div>
          <div class="is-flex width-50 einwohner">
            <div
              class="background-m"
              :style="
                'width:' +
                get_pixel_values(
                  activeCity.city_data['männlich'],
                  activeCity.city_data['Einwohner']
                ) +
                ';'
              "
            >
              <div>
                <b-icon
                  class="has-text-white"
                  pack="fas"
                  icon="person"
                  size="is-small"
                >
                </b-icon>
              </div>
              <div>
                {{ activeCity.city_data["männlich"] }}
              </div>
            </div>
            <div
              class="background-f"
              :style="
                'width:' +
                get_pixel_values(
                  activeCity.city_data['männlich'],
                  activeCity.city_data['Einwohner']
                ) +
                ';'
              "
            >
              <div>
                {{ activeCity.city_data["weiblich"] }}
              </div>
              <div>
                <b-icon
                  class="is-pulled-right has-text-white"
                  pack="fas"
                  icon="person-dress"
                  size="is-small"
                >
                </b-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {{ Object.keys(activeCity.city_data) }}
    </div>
    <div class="is-background width-100">
      <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="center"
        :zoom="zoom"
      >
        <MglNavigationControl position="top-right" />
        <MglGeojsonLayer
          :sourceId="'test-data'"
          :source="geoJSONsource"
          layerId="test-layer"
          :layer="geoJsonLayer"
        ></MglGeojsonLayer>
      </MglMap>
    </div>
    <!-- <div class="columns">
  </div> -->
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl, MglGeojsonLayer } from "vue-mapbox";

export default {
  name: "MapOverview",
  components: { MglMap, MglNavigationControl, MglGeojsonLayer },
  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoiai1oLWYtMiIsImEiOiJjbDlqcjI0eWUwNG5oM3ZxZHZneTRmYmN4In0.2mqB1vzS7kXBd0NGQjLfMQ",
      mapStyle: "mapbox://styles/mapbox/light-v10",
      center: [11.385752778581312, 49.22867058547966],
      zoom: 6.75,
      activeCity: null,
      geoJSONsource: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [125.6, 10.1],
          },
          properties: {
            name: "Dinagat Islands",
          },
        },
      },
      geoJsonLayer: {
        id: "test-layer",
        source: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [125.6, 10.1],
          },
          properties: {
            name: "Dinagat Islands",
          },
        },
        "source-layer": "test-data",
        type: "fill",
        paint: {
          "fill-color": "#00ffff",
        },
      },
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    show_static_city() {
      this.$http
        .get("/city/09161000", { withCredentials: false })
        .then((res) => {
          console.log(res.data);
          this.activeCity = res.data;
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
  z-index: -1;
}

.max-width-30 {
  max-width: 30%;
}

.border-left {
  border-left: 2px solid $primary;
}

.width-50 {
  width: 50%;
}

.background-m {
  background: rgb(44, 137, 208);
  padding: 5px;
  margin: 0;
  height: 2rem;
}

.background-f {
  background: rgb(250, 171, 208);
  padding: 5px;
  margin: 0;
  height: 2.5rem;
  display: flex;
  vertical-align: middle;
}

.einwohner {
  vertical-align: middle;
}
</style>
