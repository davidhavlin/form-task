<template>
  <label
    class="custom-input"
    :class="{
      'custom-input__disabled': disabled,
      'custom-input__focused': focused,
      'custom-input__filled': value.length > 0,
      'custom-input__error': error,
    }"
  >
    <div class="input--wrapper">
      <div class="input--inner" @click="focused = true">
        <input
          :disabled="disabled"
          :type="innerType"
          @focus="focused = true"
          @blur="focused = false"
          v-model="value"
        />
        <div class="input--label">{{ label }}</div>
        <div v-if="type === 'password'" @click="showPassword" class="input--password-icon">
          <EyeIcon :error="error" />
        </div>
        <div class="input--botom-border"></div>
      </div>
      <transition name="fadeIn">
        <div v-show="error" class="input--error-label">{{ errorLabel }}</div>
      </transition>
    </div>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType, watch } from 'vue'
import EyeIcon from '../icons/EyeIcon.vue'

type InputTypes = 'text' | 'email' | 'password'

export default defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, default: 'Default' },
    error: { type: Boolean, default: false },
    errorLabel: { type: String, default: 'Something is wrong' },
    disabled: { type: Boolean, default: false },
    type: { type: String as PropType<InputTypes>, default: 'text' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focused = ref(false)
    const innerType = ref<InputTypes>(props.type)
    const value = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      },
    })
    const showPassword = () => {
      innerType.value = innerType.value === props.type ? 'text' : props.type
    }

    const onFocus = () => {
      if (focused.value) return
    }
    watch(
      () => props.type,
      (type) => {
        innerType.value = type
      }
    )
    return {
      value,
      focused,
      innerType,
      showPassword,
    }
  },
  components: { EyeIcon },
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$hzSpace: 18px;

.custom-input {
  border-radius: 14px;
  width: 100%;
  position: relative;
}

.input--wrapper {
  position: relative;

  .input--error-label {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    padding: 5px $hzSpace;
    color: $errorColor;
    z-index: 0;
  }
}
.custom-input:not(.custom-input__disabled) {
  .input--inner:hover {
    border-color: #d5dbe2;
  }
}
.input--inner {
  position: relative;
  min-height: 64px;
  cursor: text;
  background: #f6f8fa;
  border: 1px solid #f2f5f8;
  border-radius: 14px;
  overflow: hidden;
  transition: all 250ms;
  z-index: 1;
  margin-bottom: 30px;

  input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: none;
    padding: 9px $hzSpace;
    outline: none;
    border: 1px solid transparent;
    font-size: 16px;
    line-height: 21px;
    color: #1b2c45;
  }
  .input--label {
    color: #76879e;
    position: absolute;
    left: $hzSpace;
    top: 50%;
    user-select: none;
    transform: translateY(-50%) scale(1);
    transform-origin: left;
    transition: transform 300ms;
  }

  .input--botom-border {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: transparent;
    transition: background-color 300ms;
  }

  .input--password-icon {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: $hzSpace;
    transform: translateY(-50%);
  }
}
.custom-input__focused {
  .input--label {
    transform: translateY(-100%) scale(0.8);
  }
  .input--botom-border {
    background-color: #004eef;
  }
}
.custom-input__filled {
  .input--inner {
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.06);
  }
  .input--label {
    transform: translateY(-100%) scale(0.8);
  }
}
.custom-input__disabled {
  .input--inner {
    background: #f6f8fa;
    cursor: not-allowed;
  }
  input {
    cursor: not-allowed;
  }
  .input--label {
    color: #d5dbe2;
  }
}

.custom-input__error {
  .input--inner {
    background: #ffffff;
    border-color: $errorColor;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.06);
  }

  input {
    color: $errorColor;
  }
}
.custom-input__error.custom-input__focused {
  .input--botom-border {
    background-color: $errorColor;
  }
}
</style>
