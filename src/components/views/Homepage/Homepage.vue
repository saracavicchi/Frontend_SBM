<script setup lang="ts">
// Importazioni necessarie da Vue e Axios, oltre ai tipi definiti dall'utente
import {reactive, onMounted, ref, watchEffect} from 'vue';
import axios from 'axios';
import type { Notifica } from '@/types/notificaType';
import type { Evento } from '@/types/eventoType';
import type { EventoConcluso } from '@/types/eventoConclusoType';
import type { Organizzatore } from '@/types/organizzatoreType';
import defaultImage from '@/assets/images/homepageImg/profilo.jpg';

// Stato reattivo della pagina, contenente eventi conclusi, futuri, notifiche e informazioni sull'organizzatore
const state = reactive({
  eventiConclusi: [] as EventoConcluso[],
  eventiFuturi: [] as Evento[],
  notifiche: [] as Notifica[],
  organizzatore: null as Organizzatore | null
});

// Variabile reattiva per gestire l'URL dell'immagine del profilo
const profileImageUrl = ref('');

// Funzione per recuperare l'immagine del profilo tramite una richiesta HTTP
async function fetchImage(imagePath: string) {
  try {
    const response = await axios.get(`/api/images/organizzatore?name=${encodeURIComponent(imagePath)}`, { responseType: 'blob' });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Errore nel recupero dell\'immagine:', error);
    return defaultImage; // Ritorna un percorso di fallback in caso di errore
  }
}

// Per visualizzare l'immagine del profilo dell'organizzatore
watchEffect(() => {
  (async () => {
    if (state.organizzatore && state.organizzatore.urlFoto) {
      console.log(state.organizzatore.urlFoto);
      console.log("Ciao ciao")
      const imageName = state.organizzatore.urlFoto;
      profileImageUrl.value = await fetchImage(imageName);
    } else {
      import('@/assets/images/homepageImg/profilo.jpg').then((module) => {
        profileImageUrl.value = module.default;
      });
    }
  })();
});

// Funzione eseguita al montaggio del componente per recuperare dati degli eventi e notifiche
onMounted(async () => {
  try {
    const eventiConclusiResponse = await axios.get('/api/homepage/eventiConclusi');
    state.eventiConclusi = eventiConclusiResponse.data;
    console.log(JSON.stringify(state.eventiConclusi));

    const eventiFuturiResponse = await axios.get('/api/homepage/eventiFuturi');
    state.eventiFuturi = eventiFuturiResponse.data;
    console.log(JSON.stringify(state.eventiFuturi));

    const notificheResponse = await axios.get("/api/homepage/notifiche");
    state.notifiche = notificheResponse.data;
    console.log(JSON.stringify(state.notifiche));

    const organizzatoreResponse = await axios.get('/api/homepage/utente');
    state.organizzatore = organizzatoreResponse.data;
    console.log(JSON.stringify(state.organizzatore));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <div class="container">

    <!-- Sezione sinistra contenente il profilo dell'organizzatore e il centro azioni -->
    <section class="left-section" aria-labelledby="left-header" role="main">
      <h2 id="left-header" class="visually-hidden">Profilo Organizzatore e Centro Azioni</h2>

      <!-- Intestazione del profilo con immagine e nome dell'organizzatore -->
      <section class="profile-header">
        <img class="profile-image" v-if="state.organizzatore" :src="profileImageUrl" alt="Foto Profilo" />
        <h3 v-if="state.organizzatore">Ciao {{ state.organizzatore.nome }} {{ state.organizzatore.cognome }}!</h3>
      </section>

      <!-- Centro azioni per l'organizzatore loggato -->
      <ActionCenter v-if="state.organizzatore" :orgLoggato="state.organizzatore"/>
    </section>

    <!-- Sezione destra contenente notifiche ed eventi -->
    <aside class="right-section" id="right-section" aria-labelledby="aside-header">
      <h2 id="aside-header" class="visually-hidden">Notifiche e Eventi</h2>
      <NotificationCenter :notifiche="state.notifiche" />
      <UpcomingEvents :eventiFuturi="state.eventiFuturi" />
      <PastEvents :eventiConclusi="state.eventiConclusi" />
    </aside>
  </div>
</template>

<script lang="ts">
// Importazione dei componenti utilizzati nella homepage
import ActionCenter from '@/components/views/Homepage/ActionCenter.vue';
import NotificationCenter from '@/components/views/Homepage/NotificationCenter.vue';
import UpcomingEvents from '@/components/views/Homepage/UpcomingEvents.vue';
import PastEvents from '@/components/views/Homepage/PastEvents.vue';

export default {
  components: {
    ActionCenter,
    NotificationCenter,
    UpcomingEvents,
    PastEvents
  }
};
</script>

<style>
@import '@/assets/css/Homepage.css';
</style>