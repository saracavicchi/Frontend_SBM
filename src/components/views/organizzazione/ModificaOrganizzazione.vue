<script setup lang="ts">
import { onMounted, ref, nextTick, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Organizzazione } from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";

const route = useRoute();
const organizzazione = ref<Organizzazione | null>(null);


const idOrganizzazione = route.params.id;
console.log('idOrganizzazione:', idOrganizzazione);


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