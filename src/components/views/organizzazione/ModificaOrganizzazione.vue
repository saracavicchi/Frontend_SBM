<script setup lang="ts">
import { onMounted, ref, nextTick, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Organizzazione } from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";

// Ottiene il parametro id dalla route corrente
const route = useRoute();
const organizzazione = ref<Organizzazione | null>(null);

const idOrganizzazione = route.params.id;
console.log('idOrganizzazione:', idOrganizzazione);

// Effettua una richiesta API per ottenere i dati dell'organizzazione
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
  <!-- Mostra il componente ModificaForm se i dati dell'organizzazione sono disponibili -->
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