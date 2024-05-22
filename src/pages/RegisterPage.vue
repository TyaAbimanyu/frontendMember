<template>
  <div class="q-pa-md">
    <h2>Register</h2>
    <q-form @submit="register" class="q-gutter-md q-mx-auto" style="max-width: 50%">
      <q-input rounded standout v-model="email" label="Email"/>
      <p style="color: red;">{{emailError}}</p>
      <q-input rounded standout v-model="password" label="Password" />
      <p style="color: red;">{{passwordError}}</p>
      <q-input rounded standout v-model="passwordConfirm" label="Password Confirmation" />
      <p style="color: red;">{{passwordConfirmError}}</p>
      <q-input rounded standout v-model="name" label="Name" />
      <p style="color: red;">{{nameError}}</p>
      <q-input rounded standout v-model="phone" label="Phone" />
      <p style="color: red;">{{phoneError}}</p>
      <div class="text-center">
        <q-btn type="submit" label="Register" color="primary" style="width: 40%;"/>
      </div>
    </q-form>
    <div class="text-center">
      <q-btn class="q-mt-xl" type="submit" label="LOGIN" color="blue" style="width: 25%;" @click="login"/>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')
const router = useRouter()
const emailError = ref('')
const passwordError = ref('')
const nameError = ref('')
const phoneError = ref('')

function register () {
  api.post('registerMember', {
    email: email.value,
    password: password.value,
    name: name.value,
    phone: phone.value
  }).then((response) => {
    router.push({ path: '/' })
  })
}

function login () {
  router.push({ path: '/' })
}

</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
