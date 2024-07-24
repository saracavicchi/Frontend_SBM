<template>
  <div class="form-container">
    <form>
      <div class="form-row">
        <div class="form-column">
          <div class="form-group">
            <label for="piva">Numero di P. IVA</label>
            <input type="text" id="piva" name="piva" />
          </div>
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" />
          </div>
          <div class="form-group">
            <label for="cognome">Cognome</label>
            <input type="text" id="cognome" name="cognome" />
          </div>
        </div>
        <div class="form-column">
          <div class="form-group">
            <label for="carta">Numero di carta</label>
            <input type="text" id="carta" name="carta" />
          </div>
          <div class="form-group">
            <label for="scadenza">Data scadenza</label>
            <input type="month" id="scadenza" name="scadenza" />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" />
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
/* Stile per il contenitore del form */
.form-container {
  padding: 20px;
  border-radius: 15px;
  background-color: #2553AE; /* Colore di sfondo del form */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%; /* Assicurati che il contenitore non si estenda oltre */
}

/* Layout a due colonne */
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
