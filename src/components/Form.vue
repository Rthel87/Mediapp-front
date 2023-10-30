<script setup>
import Modal from './Modal.vue'

import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACK_DIR
const emit = defineEmits(['close'])
const questionsList = ref([])
const professionalsList = ref([])
const assignment = ref({})
const patient = ref({
  name: '',
  email: '',
  city: '',
  password: ''
})
const answers = ref([0, 0, 0, 0, 0])
const errors = ref({
  name: false,
  email: false,
  city: false,
  password: false,
  answers: [false, false, false, false, false]
})
const showModal = ref(false)
const modalMsg = 'Asignación de profesional:'

const totalScore = computed(() => {
  return answers.value.reduce((a, b) => a + b)
})

const withoutQuest = computed(() => questionsList.value.length === 0)
const withoutProf = computed(() => professionalsList.value.length === 0)

const resetForm = () => {
  patient.value = {...{name: '', email: '', city: '', password: ''}}
  answers.value = [0, 0, 0, 0, 0]
  assignment.value = {}
}

const closeForm = () => {
  resetForm()
  emit('close')
}

const isValidAnswer = () => {
  let errorAnswers = [...errors.value.answers]
  const zeroIndex = answers.value.indexOf(0)
  if (zeroIndex > -1) {
    errorAnswers[zeroIndex] = true
    errors.value.answers = errorAnswers
  }
  return zeroIndex < 0
}

const isValidForm = () => {
  let valid = true
  errors.value.name = patient.value.name === ''
  errors.value.email = patient.value.email === ''
  errors.value.city = patient.value.city === ''
  errors.value.password = patient.value.password === ''
  valid = valid && !errors.value.name
  valid = valid && !errors.value.email
  valid = valid && !errors.value.city
  valid = valid && !errors.value.password
  return isValidAnswer() && valid
}

const resetValidity = () => {
  errors.value = {
    name: false,
    email: false,
    city: false,
    password: false,
    answers: [false, false, false, false, false]
  }
}

const getAssignment = () => {
  if (isValidForm()) {
    if (totalScore.value < 8) {
      assignment.value = professionalsList.value.filter(x => x.level === 1)[0]
    } else if (totalScore.value >= 8 && totalScore.value < 11) {
      assignment.value = professionalsList.value.filter(x => x.level === 2)[0]
    } else if (totalScore.value >= 11 && totalScore.value <= 13) {
      assignment.value = professionalsList.value.filter(x => x.level === 3)[0]
    } else {
      assignment.value = professionalsList.value.filter(x => x.level === 4)[0]
    }
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  assignment.value = {}
}

const sendAssignment = async () => {
  try {
    const data = {
      patient: {...patient.value},
      professional: {...assignment.value}
    }
    const response = await axios.post(apiUrl + '/public/assignment', data)
    closeModal()
    closeForm()
  } catch (e) {
    console.error(e)
  }
}

onBeforeMount(async () => {
  if (withoutQuest) {
    try {
      const response = await axios.get(apiUrl +'/public/questions');
      questionsList.value = response.data
    } catch (e) {
      console.log(e)
    }
  }
  if (withoutProf) {
    try {
      const newResponse = await axios.get(apiUrl + '/public/professionals');
      professionalsList.value = newResponse.data
    } catch (e) {
      console.log(e)
    }
  }
})
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">

        <h1 class="has-text-dark subtitle is-3">Bienvenido</h1>
        <p>Por favor, ingrese sus datos:</p>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label class="label">Nombre:</label>
              <div class="control">
                <input class="input" :class="errors.name ? 'is-danger' : ''" v-model="patient.name" @input="resetValidity" type="text" placeholder="ejemplo: Mario Castro">
              </div>
              <p v-if="errors.name" class="help is-danger">No se ha ingresado el nombre del paciente</p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input class="input" :class="errors.email ? 'is-danger' : ''" v-model="patient.email" @input="resetValidity" type="email" placeholder="ejemplo: mario@algo.com">
              </div>
              <p v-if="errors.email" class="help is-danger">No se ha ingresado el correo electrónico</p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Ciudad:</label>
              <div class="control">
                <input class="input" :class="errors.city ? 'is-danger' : ''" v-model="patient.city" @input="resetValidity" type="text" placeholder="ejemplo: Validivia">
              </div>
              <p v-if="errors.city" class="help is-danger">No se ha ingresado la ciudad del paciente</p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Password:</label>
              <div class="control">
                <input class="input" :class="errors.password ? 'is-danger' : ''" v-model="patient.password" @input="resetValidity" type="password" >
              </div>
              <p v-if="errors.password" class="help is-danger">Falta ingresar una clave de acceso</p>
            </div>
          </div>
        </div>

        <hr>

        <section class="section">
          <h2 class="title is-3 pb-3 mb-2 has-text-dark ">Preguntas de diagnóstico:</h2>
          <p></p>

          <template v-for="(question, index) in questionsList">
            <h3 class="subtitle is-4" :class="errors.answers[index] ? 'has-text-danger-dark' : 'has-text-dark'">{{ index + 1 }}.- {{ question.question }}</h3>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="1" v-model="answers[index]" @input="resetValidity">
                {{ question.answerOne}}
              </label>
            </div>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="2" v-model="answers[index]" @input="resetValidity">
                {{ question.answerTwo }}
              </label>
            </div>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="3" v-model="answers[index]" @input="resetValidity">
                {{ question.answerThree }}
              </label>
            </div>
            <p v-if="errors.answers[index]" class="help is-danger">No se ha respondido esta pregunta</p>
          </template>
        </section>

        <div class="columns">
          <div class="column is-3 is-offset-2">
            <button class="button is-dark is-rounded is-outlined is-fullwidth" type="button" @click="closeForm">Cancelar</button>
          </div>
          <div class="column is-3 is-offset-2">
            <button class="button is-info is-rounded is-fullwidth" type="button" name="button" @click="getAssignment">Continuar</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <Modal :show="showModal" :msg="modalMsg" :extra-msg="assignment.name" @close="closeModal" @acepted="sendAssignment" />

</template>
