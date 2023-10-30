<script setup>
import AddQuestion from './AddQuestion.vue'
import Modal from './Modal.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Auth from '../services/auth'

const apiUrl = import.meta.env.VITE_BACK_DIR
const questionsList = ref([])
const showForm = ref(false)
const showModal = ref(false)
let modalMsg = '¿Confirma eliminación de la pregunta seleccionada?'
let idForDelete = 0
let update = false
let toEdit = {}

const showList = computed(() => {
  return questionsList.value.length > 0
})

const questionCount = computed(() => questionsList.value.length)

const getQuestions = async () => {
  try {
    const response = await axios.get(apiUrl + '/questions', { headers: Auth.authHeader() })
    questionsList.value = response.data
  } catch (e) {
    console.error(e)
  }
}

const addQuestion = (question) => {
  questionsList.value.push(question)
}

const showConfirm = (id) => {
  showModal.value = true
  idForDelete = id
}

const closeModal = () => {
  showModal.value = false
  idForDelete = 0
}

const removeQuestion = async (id) => {
  try {
    const response = await axios.delete(apiUrl + '/questions/' + id, { headers: Auth.postHeader() })
    let deleted = response.data
    questionsList.value = questionsList.value.filter(x => x.id !== deleted.id)
  } catch (e) {
    console.error(e)
  }
  closeModal()
}

const edit = (question) => {
  update = true
  toEdit = question
  showForm.value = !showForm.value
}

const updateQuestion = (question) => {
  questionsList.value = questionsList.value.filter(x => x.id !== question.id)
  questionsList.value.push(question)
  update = false
  toEdit = {}
}

const closeForm = () => {
  showForm.value = !showForm.value
  update = false
  toEdit = {}
}

onMounted(() => {
  getQuestions()
})

</script>

<template>
  <div class="container">

    <AddQuestion v-if="showForm"
      :for-edit="update"
      :question="toEdit"
      :count="questionCount"
      @new-quest="addQuestion"
      @update-quest="updateQuestion"
      @close="closeForm"
    />

    <div v-else class="columns py-3 my-2">
      <div class="column is-3 is-offset-9">
        <button class="button is-rounded is-primary" type="button" name="button" @click="showForm = !showForm">Agregar pregunta</button>
      </div>
    </div>

    <table class="table is-bordered is-hoverable is-fullwidth" v-if="showList">
      <thead>
        <tr>
          <th class="has-text-centered">N°</th>
          <th class="has-text-centered">Pregunta</th>
          <th class="has-text-centered">Respuestas</th>
          <th class="has-text-centered"><abbr title="Para cálculo de severidad">Puntos</abbr></th>
          <th class="has-text-centered">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questionsList">
          <th class="has-text-centered is-vcentered">{{ index + 1 }}</th>
          <th class="is-vcentered"><a @click="edit(question)">{{ question.question }}</a></th>
          <td>
            <ol class="pl-4">
              <li>{{ question.answerOne }}</li>
              <li>{{ question.answerTwo }}</li>
              <li>{{ question.answerThree }}</li>
            </ol>
          </td>
          <td class="has-text-centered">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </td>
          <td class="has-text-centered is-vcentered">
            <a @click="showConfirm(question.id)">
              <span class="icon"><i class="fa fa-remove"></i></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="subtitle is-4 my-3 pl-4">No se han agregado preguntas</p>

    <Modal :msg="modalMsg" :show="showModal" @close="closeModal" @acepted="removeQuestion(idForDelete)" />

  </div>
</template>
