<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import type {Notifica} from '@/types/notificaType';
import type {Evento} from '@/types/eventoType';
import type {Organizzatore} from '@/types/organizzatoreType';
import type {EventoConcluso} from '@/types/eventoConclusoType';

const eventiConclusi = ref<EventoConcluso[]>([]);
const eventiFuturi = ref<Evento[]>([]);
const notifiche = ref<Notifica[]>([]);
const organizzatore = ref<Organizzatore[]>([]);
const marzel = ref<Organizzatore[]>([]);

onMounted(async () => {
  try {
    eventiConclusi.value = (await axios.get('/api/homepage/eventiConclusi')).data;
    console.log(JSON.stringify(eventiConclusi.value));
    eventiFuturi.value = (await axios.get('/api/homepage/eventiFuturi')).data;
    console.log(JSON.stringify(eventiFuturi.value));
    axios.get("/api/homepage/notifiche").then(response => {
      console.log(JSON.stringify(response.data))
      notifiche.value = response.data
    })
    organizzatore.value = (await axios.get('/api/homepage/utente')).data;
    console.log(JSON.stringify(organizzatore.value));
    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <div class="main-container">
    <div class="left-section">
      <div class="profile-header">
        <img class="profile-image" src="@/assets/images/homepageImg/profilo.jpg" alt="Foto Profilo"/>
        <h3>Ciao utente!</h3>
      </div>
      <ActionCenter :marzel="marzel"/>
    </div>
    <div class="right-section">
      <div class="rounded-component">
        <NotificationCenter :notifiche="notifiche"/>
      </div>
      <div class="rounded-component">
        <!--<UpcomingEvents :eventiInProgramma="eventiInProgramma" /> -->
      </div>
      <div class="rounded-component">
        <!-- <PastEvents :eventiConclusi="eventiConclusi" /> -->
      </div>
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
