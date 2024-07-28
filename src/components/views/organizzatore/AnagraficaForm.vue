<template>
  <div class="form-container">
    <form>
      <div class="form-row">
        <div class="form-column">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="formData.nome" />
          </div>
          <div class="form-group">
            <label for="cognome">Cognome</label>
            <input type="text" id="cognome" v-model="formData.cognome" />
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="formData.email" />
          </div>
          <div class="form-group">
            <label for="data-nascita">Data di Nascita</label>
            <input type="date" id="data-nascita" v-model="formData.dataNascita" />
          </div>
          <div class="form-group">
            <label for="codice-fiscale">Codice Fiscale</label>
            <input type="text" id="codice-fiscale" v-model="formData.codiceFiscale" />
          </div>
          <div class="form-group">
            <label for="citta">Città</label>
            <input type="text" id="citta" v-model="formData.citta" />
          </div>
        </div>
        <div class="form-column">
          <div class="form-group">
            <label for="username">Nome Utente</label>
            <input type="text" id="username" v-model="formData.username" />
          </div>
          <div class="form-group">
            <label for="telefono">Numero di Telefono</label>
            <input type="tel" id="telefono" v-model="formData.telefono" />
          </div>
          <div class="form-group">
            <label for="stato">Stato</label>
            <input type="text" id="stato" v-model="formData.stato" />
          </div>
          <div class="form-group">
            <label for="provincia">Provincia</label>
            <input type="text" id="provincia" v-model="formData.provincia" />
          </div>
          <div class="form-group">
            <label for="cap">CAP</label>
            <input type="text" id="cap" v-model="formData.cap" />
          </div>
          <div class="form-group">
            <label for="via">Via</label>
            <input type="text" id="via" v-model="formData.via" />
          </div>
          <div class="form-group">
            <label for="civico">Numero Civico</label>
            <input type="text" id="civico" v-model="formData.numeroCivico" />
          </div>
        </div>
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
      nome: '',
      cognome: '',
      email: '',
      dataNascita: '',
      codiceFiscale: '',
      username: '',
      telefono: '',
      stato: '',
      citta: '',
      provincia: '',
      cap: '',
      via: '',
      numeroCivico: ''
    })
  }
});
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
