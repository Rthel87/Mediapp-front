<script setup>
const props = defineProps(['msg', 'show'])

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
                <p class="title is-5">{{ msg }}</p>
              </div>
            </div>
            <div class="columns">
              <div class="column is-3 is-offset-2">
                <button class="button is-rounded is-dark is-outlined is-fullwidth" type="button" @click="$emit('close')">Cancelar</button>
              </div>
              <div class="column is-2"></div>
              <div class="column is-3">
                <button class="button is-rounded is-danger is-fullwidth" type="button" @click="$emit('acepted')">Aceptar</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <button class="modal-close" area-label="close" @click="$emit('close')"></button>
  </div>
</template>
