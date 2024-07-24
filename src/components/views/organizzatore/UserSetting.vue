<template>
  <div class="container">
    <div class="header">
      <button @click="activeSection = 'anagrafica'" :class="{ active: activeSection === 'anagrafica', blur: activeSection !== 'anagrafica' }">Anagrafica</button>
      <button @click="activeSection = 'social'" :class="{ active: activeSection === 'social', blur: activeSection !== 'social' }">Social</button>
      <button @click="activeSection = 'pagamenti'" :class="{ active: activeSection === 'pagamenti', blur: activeSection !== 'pagamenti' }">Pagamenti</button>
    </div>
    <div class="content">
      <AnagraficaForm v-if="activeSection === 'anagrafica'" />
      <SocialForm v-if="activeSection === 'social'" />
      <PagamentiForm v-if="activeSection === 'pagamenti'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnagraficaForm from './AnagraficaForm.vue';
import SocialForm from './SocialForm.vue';
import PagamentiForm from './PagamentiForm.vue';

const activeSection = ref('anagrafica');
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #2553AE;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 1200px;
  height: 600px; /* Imposta un'altezza fissa per il contenitore cosi quando cambi tra le sezioni rimane uguale*/
  overflow: hidden; /* Nasconde lo scroll all'interno del contenitore */
}

.header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 40px;
}

.header button {
  background: none;
  border: none;
  color: white;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
}

.header button.active {
  font-weight: bold;
  border-bottom: 2px solid #ffffff; /*Linea sotto la sezione attiva*/
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Abilita lo scroll verticale */
  width: 100%; /* Occupa tutta la larghezza del contenitore */
}

.blur {
  filter: blur(1.5px);
  opacity: 0.6;
}
</style>
