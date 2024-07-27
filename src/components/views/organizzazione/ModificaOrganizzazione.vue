<script setup lang="ts">
import { onMounted, ref, nextTick, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Organizzazione } from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";

const route = useRoute();

// Stato reattivo per l'organizzazione
const organizzazione = ref<Organizzazione | null>(null);

// Estrae l'ID dell'organizzazione dai parametri della rotta
const idOrganizzazione = route.params.id;
console.log('idOrganizzazione:', idOrganizzazione);

// Effettua il recupero dei dati dell'organizzazione ogni volta che la rotta cambia
watchEffect(async () => {
  try {
    const response = await axios.get('/api/organizzazione/getOrganizzazione', {
      params: { id: route.params.id }
    });
    organizzazione.value = response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <!-- Visualizza il modulo di modifica solo se l'organizzazione è stata caricata -->
  <ModificaForm v-if="organizzazione" :organizzazione="organizzazione" />
</template>

<script lang="ts">
import ModificaForm from "@/components/views/organizzazione/ModificaForm.vue";

export default {
  components: {
    ModificaForm
  }
};
</script>

<style scoped>
</style>