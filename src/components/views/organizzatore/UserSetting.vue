<template>
  <div class="container">
    <div class="header">
      <div class="profile-section">
        <div class="profile-upload" @click="triggerFileUpload">
          <img :src="profilePicture" class="profile-picture" alt="">
          <input type="file" ref="fileInput" @change="uploadProfilePicture" style="display: none;">
        </div>
        <p class="profile-text">Carica foto profilo</p>
      </div>
      <div class="button-group">
        <button @click="activeSection = 'anagrafica'" :class="{ active: activeSection === 'anagrafica', blur: activeSection !== 'anagrafica' }">Anagrafica</button>
        <button @click="activeSection = 'social'" :class="{ active: activeSection === 'social', blur: activeSection !== 'social' }">Social</button>
        <button @click="activeSection = 'pagamenti'" :class="{ active: activeSection === 'pagamenti', blur: activeSection !== 'pagamenti' }">Pagamenti</button>
      </div>
      <button class="top-right-button" @click="saveData">Salva</button>
    </div>
    <div class="content">
      <AnagraficaForm v-if="activeSection === 'anagrafica'" v-model:formData="anagraficaData" />
      <SocialForm v-if="activeSection === 'social'" v-model:formData="socialData" />
      <PagamentiForm v-if="activeSection === 'pagamenti'" v-model:formData="pagamentiData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { AxiosError } from 'axios';

// Props per ricevere id organizzatore
const props = defineProps<{ organizzatoreId: number }>();

const route = useRoute();
const organizzatoreId = ref<number | null>(null);

const profilePicture = ref<string>('default-profile-picture-url');
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileUpload() {
  if (fileInput.value !== null) {
    fileInput.value.click();
  }
}

function uploadProfilePicture(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      profilePicture.value = reader.result;
    }
  };

  reader.readAsDataURL(file);
}

import AnagraficaForm from './AnagraficaForm.vue';
import SocialForm from './SocialForm.vue';
import PagamentiForm from './PagamentiForm.vue';

const activeSection = ref('anagrafica');

const anagraficaData = reactive({
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
});

const socialData = reactive({
  facebook: '',
  instagram: '',
  tiktok: '',
  linkedin: ''
});

const pagamentiData = reactive({
  partitaIva: '',
  iban: '',
  nome: '',
  cognome: '',
  numeroCarta: '',
  dataScadenza: '',
  cvv: ''
});

onMounted(() => {
  // Prendo id dalla query dell'url
  const queryId = route.query.id;
  if (queryId && !isNaN(Number(queryId))) {
    organizzatoreId.value = Number(queryId);
  }
});

async function saveData() {
  if (organizzatoreId.value === null) {
    alert('ID organizzatore non valido');
    return;
  }

  try {
    const payload = {
      anagrafica: {
        nome: anagraficaData.nome,
        cognome: anagraficaData.cognome,
        mail: anagraficaData.email,
        dataNascita: anagraficaData.dataNascita,
        codFiscale: anagraficaData.codiceFiscale,
        username: anagraficaData.username,
        telefono: anagraficaData.telefono,
        stato: anagraficaData.stato,
        provincia: anagraficaData.provincia,
        citta: anagraficaData.citta,
        cap: anagraficaData.cap,
        via: anagraficaData.via,
        numCivico: anagraficaData.numeroCivico
      },
      social: [
        {nomeSocial: 'Facebook', url: socialData.facebook},
        {nomeSocial: 'Instagram', url: socialData.instagram},
        {nomeSocial:'TikTok', url: socialData.tiktok},
        {nomeSocial: 'Linkedin', url: socialData.linkedin}
      ],
      pagamenti: {
        pIva: pagamentiData.partitaIva,
        iban: pagamentiData.iban,
        numeroCarta: pagamentiData.numeroCarta,
        dataScadenza: pagamentiData.dataScadenza,
        cvv: pagamentiData.cvv
      }
    };
    // Invio richiesta per aggiornare i dati
    await axios.put(`/api/organizzatore/aggiorna/${organizzatoreId.value}`, payload);
    alert('Dati aggiornati con successo');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Errore durante il salvataggio dei dati:', error.response?.data);
      alert('Errore durante il salvataggio dei dati' + (error.response?.data || error.message));
    } else {
      console.error('Errore sconosciuto durante aggiornamento dati:', error);
      alert('Errore sconosciuto durante aggiornamento dati: ' + error);
    }
  }
}
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
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

.button-group button:not(:last-child) {
  margin-right: 20px; /* Adjust the value as needed */
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Abilita lo scroll verticale */
  width: 100%; /* Occupa tutta la larghezza del contenitore */
}

.blur { /*blur delle sezioni non attive*/
  filter: blur(1.5px);
  opacity: 0.6;
}



.top-right-button {
  margin-left: auto;
  position: relative;
  top: -10px;
  background-color: #4CAF50;
  color: white;
  padding: 20px 20px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.top-right-button:hover {
  background-color: blue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}

.profile-upload {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
