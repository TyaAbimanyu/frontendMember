<template>
  <div class="q-pa-md">
    <h2>Login</h2>
    <q-form @submit="login" class="q-gutter-md q-mx-auto" style="max-width: 50%">
      <q-input rounded standout v-model="email" label="Email"/>
      <p style="color: red;">{{emailError}}</p>
      <q-input rounded standout v-model="password" label="Password" />
      <p style="color: red;">{{passwordError}}</p>
      <div class="text-center">
        <q-btn type="submit" label="LOGIN" color="primary" style="width: 40%;"/>
      </div>
    </q-form>
    <div class="text-center">
      <q-btn class="q-mt-xl" type="submit" label="REGISTER" color="blue" style="width: 25%;" @click="register()"/>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const router = useRouter()
const emailError = ref('')
const passwordError = ref('')

function login () {
  api.post('loginMember', {
    email: email.value,
    password: password.value
  }).then((response) => {
    if (response.status === 200) {
      const token = response.data.member_token_uuid
      if (token) {
        localStorage.setItem('member_token_uuid', token)
        router.push({ path: 'Home' })
        console.log('Token : ', token)
      } else {
        console.error('Token Not Found', response)
      }
    } else {
      console.error('Login Fail', response.data)
    }
  }).catch((error) => {
    console.error('Error Signup : ', error.response.data)
    emailError.value = error.response.data.messages.message.username
    passwordError.value = error.response.data.messages.message.password
  })
}

function register () {
  router.push({ path: 'Register' })
}

</script>

<style scoped>
h2 {
  text-align: center;
}
.registerLink {
  text-align: center;
  margin-top: 20px;
  font-size: 0.8em;
}
</style>
