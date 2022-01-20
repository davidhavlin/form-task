<template>
  <div style="width: 100%">
    <Popper @open:popper="onOpen" @close:popper="popover = false" class="popover">
      <div
        ref="select"
        @click="popover = !popover"
        class="custom-select row items-center justify-between"
        :class="{ 'custom-select__open': popover, 'custom-select__selected': selectValue }"
      >
        <div class="select--label">
          {{ selectValue ? selectValue : label }}
        </div>
        <div class="select--arrow" :class="{ 'rotate--arrow': popover }">
          <ArrowIcon />
        </div>
      </div>
      <template #content="{ close }">
        <div class="wtf" ref="popoverRef">
          <div
            v-if="options"
            class="column select--popover"
            :style="{
              width: selectWidth + 'px',
            }"
            :class="{ 'options-scrollable': scrollable }"
          >
            <div
              @click="selectOption(option, close)"
              v-for="(option, i) in options"
              :key="`select-option${option.name}${i}`"
              class="flex column no-wrap"
            >
              <div class="select-option row no-wrap items-center">
                <div v-if="option.src">
                  <img :src="option.src" alt="Option image" />
                </div>
                <div class="option-label">
                  {{ option.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Popper>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'

interface OptionType {
  name: string
  src?: string
}

export default defineComponent({
  name: 'CustomSelect',
  components: { ArrowIcon },
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: String },
    label: { type: String, default: 'Label' },
    error: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    options: { type: [Array] as PropType<OptionType[] | null> },
  },
  setup(props, { emit }) {
    const popover = ref(false)
    const popoverRef = ref<null | HTMLElement>(null)
    const select = ref<null | HTMLElement>(null)

    const selectValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      },
    })

    const selectOption = (option: OptionType, closePopper: () => void) => {
      selectValue.value = option.name
      popover.value = false
      closePopper()
    }

    const selectWidth = ref<null | number>(null)
    const setWidth = () => {
      if (!select.value) return
      const { width } = select.value.getBoundingClientRect()
      selectWidth.value = width
    }

    const scrollable = ref(false)
    const onOpen = () => {
      nextTick(() => {
        if (!popoverRef.value) return
        const { height } = popoverRef.value.getBoundingClientRect()
        if (height < 300) {
          scrollable.value = true
        }
      })
    }

    onMounted(() => {
      setWidth()
      // add debounce
      window.addEventListener('resize', setWidth)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setWidth)
    })

    return {
      selectOption,
      selectValue,
      popover,
      selectWidth,
      select,
      popoverRef,
      onOpen,
      scrollable,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-select {
  cursor: pointer;
  background: #f6f8fa;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid #f2f5f8;
  width: 100%;
  // max-width: 318px;
  // width: 318px;
  min-height: 64px;
  margin-bottom: 30px;
  transition: all 300ms;

  .select--label {
    font-weight: 500;
    font-size: 16px;
    color: #76879e;
  }
  .select--arrow {
    transition: transform 300ms;
  }
  .rotate--arrow {
    transform: rotate(180deg);
  }

  &:hover {
    border-color: #d5dbe2;
  }
}

.custom-select__open {
  background: #ffffff;
  border-radius: 14px 14px 0 0;
  box-shadow: 0px 12px 34px -12px rgba(0, 0, 0, 0.16);
}
.custom-select__selected {
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.06);
}
.popover {
  display: block !important;
}

.options-scrollable {
  border-radius: 0 0 14px 14px;
}
.select--popover {
  padding: 18px;
  flex-wrap: nowrap;
  max-height: 300px;
  min-width: 200px;
  background: #ffffff;
  box-shadow: 0px 12px 34px -12px rgba(0, 0, 0, 0.16);
  margin-top: -12px;
  // max-height: 400px;
  // border-radius: 0 0 14px 14px;
  overflow-y: auto;

  img {
    margin-right: 24px;
  }

  .select-option {
    padding: 17px 0;
    color: #76879e;
    cursor: pointer;
    text-align: left;

    .option-label {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
    }

    &:hover {
      color: #1b2c45;
    }
  }
}
</style>
<style lang="scss">
.v-popper {
  width: 100% !important;
}
.v-popper__popper {
  // width: 318px;

  .v-popper__inner {
    border-radius: 0px 0px 14px 14px !important;
    border: none !important;
    box-shadow: 0px 12px 34px -12px rgba(0, 0, 0, 0.16) !important;
  }

  .v-popper__arrow-container {
    display: none;
  }
}
</style>
