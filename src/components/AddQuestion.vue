<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import Auth from '../services/auth'

const props = defineProps(['forEdit', 'question', 'count'])
const emit = defineEmits(['newQuest', 'updateQuest', 'close'])
const apiUrl = import.meta.env.VITE_BACK_DIR
let questionSet = {
  question: '',
  answerOne: '',
  answerTwo: '',
  answerThree: ''
}
const errorMsg = 'No se ha ingresado esta respuesta'

const errors = ref({
  question: false,
  answerOne: false,
  answerTwo: false,
  answerThree: false
})

const formDisabled = computed(() => {
  return !props.forEdit && props.count === 5
})

const resetQuest = () => {
  questionSet = { ...questionSet, ...{question: '', answerOne: '', answerTwo: '', answerThree: ''}}
}

const resetValidity = () => {
  errors.value = { ...errors.value, ...{question: false, answerOne: false, answerTwo: false, answerThree: false}}
}

const resetForm = () => {
  resetQuest()
  resetValidity()
  emit('close')
}

const isValidQuestion = () => {
  return questionSet.question !== ''
}

const isValidAnswerOne = () => {
  return questionSet.answerOne !== ''
}

const isValidAnswerTwo = () => {
  return questionSet.answerTwo !== ''
}

const isValidAnswerThree = () => {
  return questionSet.answerThree !== ''
}

const isValidForm = () => {
  let valid = true
  errors.value.question = errors.value.question || !isValidQuestion()
  errors.value.answerOne = errors.value.answerOne || !isValidAnswerOne()
  errors.value.answerTwo = errors.value.answerTwo || !isValidAnswerTwo()
  errors.value.answerThree = errors.value.answerThree || !isValidAnswerThree()
  valid = valid && !errors.value.question
  valid = valid && !errors.value.answerOne
  valid = valid && !errors.value.answerTwo
  valid = valid && !errors.value.answerThree
  return valid
}

const sendData = async () => {
  if (isValidForm()) {
    if (props.forEdit) {
      try {
        const response = await axios.patch(apiUrl + '/questions/' + props.question.id, { questionSet }, { headers: Auth.postHeader() })
        emit('updateQuest', response.data)
        resetForm()
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        const response = await axios.post(apiUrl + '/questions', { questionSet }, { headers: Auth.postHeader() })
        emit('newQuest', response.data)
        resetForm()
      } catch (e) {
        console.error(e)
      }
    }
  }
}

onBeforeMount(() => {
  if (props.forEdit) {
    questionSet.question = props.question.question
    questionSet.answerOne = props.question.answerOne
    questionSet.answerTwo = props.question.answerTwo
    questionSet.answerThree = props.question.answerThree
  }
})

</script>

<template>
  <div class="columns is-multiline py-3 my-2">
    <div class="column is-full">

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Pregunta</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" :class="errors.question ? 'is-danger' : ''" v-model="questionSet.question" @input="resetValidity" :disabled="formDisabled" type="text" placeholder="Ingrese pregunta">
            </p>
            <p v-if="errors.question" class="help is-danger">No se ha ingresado la pregunta</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Respuestas:</label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" :class="errors.answerOne ? 'is-danger' : ''" v-model="questionSet.answerOne" @input="resetValidity" :disabled="formDisabled" type="text" placeholder="Ingrese respuesta">
              </p>
              <p class="control">
                <a class="button is-static">Puntos: 1</a>
              </p>
            </div>
            <p v-if="errors.answerOne" class="help is-danger">{{ errorMsg }}</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" :class="errors.answerTwo ? 'is-danger' : ''" v-model="questionSet.answerTwo" @input="resetValidity" :disabled="formDisabled" type="text" placeholder="Ingrese respuesta">
              </p>
              <p class="control">
                <a class="button is-static">Puntos: 2</a>
              </p>
            </div>
            <p v-if="errors.answerTwo" class="help is-danger">{{ errorMsg }}</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" :class="errors.answerThree ? 'is-danger' : ''" v-model="questionSet.answerThree" @input="resetValidity" :disabled="formDisabled" type="text" placeholder="Ingrese respuesta">
              </p>
              <p class="control">
                <a class="button is-static">Puntos: 3</a>
              </p>
            </div>
            <p v-if="errors.answerThree" class="help is-danger">{{ errorMsg }}</p>
            <p v-if="formDisabled" class="help is-danger">Alcanzado el número de preguntas requerido</p>
          </div>
        </div>
      </div>

    </div>

    <div class="column">
      <div class="columns">
        <div class="column is-2 is-offset-3">
          <button type="button" class="button is-dark is-outlined is-rounded is-fullwidth" @click="resetForm">Cancelar</button>
        </div>
        <div class="column is-2"></div>
        <div class="column is-2">
          <button type="button" class="button is-info is-rounded is-fullwidth" @click="sendData" :disabled="formDisabled">{{ props.forEdit ? 'Actualizar' : 'Agregar'}}</button>
        </div>
      </div>
    </div>

  </div>

</template>
