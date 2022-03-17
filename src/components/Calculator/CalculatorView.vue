<template>
  <section class="calculator">
    <nav>
      <h1>calc</h1>
      <section>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <p>
          <span class="text">THEME</span>
          <button class="toggle" v-on:click="toggleTheme">
            <span class="mode mode0"></span>
            <span class="mode mode1"></span>
            <span class="mode mode2"></span>
          </button>
        </p>
      </section>
    </nav>
    <section class="number-window">
      <!-- <div class="wrapper"> -->
      <input
        ref="screen"
        type="text"
        class="calculator-screen"
        v-model="value"
        placeholder="0"
        disabled
      />
      <!-- </div> -->
    </section>
    <section class="number-grid">
      <section class="grid-container">
        <ul class="grid1">
          <li class="grid-item color">7</li>
          <li class="grid-item color">8</li>
          <li class="grid-item color">9</li>
          <li class="grid-item color2 delete">DEL</li>

          <li class="grid-item color">4</li>
          <li class="grid-item color">5</li>
          <li class="grid-item color">6</li>
          <li class="grid-item color operator">+</li>

          <li class="grid-item color">1</li>
          <li class="grid-item color">2</li>
          <li class="grid-item color">3</li>
          <li class="grid-item color operator">-</li>

          <li class="grid-item color decimal">.</li>
          <li class="grid-item color">0</li>
          <li class="grid-item color operator">/</li>
          <li class="grid-item color operator">x</li>
        </ul>
        <ul class="grid2">
          <li class="grid2-item color2 all-clear">RESET</li>
          <li class="grid2-item color3 operator" v-on:click="focusMethod()">
            =
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script>
import calculator from "./calculator";

export default calculator;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./calculator.scss" scoped></style>
