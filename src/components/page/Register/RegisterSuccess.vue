<template>
  <div class="success-container column items-center justify-center">
    <div class="circle cs-mb-lg flex items-center justify-center">
      <CheckIcon size="32px" />
    </div>
    <h1 class="header cs-mb-lg">Success registration</h1>
    <div class="text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis gravida ex, at
      maximus lorem condimentum ut. Cras purus mauris, convallis vitae sollicitudin sed, fringilla
      lobortis lorem.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CheckIcon from '../../icons/CheckIcon.vue'

export default defineComponent({
  name: 'RegisterSuccess',
  components: { CheckIcon },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.cs-mb-lg {
  margin-bottom: 32px;
}
.success-container {
  position: relative;
  max-width: 516px;
  width: 100%;
  height: 100%;
}
.circle {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  position: relative;
  background: #17ba87;
  box-shadow: 0px 17px 31px rgba(44, 202, 117, 0.25);
}

.header {
  font-weight: 500;
  font-size: 60px;
  line-height: 66px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #333333;
  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 39px;
    letter-spacing: -0.02em;
  }
}

.text {
  font-size: 18px;
  line-height: 175.8%;

  text-align: center;
  letter-spacing: 0.02em;

  color: #76879e;
}
</style>
