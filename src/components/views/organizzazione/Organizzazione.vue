<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";
import axios from "axios";

const route = useRoute();
const idOrganizzazione = route.params.id;

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

    /*
    if (organizzazione.value) {
      organizzatori.value = organizzazione.value.organizzatori;
    }
     */

    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

</script>


<template>

  <div class="org-main-container">

    <section class="control-panel">
      <ControlPanel v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"/>
    </section>

    <section class="team-management">
      <TeamManagement v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"/>
    </section>

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
  overflow: auto;
}


.control-panel {
  max-height: 30vh;
  position: sticky;
  top: 0;
  background-color: #007BFF;
  z-index: 1;
  width: 100%;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.team-management {
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 40px;
  column-gap: 10%;
  row-gap: 10%;
}

@media (max-width: 768px) {
  .team-management {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .team-management {
    grid-template-columns: repeat(1, 1fr);
  }
}


</style>