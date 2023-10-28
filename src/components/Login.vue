<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import Auth from '../services/auth'

const router = useRouter()

const apiUrl = import.meta.env.VITE_BACK_DIR
let auth = {
  email: '',
  password: ''
}

const redirecUser = (user) => {
  if (user.Role.range === 1) {
    router.push('admin')
  } else if (user.Role.range === 2) {
    router.push('patient')
  } else {
    router.push('/')
  }
}

const login = async () => {
  try {
    const response = await axios.post(apiUrl + '/login', auth)
    localStorage.removeItem('user_tk')
    localStorage.setItem('user_tk', response.data.jwt)
    const userData = await axios.get(apiUrl + '/user/data', { headers: Auth.authHeader() })
    redirecUser(userData.data)
    Auth.setCookie('userLogged', userString(userData.data))
    Auth.setCookie('range', userString(userData.data.Role))
  } catch (e) {

  }
}

const userString = (user) => {
  let string = ''
  const keys = Object.keys(user)
  for (let key of keys) {
    string += user[key] + ';'
  }
  return string
}

</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" placeholder="direccion@ejemplo.com" v-model="auth.email">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="auth.password">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4 is-offset-1">
        <a class="button is-rounded is-outlined is-fullwidth is-info my-3" @click="$emit('cancel')">Cancelar</a>
      </div>
      <div class="column is-4 is-offset-2">
        <a class="button is-rounded is-primary is-fullwidth my-3" @click="login">Ingresar</a>
      </div>
    </div>
  </div>
</template>
