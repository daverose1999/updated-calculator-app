<template>
  <main id="app">
    <section class="background"></section>
    <CalculatorView />
  </main>
</template>

<script>
import CalculatorView from "./components/Calculator/CalculatorView.vue";

export default {
  name: "App",
  components: {
    CalculatorView,
  },
};
</script>

<style>
:root {
  --primaryColor: white;
  --secondaryColor: black;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* .background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
} */
#app {
  padding: 50px 0px;
  background-color: var(--primaryColor);
  font-family: Spartan;
  color: var(--secondaryColor);
  font-weight: 700;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}
</style>
