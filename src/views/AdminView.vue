<script setup>
import Navbar from '../components/Navbar.vue'
import Professionals from '../components/Professionals.vue'
import Questions from '../components/Questions.vue'
import Assignments from '../components/Assignments.vue'

import { ref } from 'vue'

const navTabs = ['Profesionales', 'Preguntas', 'Asignaciones']
const currentTab = ref(navTabs[0])

const setTab = (newTab) => {
  currentTab.value = newTab
}

</script>

<template>
  <Navbar :tabs="navTabs" :current="currentTab" @choice="setTab" />
  <Questions v-if="currentTab === navTabs[1]" />
  <Assignments v-else-if="currentTab === navTabs[2]" />
  <Professionals v-else />
</template>
