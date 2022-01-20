<template>
  <transition name="fadeIn" appear>
    <RegisterPage />
  </transition>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import RegisterPage from './components/page/Register/RegisterPage.vue'
</script>

<style>
@import './scss/reset.scss';
@import './scss/global.scss';
@import './scss/animations.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
