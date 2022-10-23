<template>
  <div
    class="has-background-light box m-5 max-width-30 overflow foreground"
    v-if="activeCity"
  >
    <h3 class="title is-3 has-text-left has-text-primary">
      {{ activeCity.name }}
      <b-button
        class="is-pulled-right"
        @click="close"
        icon-left="circle-xmark"
      ></b-button>
    </h3>
    <hr />

    <h4 class="title is-4 has-text-bold">Allgemein</h4>
    <ul>
      <li>
        <ListEntry
          label="Regierungsbezirk"
          :value="activeCity.city_data.Region"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="Landkreis"
          :value="activeCity.city_data.Kreis"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="Postleitzahl"
          :value="activeCity.city_data.Postleitzahl"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="Gemeindeschlüssel"
          :value="activeCity.city_data['Amtl. Gemeindeschlüssel']"
        ></ListEntry>
      </li>
    </ul>
    <hr />

    <h4 class="title is-4 has-text-bold">Netzstatus</h4>
    <ul>
      <li>
        <ListEntry
          label="laufende Förderverfahren"
          :value="activeCity.gigabit_data == null ? 'Nein' : 'Ja'"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="Aktuelle Bandbreite Privathaushalte"
          :value="''"
        ></ListEntry>
        <InternetData :internet_data="activeCity.internet_data" type="priv" />
        <hr />
      </li>
      <li>
        <ListEntry label="Aktuelle Bandbreite Gewerbe" :value="''"></ListEntry>
        <InternetData :internet_data="activeCity.internet_data" type="gew" />
        <hr />
        <competitor-data :data="activeCity.competition" />
        <hr />
      </li>
      <li>
        <ListEntry
          label="Nächster Knotenpunkt"
          :value="activeCity.city_data.Kreis"
        ></ListEntry>
      </li>
    </ul>
    <hr />

    <div v-if="activeCity.major_data">
      <h4 class="title is-4 has-text-bold">Politik</h4>
      <ul>
        <li>
          <ListEntry
            label="Bürgermeister"
            :value="activeCity.major_data['Bürgermeister/in']"
          ></ListEntry>
        </li>
        <li>
          <ListEntry
            label="Alter"
            :value="
              new Date().getFullYear() - activeCity.major_data.Geburtsjahr
            "
          ></ListEntry>
        </li>
        <li>
          <ListEntry
            label="Partei"
            :value="activeCity.major_data['Wahlvorschlag']"
          ></ListEntry>
        </li>
        <li>
          <ListEntry
            label="Verhältnis Bürgermeister"
            :value="activeCity.major_data.friendlyness"
          ></ListEntry>
        </li>
      </ul>
      <hr />
    </div>

    <h4 class="title is-4 has-text-bold">Anwohner</h4>
    <ul>
      <li>
        <ListEntry
          label="Einwohnerzahl"
          :value="activeCity.city_data.Einwohner"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="männlich"
          :value="activeCity.city_data['männlich']"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="männlich"
          :value="activeCity.city_data['weiblich']"
        ></ListEntry>
      </li>
      <li>
        <ListEntry label="Kommunale Steuerkraft" :value="'tba'"></ListEntry>
      </li>
      <li>
        <ListEntry label="Bevölkerungswachstum" :value="'tba'"></ListEntry>
      </li>
      <li>
        <ListEntry label="Bevölkerungsdichte" :value="'tba'"></ListEntry>
      </li>
    </ul>
    <hr />

    <h4 class="title is-4 has-text-bold">Wohnsituation</h4>
    <ul>
      <li>
        <ListEntry label="Anzahl Neubaugebiete" :value="'tba'"></ListEntry>
      </li>
      <li>
        <ListEntry label="Verteilung Wohnsituation" :value="''"></ListEntry>
        <ListEntry label="Einfamilienhäuser" :value="'tba'"></ListEntry>
        <ListEntry label="mehrfamilienhäuser" :value="'tba'"></ListEntry>
      </li>
    </ul>
    <hr />
  </div>
</template>

<script>
import InternetData from "@/components/InternetData.vue";

import ListEntry from "@/components/LayoutComponents/ListEntry.vue";
import CompetitorData from "./CompetitorData.vue";

export default {
  name: "DetailBox",
  components: { ListEntry, InternetData, CompetitorData },
  props: ["activeCity"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
</style>
