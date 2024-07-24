<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";
import axios from "axios";

const route = useRoute();
const idOrganizzazione = route.params.id;

const key = ref(0);

const organizzazione = ref<Organizzazione>();
//const organizzatori = ref<Organizzatore[]>([]);

const marzel = ref<Organizzatore>();

onMounted(async () => {
  try {
    organizzazione.value = (await axios.get('/api/organizzazione/getOrganizzazione', {
      params: {
        id: idOrganizzazione
      }
    })).data;
    console.log(JSON.stringify(organizzazione.value));

    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

</script>


<template>

  <div class="org-main-container">

    <ControlPanel v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel" @organizzatoreAdded="handleOrganizzatoreAdded"/>

    <TeamManagement v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"/>

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

</style>