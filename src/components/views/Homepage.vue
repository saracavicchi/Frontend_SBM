<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const eventiConclusi = ref([]);
const eventiInProgramma = ref([]);
const notifiche = ref([]);
const utente = ref({});

onMounted(async () => {
  try {
    //eventiConclusi.value = (await axios.get('/api/eventi/conclusi')).data;
    //eventiInProgramma.value = (await axios.get('/api/eventi/in-programma')).data;
    notifiche.value = (await axios.get('/notifiche')).data;
    console.log()
    //utente.value = (await axios.get('/api/utente')).data;
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <main>
    <div class="main-container">
      <div class="left-section">
        <div class="profile-header">
          <img class="profile-image" src="@/assets/images/homepageImg/profilo.jpg" alt="Foto Profilo" />
          <h3>Ciao utente!</h3>
        </div>
        <ActionCenter />
      </div>
      <div class="right-section">
        <div class="rounded-component">
          <NotificationCenter :notifiche="notifiche" />
        </div>
        <div class="rounded-component">
          <!--<UpcomingEvents :eventiInProgramma="eventiInProgramma" /> -->
        </div>
        <div class="rounded-component">
          <!-- <PastEvents :eventiConclusi="eventiConclusi" /> -->
        </div>
      </div>
    </div>
  </main>
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
