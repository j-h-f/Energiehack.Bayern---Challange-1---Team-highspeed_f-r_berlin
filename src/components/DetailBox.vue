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
          label="Aktuelle Bandbreite"
          :value="activeCity.city_data.Region"
        ></ListEntry>
      </li>
      <li>
        <ListEntry
          label="Wettbewerb"
          :value="activeCity.city_data.Kreis"
        ></ListEntry>
        <ListEntry
          label="Telekom"
          :value="activeCity.city_data.Kreis"
        ></ListEntry>
        <ListEntry
          label="Vodafon"
          :value="activeCity.city_data.Kreis"
        ></ListEntry>
        <ListEntry label="o2" :value="activeCity.city_data.Kreis"></ListEntry>
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
        <li>Verhältnis Bürgermeister: {{ activeCity.city_data.Kreis }}</li>
      </ul>
      <hr />
    </div>

    <h4 class="title is-4 has-text-bold">Anwohner</h4>
    <ul>
      <li>Einwohnerzahl: {{ activeCity.city_data.Region }}</li>
      <li>%-männlich:</li>
      <li>%-weiblich:</li>
      <li>Kaufkraft:</li>
      <li>Bevölkerungswachstum:</li>
      <li>Bevölkerungsdichte:</li>
    </ul>
    <hr />

    <h4 class="title is-4 has-text-bold">Wohnsituation</h4>
    <ul>
      <li>Neubaugebiete aktuell: {{ activeCity.city_data.Region }}</li>
      <li>Verteilung Wohnsituation:</li>
    </ul>
    <hr />
  </div>
</template>

<script>
import ListEntry from "@/components/LayoutComponents/ListEntry.vue";

export default {
  name: "DetailBox",
  components: { ListEntry },
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
