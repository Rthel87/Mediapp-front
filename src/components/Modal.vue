<script setup>
import { computed } from 'vue'

const props = defineProps(['msg', 'extraMsg', 'show'])

const showExtraMsg = computed(() => !!props.extraMsg)

</script>

<template>
  <div class="modal" :class="show ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content">

      <div class="card">
        <div class="card-content">
          <div class="content">

            <div class="columns is-multiline">
              <div class="column is-full">
                <p class="title is-5" :class="!showExtraMsg ? 'has-text-centered' : 'has-text-dark'">{{ msg }}</p>
                <p v-if="showExtraMsg">
                  Se le ha pre-asignado el siguiente profesional: <strong>{{ extraMsg }}</strong>. <br><br>
                  Si está de acuerdo, presione <i>Aceptar</i> para guardar esta asignación. Para volver a revisarla, ingrese a la aplicación con la dirección de correo y clave de acceso ingresada anteriormente.
                  <br>
                  Al presionar <i>Cancelar</i>, se elimina esta asiganción.
                </p>
              </div>
            </div>
            <div class="columns">
              <div class="column is-3 is-offset-2">
                <button class="button is-rounded is-dark is-outlined is-fullwidth" type="button" @click="$emit('close')">Cancelar</button>
              </div>
              <div class="column is-2"></div>
              <div class="column is-3">
                <button class="button is-rounded is-fullwidth" :class="showExtraMsg ? 'is-success' : 'is-danger'" type="button" @click="$emit('acepted')">Aceptar</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <button class="modal-close" area-label="close" @click="$emit('close')"></button>
  </div>
</template>
