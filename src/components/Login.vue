<script setup>

</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" placeholder="direccion@ejemplo.com">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4 is-offset-1">
        <a class="button is-rounded is-outlined is-fullwidth is-info my-3" href="#">Cancelar</a>
      </div>
      <div class="column is-4 is-offset-2">
        <a class="button is-rounded is-primary is-fullwidth my-3" href="#">Ingresar</a>
      </div>
    </div>
  </div>
</template>
