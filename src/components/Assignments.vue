<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import Auth from '../services/auth'
import Functions from '../services/functions'

const apiUrl = import.meta.env.VITE_BACK_DIR
const assigList = ref([])

const getAssignments = async () => {
  try {
    const response = await axios.get(apiUrl + '/assignments', { headers: Auth.authHeader() })
    assigList.value = response.data
  } catch (e) {
    console.error(e)
  }
}

const showTable = computed(() => assigList.value.length > 0)

onBeforeMount(() => {
  getAssignments()
})
</script>

<template>
  <div class="container">
    <h1 class="title is-3 my-4 pt-4 pb-6">Listado de pacientes asigandos a los profesionales</h1>

    <table v-if="showTable" class="table is-fullwidth is-bordered">
      <thead class="has-background-info-light">
        <tr>
          <th class="has-text-centered"><abbr title="Nombre del profesional">Profesional</abbr></th>
          <th class="has-text-centered">Pacientes</th>
          <th class="has-text-centered">Fecha de asignación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="professional in assigList">
          <td class="has-text-centered is-vcentered">{{ professional.name }}</td>
          <td>
            <ul v-for="patient in professional.Patients">
              <li class="has-text-centered">{{ patient.User.name }}</li>
            </ul>
          </td>
          <td>
            <ul v-for="patient in professional.Patients">
              <li class="has-text-centered">{{ Functions.extractDate(patient.PatientsProfessionals.createdAt) }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 v-else class="subtitle is-4">No se han realizado asignaciones</h2>
  </div>
</template>
