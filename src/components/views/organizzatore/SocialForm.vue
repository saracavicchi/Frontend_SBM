<template>
  <div class="form-container">
    <form>
      <div class="form-row">
        <div class="form-column">
          <div class="form-group">
            <label for="facebook">Link Facebook</label>
            <input type="url" id="facebook" name="facebook" />
          </div>
          <div class="form-group">
            <label for="instagram">Link Instagram</label>
            <input type="url" id="instagram" name="instagram" />
          </div>
        </div>
        <div class="form-column">
          <div class="form-group">
            <label for="linkedin">Link LinkedIn</label>
            <input type="url" id="linkedin" name="linkedin" />
          </div>
          <div class="form-group">
            <label for="tiktok">Link TikTok</label>
            <input type="url" id="tiktok" name="tiktok" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Puoi aggiungere logica qui se necessario
</script>

<style scoped>
.form-container {
  padding: 20px;
  border-radius: 15px;
  background-color: #2553AE; /* Colore di sfondo del form */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-column {
  width: 45%; /* Regola la larghezza delle colonne come preferisci */
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.form-group label {
  margin-bottom: 10px;
  color: #ffffff;
}

.form-group input {
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 10px; /* Bordi arrotondati */
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #2553AE;
}
</style>
