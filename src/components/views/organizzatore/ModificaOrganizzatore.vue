<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import type {Organizzatore} from "@/types/organizzatoreType";

const route = useRoute();

const idOrganizzatore = route.params.id;

const organizzatore = ref<Organizzatore | null>(null);

onMounted(async () => {
  try {

    // Recupera i dati dell'organizzazione
    await fetchOrganizzatore();
    console.log(organizzatore.value);

  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

// Funzione per recuperare i dati dell'organizzazione dal server
const fetchOrganizzatore = async () => {
  try {
    organizzatore.value = (await axios.get('/api/organizzatore/getOrganizzatore', {
      params: {
        id: idOrganizzatore
      }
    })).data;
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
};


</script>

<template>

  <ModificaOrganizzatoreForm v-if="organizzatore" :organizzatore="organizzatore" />

</template>

<script lang="ts">


import ModificaOrganizzatoreForm from "@/components/views/organizzatore/ModificaOrganizzatoreForm.vue";

export default {
  components: {
    ModificaOrganizzatoreForm
  }
};
</script>

<style scoped>

</style>