<script setup>
import Login from './Login.vue'
import Form from './Form.vue'

import { ref } from 'vue'

const viewInit = ref(true)
const viewForm = ref(false)
const viewLogin = ref(false)

const restart = () => {
  viewForm.value = false
  viewLogin.value = false
  viewInit.value = true
}

const showLogin = () => {
  viewLogin.value = true
  viewInit.value = false
  viewForm.value = false
}

const showForm = () => {
  viewForm.value = true
  viewInit.value = false
  viewLogin.value = false
}

</script>

<template>
  <section class="hero is-link is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item title">MediApp</a>
            <span class="nabvar-burger">
              <span></span>
            </span>
          </div>
          <div class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active" @click="restart">Inicio</a>
              <a class="navbar-item" @click="showLogin">Ingresar</a>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body">
      <div class="container">
        <div v-if="viewInit" class="columns">
          <div class="column is-half is-offset-one-quarter">
            <a class="button is-info is-large is-fullwidth" href="#" @click="showForm">Solicitar asistencia médica</a>
          </div>
        </div>
        <template v-if="viewLogin">
          <Login @cancel="restart" />
        </template>
        <template v-if="viewForm">
          <Form />
        </template>
      </div>
    </div>

  </section>
</template>
