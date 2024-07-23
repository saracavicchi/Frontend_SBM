<script setup lang="ts">

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";
import axios from "axios";

const route = useRoute();
const idOrganizzazione = route.params.id;

const organizzazione = ref<Organizzazione>();
const organizzatori = ref<Organizzatore[]>([]);

const marzel = ref<Organizzatore>();

onMounted(async () => {
  try {
    organizzazione.value = (await axios.get('/api/organizzazione/getOrganizzazione', {
      params: {
        id: idOrganizzazione
      }
    })).data;
    console.log(JSON.stringify(organizzazione.value));

    if (organizzazione.value) {
      organizzatori.value = organizzazione.value.organizzatori;
    }

    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

</script>

<template>
  <h1>Organizzazione</h1>
  <p>{{ idOrganizzazione }}</p>

  <p>{{ organizzazione?.nome }}</p>

  <div v-if="organizzatori && organizzatori.length > 0">
    <h2>Organizzatori</h2>
    <ul>
      <li v-for="organizzatore in organizzatori" :key="organizzatore.id">
        <p>{{ organizzatore.cognome }} {{ organizzatore.nome }}</p>
      </li>
    </ul>
  </div>

  <p v-if="marzel?.id === organizzazione?.admin.id">admin</p>

</template>

<style scoped>

</style>