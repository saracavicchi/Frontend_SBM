<script setup lang="ts">

import {defineProps, type PropType, ref, watch} from "vue";
import type {Organizzatore} from "@/types/organizzatoreType";
import type {Organizzazione} from "@/types/organizzazioneType";
import axios from "axios";

import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';

const props = defineProps({
  organizzazione: {
    type: Object as PropType<Organizzazione>,
    required: true
  },
  marzel: {
    type: Object as PropType<Organizzatore>,
    required: true
  }
});

const imageUrl = ref('');


watch(() => props.organizzazione, async (newVal) => {
  if (newVal && newVal.id) {
    try {
      /*
      const response = await axios.get(`/api/organizzatore/hasOrganizzazione?id=${newVal.id}`);
      if (response.data === '') {
        organizzazionePath.value = '/creaOrganizzazione';
      } else {
        organizzazionePath.value = '/organizzazione/' + response.data;
      }
      //console.log('organizzazionePath:', organizzazionePath.value);
      */

      //richiesta ad axios con parametro newVal.urlFoto, response type blob
      const response = await axios.get('/api/images/organizzazione', {params: {name: newVal.urlFoto}, responseType: 'blob'});
      imageUrl.value = URL.createObjectURL(response.data);

    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, { immediate: true });

</script>

<template>

  <img class="organizzazione-imgae" :src="imageUrl || defaultImage" alt="Foto organizzazione"/>



</template>

<script lang="ts">
export default {
  name: 'ControlPanel'
};
</script>

<style scoped>



</style>