<template>
  <div class="register-page flex items-center justify-center">
    <div class="register-form flex items-center justify-center">
      <transition name="success" mode="out-in">
        <div v-if="!registrationSuccess">
          <h1>Registration Form</h1>

          <div class="form-inner">
            <custom-input
              label="Email"
              type="email"
              :error="v$.email.$error"
              v-model="form.email"
            />
            <div class="col row no-wrap">
              <custom-input
                label="First name"
                type="text"
                :error="v$.firstName.$error"
                v-model="form.firstName"
              />
              <custom-input
                label="Second name"
                type="text"
                :error="v$.lastName.$error"
                v-model="form.lastName"
              />
            </div>
            <div class="col row no-wrap">
              <custom-select v-model="form.language" :options="languages" label="Language" />
              <custom-select v-model="form.country" :options="countries" label="Country" />
            </div>
            <div class="col row no-wrap">
              <custom-input
                label="Password"
                type="password"
                :error="v$.password.$error"
                v-model="form.password"
              />
              <custom-input
                label="Confirm Password"
                type="password"
                :error="v$.confirmPassword.$error"
                v-model="form.confirmPassword"
              />
            </div>

            <div class="row items-center justify-between">
              <div>Private Profile</div>
              <custom-toggle v-model="form.privateProfile" />
            </div>
            <hr />
            <footer class="col row no-wrap">
              <custom-button class="cs-btn" @click="onSignUp" label="Sign up" />

              <custom-checkbox
                v-model="form.acceptPolicy"
                label="Creating an account means you’re okay with our Privacy Policy."
              />
            </footer>
          </div>
        </div>
        <register-success v-else />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted, computed } from 'vue'
import CustomInput from '../../form/CustomInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, sameAs, or } from '@vuelidate/validators'
import CustomCheckbox from '../../form/CustomCheckbox.vue'
import CustomToggle from '../../form/CustomToggle.vue'
import CustomButton from '../../buttons/CustomButton.vue'
import CustomSelect from '../../form/CustomSelect.vue'
import skImg from '../../../assets/form/sk.svg'
import ukImg from '../../../assets/form/uk.svg'
import axios from 'axios'
import RegisterSuccess from './RegisterSuccess.vue'

const COUNTRIES_API = 'https://restcountries.com/v2/all?fields=name'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    CustomInput,
    CustomCheckbox,
    CustomToggle,
    CustomButton,
    CustomSelect,
    RegisterSuccess,
  },
  // props: {},
  setup() {
    const registrationSuccess = ref(false)

    const languages = [
      { name: 'Slovak', src: skImg },
      { name: 'English', src: ukImg },
    ]
    const countries = ref(null)

    const form = reactive({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      privateProfile: false,
      acceptPolicy: false,
      language: '',
      country: '',
    })

    const rules = computed(() => {
      // todo
      return {
        email: { required, email },
        firstName: { required },
        lastName: { required },
        password: { required },
        confirmPassword: { required },
        acceptPolicy: (v: boolean) => !!v,
        language: { required },
        country: { required },
      }
    })

    const v$ = useVuelidate(rules, form)

    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(COUNTRIES_API)
        countries.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const onSignUp = () => {
      console.log(v$)

      v$.value.$touch()
      if (v$.value.$error) return
      registrationSuccess.value = true
    }

    onMounted(async () => {
      await fetchCountries()
    })

    return {
      form,
      v$,
      languages,
      countries,
      onSignUp,
      registrationSuccess,
    }
  },
})
</script>

<style scoped lang="scss">
.register-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(118.87deg, #ffffff -17.53%, #e0eaf7 102.01%);
}

.register-form {
  max-width: 874px;
  width: 100%;
  min-height: 854px;
  background: #fff;
  box-shadow: 0px 40px 60px -33px rgba(0, 0, 0, 0.04);
  border-radius: 25px;
  padding: 94px 20px;
  font-weight: 500;
  color: #1c2d41;
  overflow: hidden;

  .form-inner {
    max-width: 662px;
    margin: 0 auto;
  }

  .col {
    gap: 26px;
  }

  hr {
    height: 1px;
    background: #f1f3f5;
    border: none;
    margin: 30px 0;
  }

  h1 {
    font-weight: 500;
    font-size: 60px;
    line-height: 78px;
    letter-spacing: -0.02em;
    margin-bottom: 58px;

    @media (max-width: 600px) {
      font-size: 30px;
      line-height: 39px;
      letter-spacing: -0.02em;
      text-align: left;
      margin-bottom: 29px;
    }
  }
}

@media (max-width: 600px) {
  .register-form {
    padding: 25px 20px;
  }
  .register-page {
    padding: 20px;
  }

  .col {
    gap: 0 !important;

    .cs-btn {
      max-width: unset;
    }
  }
  .no-wrap {
    flex-wrap: wrap;
  }

  footer {
    flex-direction: column-reverse;

    .cs-btn {
      margin-top: 20px;
    }
  }
}
</style>
