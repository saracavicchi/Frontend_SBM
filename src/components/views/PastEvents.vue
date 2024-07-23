<script setup lang="ts">
import {defineProps, watchEffect, ref, type Ref} from 'vue';
import type { PropType} from 'vue';
import type { EventoConcluso } from '@/types/eventoConclusoType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';
import StarsRating from '@/components/views/StarsRating.vue';
import axios from "axios";
import defaultImage from '@/assets/images/homepageImg/profilo.jpg';

const props = defineProps({
  eventiConclusi: Array as PropType<EventoConcluso[]>
});

const eventiConclusiImageUrls: Ref<string[]> = ref([]);

function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
  const date = new Date(Date.parse(timestamp));
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });
}

async function fetchImage(imagePath: string) {
  try {
    const response = await axios.get(`/api/images/mockImg/${imagePath}`, { responseType: 'blob' });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Errore nel recupero dell\'immagine:', error);
    return defaultImage; // Ritorna un percorso di fallback in caso di errore
  }
}

watchEffect(() => {
  if(props.eventiConclusi){
    const imageUrlsPromises = props.eventiConclusi.map(async (evento) => {
      return fetchImage(evento.url_photo)
          .catch(error => {
            console.error('Errore nel recupero dell\'immagine:', error);
            return defaultImage; // Provide a fallback image in case of error
          });
    });

    Promise.all(imageUrlsPromises)
        .then(results => {
          eventiConclusiImageUrls.value = results;
        })
        .catch(error => {
          console.error('Errore durante il recupero delle immagini:', error);
        });
  }
});
</script>

<template>
  <section class="rounded-component" aria-labelledby="past-events" id="eventi-conclusi" role="region">
    <h2 id="past-events">
      <a href="#eventi-conclusi" aria-label="Visualizza tutti gli eventi conclusi">Eventi Conclusi</a>
    </h2>
    <ul>
      <li v-for="(evento, index) in eventiConclusi" :key="evento.id" tabindex="0" role="listitem">
        <article>
          <img class="event-img" :src="evento.url_photo ? eventiConclusiImageUrls[index] : defaultImage" :alt="`Immagine dell'evento: ${evento.nome}, inizio: ${formatTimestamp(evento.data_ora.inizio)}, fine: ${formatTimestamp(evento.data_ora.fine)}`" />
          <section class="event-info">
            <p class="event-name">{{ evento.nome }}</p>
            <section class="event-details">
              <section class="event-dates">
                <p>Inizio: {{ formatTimestamp(evento.data_ora.inizio) }}</p>
                <p>Fine: {{ formatTimestamp(evento.data_ora.fine) }}</p>
              </section>
              <StarsRating :rating="evento.stelle" />
            </section>
          </section>
        </article>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  name: 'PastEvents'
};
</script>

