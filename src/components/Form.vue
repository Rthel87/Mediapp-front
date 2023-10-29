<script setup>

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
