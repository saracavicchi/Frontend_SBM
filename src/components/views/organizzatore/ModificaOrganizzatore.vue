<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import type {Organizzatore} from "@/types/organizzatoreType";

const route = useRoute();

// Recupera l'id dell'organizzatore dalla route
const idOrganizzatore = route.params.id;

// Stato reattivo per l'organizzatore
const organizzatore = ref<Organizzatore | null>(null);

// Chiamata all'API per recuperare i dati dell'organizzazione
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

  <!-- Visualizza il modulo di modifica solo se l'organizzatore è stato caricato -->
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