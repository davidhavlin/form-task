<template>
  <div>
    <div
      @click="toggleValue = !toggleValue"
      class="toggle--wrapper"
      :class="{
        'custom-toggle__error': error,
        'custom-toggle__disabled': disabled,
        'custom-toggle__checked': toggleValue,
      }"
    >
      <input v-model="toggleValue" type="checkbox" />
      <div class="toggle--thumb flex items-center justify-center">
        <CirclesIcon />
      </div>
      <div class="toggle--label flex items-center justify-center">
        <transition name="opacity" mode="out-in">
          <div class="label-true" v-if="toggleValue">YES</div>
          <div class="label-false" v-else>NO</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CirclesIcon from '../icons/CirclesIcon.vue'

export default defineComponent({
  name: 'CustomToggle',
  components: { CirclesIcon },
  props: {
    modelValue: { type: Boolean, required: true },
    label: { type: String, default: 'Label' },
    error: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const toggleValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      },
    })
    return {
      toggleValue,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$hzSpace: 4px;
$thumbWidth: 19px;
.toggle--wrapper {
  cursor: pointer;
  position: relative;
  background: #f2f5f8;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  transition: background 300ms;

  input {
    display: none;
  }

  .toggle--thumb {
    position: absolute;
    top: 50%;
    left: $hzSpace;
    width: $thumbWidth;
    height: 24px;
    background: #ffffff;
    box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12);
    border-radius: 7px;
    transform: translateY(-50%);
    z-index: 2;
    transition: left 300ms;

    .circles {
      display: grid;
      gap: 2px;
      grid-template-columns: 1fr 1fr;

      span {
        width: 2px;
        height: 2px;
        background: black;
      }
    }
  }
  .toggle--label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-weight: bold;
    font-size: 11px;
    color: #76879e;
    user-select: none;
    z-index: 1;

    .label-false,
    .label-true {
      position: absolute;
      transform: translateX(50%);
    }
    .label-true {
      transform: translateX(-50%);
      color: #fff;
    }
  }
}

.custom-toggle__checked {
  background: $positive;
  .toggle--thumb {
    left: calc(100% - $thumbWidth - $hzSpace);
  }
}
</style>
