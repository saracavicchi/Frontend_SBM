<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import type { Notifica } from '@/types/notificaType';
import type { Evento } from '@/types/eventoType';
import type { EventoConcluso } from '@/types/eventoConclusoType';
import type { Organizzatore } from '@/types/organizzatoreType';



// Definizione di un singolo oggetto reattivo per lo stato della pagina
const state = reactive({
  eventiConclusi: [] as EventoConcluso[],
  eventiFuturi: [] as Evento[],
  notifiche: [] as Notifica[],
  organizzatore: null as Organizzatore | null
});

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
  <div class="main-container">
    <div class="left-section">
      <div class="profile-header">
        <img class="profile-image" src="@/assets/images/homepageImg/profilo.jpg" alt="Foto Profilo" />
        <h3 v-if="state.organizzatore">Ciao {{ state.organizzatore.nome }} {{ state.organizzatore.cognome }}</h3>
      </div>
      <ActionCenter />
    </div>
    <div class="right-section">
      <NotificationCenter :notifiche="state.notifiche" />
      <UpcomingEvents :eventiFuturi="state.eventiFuturi" />
      <PastEvents :eventiConclusi="state.eventiConclusi" />
    </div>
  </div>
</template>

<script lang="ts">
import ActionCenter from '@/components/views/ActionCenter.vue';
import NotificationCenter from '@/components/views/NotificationCenter.vue';
import UpcomingEvents from '@/components/views/UpcomingEvents.vue';
import PastEvents from '@/components/views/PastEvents.vue';

export default {
  components: {
    ActionCenter,
    NotificationCenter,
    UpcomingEvents,
    PastEvents
  }
};
</script>
