<script setup>
const props = defineProps(['tabs', 'current'])

</script>

<template>
  <nav class="navbar is-link">
    <div class="container">

      <div class="navbar-brand">
        <a class="navbar-item title" href="#">MediApp</a>
      </div>
      <div class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <template v-for="tab in props.tabs">
            <a class="navbar-item" :class="tab === props.current ? 'is-active' : ''" @click="$emit('choice', tab)">{{ tab }}</a>
          </template>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <p class="control">
              <a class="button is-primary is-rounded is-inverted">Salir</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>
