<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          class="logo"
          src="@/assets/Logo - transparenter Hintergrund_small.png"
          alt="NeedForSpeed:Bayern"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="'/'"> Startseite </b-navbar-item>
      <b-navbar-item tag="router-link" :to="'/map'"> Karte </b-navbar-item>
      <b-navbar-item tag="router-link" :to="'/compare'">
        Vergleich
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";

:deep(.nav-item) {
  padding: 0 !important;
}

.logo {
  width: 100%;
}
</style>
