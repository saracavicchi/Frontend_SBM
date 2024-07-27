<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";
import axios from "axios";

const route = useRoute();

// Estrae l'ID dell'organizzazione dai parametri della rotta
const idOrganizzazione = route.params.id;

// Stato reattivo per l'organizzazione e l'organizzatore
const organizzazione = ref<Organizzazione>();
const marzel = ref<Organizzatore>();

// Funzione eseguita al montaggio del componente per recuperare i dati dell'organizzazione e dell'organizzatore
onMounted(async () => {
  try {

    // Recupera i dati dell'organizzazione
    await fetchOrganizzazione();

    // Recupera i dati dell'organizzatore
    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

// Funzione per recuperare i dati dell'organizzazione dal server
const fetchOrganizzazione = async () => {
  try {
    organizzazione.value = (await axios.get('/api/organizzazione/getOrganizzazione', {
      params: {
        id: idOrganizzazione
      }
    })).data;
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
};

// Funzione per applicare l'effetto di sfocatura allo sfondo
const blurBackground = () => {
  document.querySelector('.org-main-container')?.classList.add('blur');
};

// Funzione per rimuovere l'effetto di sfocatura dallo sfondo
const unblurBackground = () => {
  document.querySelector('.org-main-container')?.classList.remove('blur');
};

</script>


<template>

  <div class="org-main-container">

    <!-- Pannello di controllo dell'organizzazione, visibile solo se organizzazione e organizzatore sono caricati
          ascolta inoltre gli eventi emessi dal componenente-->
    <ControlPanel v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"
                  @organizzatoreAdded="fetchOrganizzazione" aria-label="Pannello di controllo organizzazione"
                  @openPopup="blurBackground"
                  @closePopup="unblurBackground"/>

    <!-- Gestione del team dell'organizzazione, visibile solo se organizzazione e organizzatore sono caricati
          ascolta inoltre gli eventi emessi dal componente-->
    <TeamManagement v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"
                    aria-label="Team management organizzazione"
                    @openPopup="blurBackground"
                    @closePopup="unblurBackground"/>

  </div>

</template>

<script lang="ts">

import ControlPanel from "@/components/views/organizzazione/ControlPanel.vue";
import TeamManagement from "@/components/views/organizzazione/TeamManagement.vue";

export default {
  components: {
    ControlPanel,
    TeamManagement
  }
};
</script>

<style scoped>

.org-main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 100vw;
  max-height: 70vh;
}

.blur {
  filter: blur(4px);
}

</style>