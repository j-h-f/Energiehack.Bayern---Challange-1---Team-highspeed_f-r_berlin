<template>
  <div class="competitor-data-root">
    <h4 class="title is-4 has-text-bold">Konkurrenzausbau vorhanden?</h4>
    <div class="columns">
      <div class="column">
        <b-image
          class="company-logo"
          :src="require('@/assets/logos/telekom_icon.png')"
        ></b-image>
        Telekom
      </div>
      <div class="column">{{ data.telekom ? "Ja" : "Nein" }}</div>
    </div>
    <div class="columns">
      <div class="column">
        <b-image
          class="company-logo"
          :src="require('@/assets/logos/vodafone_icon.png')"
        ></b-image>
        Vodafone
      </div>
      <div class="column">{{ data.vodafone ? "Ja" : "Nein" }}</div>
    </div>
    <div class="columns">
      <div class="column">
        <b-image
          class="company-logo"
          :src="require('@/assets/logos/o2_icon.png')"
        ></b-image>
        o2
      </div>
      <div class="column">{{ data.o2 ? "Ja" : "Nein" }}</div>
    </div>
    <div class="columns">
      <div class="column">
        <b-image
          class="company-logo"
          :src="require('@/assets/logos/mnet_icon.png')"
        ></b-image>
        M-Net
      </div>
      <div class="column">{{ data.mnet ? "Ja" : "Nein" }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompetitorData",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";

.company-logo {
  vertical-align: middle;
  display: inline-block;
  width: 2rem;
  aspect-ratio: 1/1;
}
</style>
