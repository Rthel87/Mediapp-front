<script setup>
import AddProfessional from './AddProfessional.vue'
import Modal from './Modal.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Auth from '../services/auth'

const apiUrl = import.meta.env.VITE_BACK_DIR
const professionalList = ref([])
const showModal = ref(false)
let modalMsg = '¿Confirma eliminación del profesional seleccionado?'
let idForDelete = 0

const showList = computed(() => {
  return professionalList.value.length > 0
})

const getProfessionals = async () => {
  const response = await axios.get(apiUrl + '/professionals', { headers: Auth.authHeader() })
  professionalList.value = response.data
}

const addProfessional = (professional) => {
  professionalList.value.push(professional)
}

const showConfirm = (id) => {
  showModal.value = true
  idForDelete = id
}

const closeModal = () => {
  showModal.value = false
  idForDelete = 0
}

const removeProfessional = async (id) => {
  try {
    const response = await axios.delete(apiUrl + '/professionals/' + id, { headers: Auth.authHeader() })
    let deleted = response.data
    professionalList.value = professionalList.value.filter(x => x.id !== deleted.id)
  } catch (e) {
    console.error(e)
  }
  closeModal()
}

onMounted(() => {
  getProfessionals()
})

</script>

<template>
  <div class="container">

    <AddProfessional @new-prof="addProfessional" />

    <table class="table is-bordered is-hoverable is-fullwidth" v-if="showList">
      <thead>
        <tr>
          <th class="has-text-centered"><abbr title="Nombre Completo">Nombre</abbr></th>
          <th class="has-text-centered">Especialidad</th>
          <th class="has-text-centered"><abbr title="Nivel de severidad">Nivel</abbr></th>
          <th class="has-text-centered">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="professional in professionalList">
          <td>{{ professional.name }}</td>
          <td>{{ professional.speciality }}</td>
          <td class="has-text-centered">{{ professional.level }}</td>
          <td class="has-text-centered">
            <a @click="showConfirm(professional.id)">
              <span class="icon"><i class="fa fa-remove"></i></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="subtitle is-4 my-3 pl-4">No se han agregado profesionales</p>

    <Modal :msg="modalMsg" :show="showModal" @close="closeModal()" @acepted="removeProfessional(idForDelete)" />

  </div>
</template>
