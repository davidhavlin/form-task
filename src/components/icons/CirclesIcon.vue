<template>
  <div class="circles-container">
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
    <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" rx="1" fill="#F1F3F5" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckIcon',
  props: {
    error: { type: Boolean, default: false },
  },
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';

.circles-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
}
</style>
