<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import Auth from '../services/auth'
import Functions from '../services/functions'

const apiUrl = import.meta.env.VITE_BACK_DIR
const patientInfo = ref({})
let user = {}

const showTable = computed(() => {
  return Object.keys(patientInfo.value).length > 0 && patientInfo.value.Patient.Professionals.length > 0
})

const getUser = () => {
  const cookie = Auth.getCookie('userLogged')
  const values = cookie.split(';', 4)
  const keys = ['id', 'name', 'email', 'RoleId']
  let objArray = []
  keys.forEach((key, index) => {
    objArray.push([key, values[index]])
  })
  const entries = new Map(objArray)
  user = Object.fromEntries(entries)
}

const getProfessionals = async () => {
  try {
    const response = await axios.get(apiUrl + '/assignments/' + user.id, { headers: Auth.authHeader() })
    patientInfo.value = response.data
  } catch (e) {
    console.error(e)
  }
}

onBeforeMount(() => {
  getUser()
  getProfessionals()
})

</script>

<template>
  <div class="container">
    <h1 class="title is-3 my-4 pb-6">Profesionales asignados según diagnósticos</h1>

    <table v-if="showTable" class="table is-fullwidth is-bordered">
      <thead class="has-background-info-light">
        <tr>
          <th class="has-text-centered">Profesional</th>
          <th class="has-text-centered">Fecha de diagnóstico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="professional in patientInfo.Patient.Professionals">
          <td class="has-text-centered">{{ professional.name }}</td>
          <td class="has-text-centered">{{ Functions.extractDate(professional.PatientsProfessionals.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
