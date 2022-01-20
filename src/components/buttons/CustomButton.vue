<template>
  <button class="custom-button" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="button-inner">
      <span>
        <slot>{{ label }}</slot>
      </span>
      <transition name="showBackground">
        <div v-if="hover" class="button-background"></div>
      </transition>
    </div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    label: { type: String, default: 'Label' },
    error: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup() {
    const hover = ref(false)

    return {
      hover,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$hzSpace: 4px;
$thumbWidth: 19px;

.custom-button {
  cursor: pointer;
  max-width: 268px;
  width: 100%;
  background: #004eef;
  background: linear-gradient(269.72deg, #004eef 0.1%, #8600ef 96.94%);
  box-shadow: 0px 4px 14px rgba(0, 78, 239, 0.19);
  border-radius: 16px;
  transition: box-shadow 300ms;
  border: none;
  outline: none;
  position: relative;
  padding: 0;

  .button-inner {
    padding: 22px;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }

  span {
    position: relative;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    z-index: 1;
  }

  .button-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(269.72deg, #8600ef 0.1%, #004eef 96.94%);
    z-index: 0;
  }

  &:hover {
    box-shadow: 0px 32px 44px -13px rgba(34, 59, 240, 0.35);
  }
}
</style>
