<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";
import axios from "axios";

const route = useRoute();
const idOrganizzazione = route.params.id;

const organizzazione = ref<Organizzazione>();
const marzel = ref<Organizzatore>();

onMounted(async () => {
  try {

    await fetchOrganizzazione();

    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

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

const blurBackground = () => {
  document.querySelector('.org-main-container')?.classList.add('blur');
};

const unblurBackground = () => {
  document.querySelector('.org-main-container')?.classList.remove('blur');
};

</script>


<template>

  <div class="org-main-container">

    <ControlPanel v-if="organizzazione && marzel" :organizzazione="organizzazione" :marzel="marzel"
                  @organizzatoreAdded="fetchOrganizzazione" aria-label="Pannello di controllo organizzazione"
                  @openPopup="blurBackground"
                  @closePopup="unblurBackground"/>

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