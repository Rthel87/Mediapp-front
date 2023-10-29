<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACK_DIR
const questionsList = ref([])
const answers = ref([0, 0, 0, 0, 0])

const totalScore = computed(() => {
  return answers.value.reduce((a, b) => a + b)
})

onBeforeMount(async () => {
  try {
    const response = await axios.get(apiUrl +'/assignments/questions');
    questionsList.value = response.data
  } catch (e) {
    console.log(e)
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
                <input class="input" type="text" placeholder="ejemplo: Mario Castro">
              </div>
              <p class="help is-danger"></p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input class="input" type="text" placeholder="ejemplo: mario@algo.com">
              </div>
              <p class="help is-danger"></p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Ciudad:</label>
              <div class="control">
                <input class="input" type="text" placeholder="ejemplo: Validivia">
              </div>
              <p class="help is-danger"></p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">Password:</label>
              <div class="control">
                <input class="input" type="password" >
              </div>
              <p class="help is-danger"></p>
            </div>
          </div>
        </div>

        <hr>

        <section class="section">
          <h2 class="title is-3 pb-3 mb-2 has-text-dark ">Preguntas de diagnóstico:</h2>
          <p></p>

          <template v-for="(question, index) in questionsList">
            <h3 class="subtitle is-4 has-text-dark">{{ index + 1 }}.- {{ question.question }}</h3>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="1" v-model="answers[index]">
                {{ question.answerOne}}
              </label>
            </div>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="2" v-model="answers[index]">
                {{ question.answerTwo }}
              </label>
            </div>
            <div class="control">
              <label class="radio">
                <input type="radio" :name="'answer' + index" :value="3" v-model="answers[index]">
                {{ question.answerThree }}
              </label>
            </div>
          </template>
        </section>

        <div class="columns">
          <div class="column is-3 is-offset-2">
            <button class="button is-dark is-rounded is-outlined is-fullwidth" type="button">Cancelar</button>
          </div>
          <div class="column is-3 is-offset-2">
            <button class="button is-info is-rounded is-fullwidth" type="button" name="button">Continuar</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
