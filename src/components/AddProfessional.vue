<script setup>
import axios from 'axios'
import { ref, computed, onBeforeMount } from 'vue'
import Auth from '../services/auth'

const props = defineProps(['forEdit', 'professional', 'levelUsed'])
const emit = defineEmits(['newProf', 'updateProf', 'close'])
const apiUrl = import.meta.env.VITE_BACK_DIR
let professional = {
  name: '',
  speciality: '',
  level: 0
}

const severityList = [
  {severity: 'Baja', level: 1},
  {severity: 'Media', level: 2},
  {severity: 'Alta', level: 3},
  {severity: 'Urgencia', level: 4}
]

const errors = ref({
  name: false,
  speciality: false,
  level: false
})

const severityOptions = computed(() => {
  if (!props.forEdit) {
    return severityList.filter(x => props.levelUsed.indexOf(x.level) === -1)
  }
  return severityList
})

const formDisabled = computed(() => severityOptions.value.length === 0)

const resetProf = () => {
  professional.name = ''
  professional.speciality = ''
  professional.level = 0
}

const resetValidity = () => {
  errors.value.name = false
  errors.value.speciality = false
  errors.value.level = false
}

const resetForm = () => {
  resetProf()
  resetValidity()
  emit('close')
}

const isValidName = () => {
  return professional.name !== ''
}

const isValidSpeciality = () => {
  return professional.speciality !== ''
}

const isValidLevel = () => {
  return professional.level !== 0
}

const isValidForm = () => {
  let valid = true
  errors.value.name = errors.value.name || !isValidName()
  errors.value.speciality = errors.value.speciality || !isValidSpeciality()
  errors.value.level = errors.value.level || !isValidLevel()
  valid = valid && !errors.value.name
  valid = valid && !errors.value.speciality
  valid = valid && !errors.value.level
  return valid
}

const sendData = async () => {
  if (isValidForm()) {
    if (props.forEdit) {
      try {
        const response = await axios.patch(apiUrl + '/professionals/' + props.professional.id, { professional }, { headers: Auth.postHeader() })
        emit('updateProf', response.data)
        resetForm()
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const response = await axios.post(apiUrl + '/professionals', { professional }, { headers: Auth.postHeader() })
        emit('newProf', response.data)
        resetForm()
      } catch (e) {
        console.error(e)
      }
    }
  }
}

onBeforeMount(() => {
  if (props.forEdit) {
    professional.name = props.professional.name
    professional.speciality = props.professional.speciality
    professional.level = props.professional.level
  }
})

</script>

<template>
  <div class="columns is-multiline py-3 my-2">
    <div class="column is-5">
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control">
          <input class="input" :class="errors.name ? 'is-danger' : ''" v-model="professional.name" @input="resetValidity" type="text" placeholder="Nombre completo" :disabled="formDisabled">
        </div>
        <p v-if="errors.name"  class="help is-danger">No se ha ingresado el nombre</p>
        <p v-if="formDisabled" class="help is-danger">Ya se encuentran agreados los profesionales por nivel de severidad</p>
      </div>
    </div>
    <div class="column is-5">
      <div class="field">
        <label class="label">Especialidad</label>
        <div class="control">
          <input class="input" :class="errors.speciality ? 'is-danger' : ''" v-model="professional.speciality" @input="resetValidity" type="text" placeholder="Nombre de la especilidad médica" :disabled="formDisabled">
        </div>
        <p v-if="errors.speciality" class="help is-danger">No se ha ingresado la especialidad</p>
      </div>
    </div>
    <div class="column is-2">
      <div class="field">
        <label class="label">Severidad</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth" :class="errors.level ? 'is-danger' : ''">
            <select v-model="professional.level" name="level" @input="resetValidity" :disabled="formDisabled">
              <template v-for="option in severityOptions">
                <option :value="option.level">{{ option.severity }}</option>
              </template>
            </select>
          </div>
        </div>
        <p v-if="errors.level" class="help is-danger">No se ha seleccionado severidad</p>
      </div>
    </div>
    <div class="column">
      <div class="columns">
        <div class="column is-2 is-offset-3">
          <button type="button" class="button is-dark is-outlined is-rounded is-fullwidth" @click="resetForm">Cancelar</button>
        </div>
        <div class="column is-2"></div>
        <div class="column is-2">
          <button type="button" class="button is-info is-rounded is-fullwidth" :disabled="formDisabled" @click="sendData">{{ props.forEdit ? 'Actualizar' : 'Agregar' }}</button>
        </div>
      </div>
    </div>
  </div>
  <hr>
</template>
