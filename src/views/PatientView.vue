<script setup>
import Navbar from '../components/Navbar.vue'
import Patient from '../components/Patient.vue'

import { ref } from 'vue'

const navTabs = ['Asignaciones']
const currentTab = ref(navTabs[0])

const setTab = (newTab) => {
  currentTab.value = newTab
}

</script>

<template>
  <Navbar :tabs="navTabs" :current="currentTab" @choice="setTab" />
  <Patient v-if="currentTab === navTabs[0]" />
</template>
