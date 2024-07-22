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

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

</script>

<template>
  <main>
    <h1>Organizzazione</h1>
    <p>{{ idOrganizzazione }}</p>

    <p>{{ organizzazione?.nome }}</p>

    <div v-if="organizzatori && organizzatori.length > 0">
      <h2>Organizzatori</h2>
      <ul>
        <li v-for="organizzatore in organizzatori" :key="organizzatore.id">
          <p>{{ organizzatore.nome }} {{ organizzatore.cognome }}</p>
        </li>
      </ul>
    </div>

  </main>
</template>

<style scoped>

</style>