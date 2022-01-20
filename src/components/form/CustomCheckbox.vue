<template>
  <div
    @click="onToggle"
    class="custom-checkbox row no-wrap items-center justify-center"
    :class="{
      'custom-checkbox__error': error,
      'custom-checkbox__disabled': disabled,
      'custom-checkbox__checked': checkValue,
    }"
  >
    <div class="checkbox--inner flex items-center justify-center">
      <input v-model="checkValue" type="checkbox" />
      <transition name="opacity">
        <CheckIcon v-if="checkValue" />
      </transition>
    </div>
    <div class="checkbox--label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CheckIcon from '../icons/CheckIcon.vue'

export default defineComponent({
  name: 'CustomCheckbox',
  props: {
    modelValue: { type: Boolean },
    label: { type: String, default: 'Label' },
    error: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const checkValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      },
    })

    const onToggle = () => {
      if (props.disabled) return
      checkValue.value = !checkValue.value
    }
    return {
      checkValue,
      onToggle,
    }
  },
  components: { CheckIcon },
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';

.custom-checkbox {
  text-align: left;
  cursor: pointer;
  &:hover:not(.custom-checkbox__disabled):not(.custom-checkbox__checked) {
    .checkbox--inner {
      border-color: #d5dbe2;
    }
  }
}

.checkbox--inner {
  position: relative;
  width: 22px;
  height: 22px;
  background: #f2f5f8;
  border-radius: 6px;
  border: 1px solid transparent;
  flex-shrink: 0;
  transition: background 300ms;

  input {
    visibility: hidden;
    display: none;
  }
}
.custom-input:not(.custom-input__disabled) {
  .input--inner:hover {
    border-color: #d5dbe2;
  }
}
.checkbox--label {
  margin-left: 17px;
  font-weight: 500;
  font-size: 14px;
  line-height: 170.3%;
  color: #31425a;
}

.custom-checkbox__checked {
  .checkbox--inner {
    background: $positive;
    box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12);
    border-radius: 7px;
  }
}

.custom-checkbox__disabled {
  cursor: not-allowed;
  .checkbox--inner {
    background: #f6f8fa;
  }
  .checkbox--label {
    color: #d5dbe2;
  }
}
</style>
