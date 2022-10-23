<template>
  <div class="home-root">
    <section class="section">
      <div class="container">
        <h1 class="title is-1 has-text-white">
          Challenge 1 - Schnelleres Internet für Bayern
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";

.home-root {
  height: 100%;
  overflow: hidden;
  background-image: url("@/assets/image/final_nfsb.png");
  background-size: cover;
}
</style>
