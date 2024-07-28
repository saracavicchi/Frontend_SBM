<template>
  <div class="form-container">
    <form>
      <div class="form-group">
        <label for="partitaIva">Numero Partita IVA</label>
        <input type="text" id="partitaIva" v-model="formData.partitaIva" />
      </div>
      <div class="form-group">
        <label for="iban">Iban</label>
        <input type="text" id="iban" v-model="formData.iban" />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" id="nome" v-model="formData.nome" />
      </div>
      <div class="form-group">
        <label for="cognome">Cognome</label>
        <input type="text" id="cognome" v-model="formData.cognome" />
      </div>
      <div class="form-group">
        <label for="numeroCarta">Numero Carta</label>
        <input type="text" id="numeroCarta" v-model="formData.numeroCarta" />
      </div>
      <div class="form-group">
        <label for="dataScadenza">Data Scadenza</label>
        <input type="text" id="dataScadenza" v-model="formData.dataScadenza" />
      </div>
      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="formData.cvv" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
    default: () => ({
      partitaIva: '',
      iban: '',
      nome: '',
      cognome: '',
      numeroCarta: '',
      dataScadenza: '',
      cvv: ''
    })
  }
});
</script>



<style scoped>
/* Stile per il contenitore del form */
.form-container {
  padding: 20px;
  border-radius: 15px;
  background-color: #2553AE; /* Colore di sfondo del form */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

/* Layout a due colonne */
.form-row {
  display: flex;
  justify-content: space-between;
}

.form-column {
  width: 45%; /* Regola la larghezza delle colonne */
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
