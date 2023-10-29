<script setup>
import Login from './Login.vue'
import Form from './Form.vue'

import { ref } from 'vue'

const viewInit = ref(true)
const viewForm = ref(false)
const viewLogin = ref(false)
const navTabs = ['Inicio', 'Ingresar']
const currentTab = ref(navTabs[0])

const restart = () => {
  viewForm.value = false
  viewLogin.value = false
  viewInit.value = true
  currentTab.value = navTabs[0]
}

const showLogin = () => {
  viewLogin.value = true
  viewInit.value = false
  viewForm.value = false
  currentTab.value = navTabs[1]
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
            <a class="navbar-item title" @click="restart">MediApp</a>
            <span class="nabvar-burger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" :class="currentTab === navTabs[0] ? 'is-active' : ''" @click="restart">Inicio</a>
              <a class="navbar-item" :class="currentTab === navTabs[1] ? 'is-active' : ''" @click="showLogin">Ingresar</a>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body">
      <div class="container">
        <div v-if="viewInit" class="columns">
          <div class="column is-half is-offset-one-quarter">
            <a class="button is-info is-large is-fullwidth is-inverted" href="#" @click="showForm">Solicitar asistencia médica</a>
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
