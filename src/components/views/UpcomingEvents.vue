<script setup lang="ts">
// Importazione delle funzioni necessarie da Vue e date-fns-tz, dei tipi definiti dall'utente e dell'immagine di default
import {defineProps, ref, watchEffect} from 'vue';
import type { PropType, Ref } from 'vue';
import type { Evento } from '@/types/eventoType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';
import axios from 'axios';
import defaultImage from '@/assets/images/homepageImg/profilo.jpg';

// Definisce le props del componente, specificando che accetta un array di eventi futuri
const props = defineProps({
  eventiFuturi: Array as PropType<Evento[]>
});

// Definisce una variabile reattiva per memorizzare gli URL delle immagini degli eventi futuri
const eventiFuturiImageUrls: Ref<string[]> = ref([]);

// Funzione per formattare i timestamp in una stringa leggibile, considerando il fuso orario
function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
  const date = new Date(Date.parse(timestamp));
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });
}

// Funzione asincrona per recuperare l'URL dell'immagine di un evento tramite una richiesta HTTP
async function fetchImage(imagePath: string) {
  try {
    const response = await axios.get(`/api/images/mock?name=${encodeURIComponent(imagePath)}`, { responseType: 'blob' });
    const imageUrl = URL.createObjectURL(response.data);
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Errore nel recupero dell\'immagine:', error);
    return defaultImage; // Ritorna un percorso di fallback in caso di errore
  }
}

// Per visualizzare le foto degli eventi futuri
watchEffect(() => {
  if(props.eventiFuturi){
    const imageUrlsPromises = props.eventiFuturi.map(async (evento) => {
      return fetchImage(evento.url_photo)
          .catch(error => {
            console.error('Errore nel recupero dell\'immagine:', error);
            return defaultImage;
          });
    });

    Promise.all(imageUrlsPromises)
        .then(results => {
          eventiFuturiImageUrls.value = results;
        })
        .catch(error => {
          console.error('Errore durante il recupero delle immagini:', error);
        });
  }
});
</script>

<template>
  <section aria-labelledby="upcoming-events" id="eventi-in-programma" class="rounded-component" role="region">
    <h2 id="upcoming-events">
      <a href="#eventi-futuri" aria-label="Visualizza tutti gli eventi in programma">Eventi In Programma</a>
    </h2>
    <ul>
      <li v-for="(evento, index) in eventiFuturi" :key="evento.id" tabindex="0" role="listitem">
        <article>
          <img class="event-img" :src="evento.url_photo ? eventiFuturiImageUrls[index] : defaultImage" :alt="`Immagine dell'evento: ${evento.nome}`" />
          <section class="event-info">
            <p class="event-name">{{ evento.nome }}</p>
            <section class="event-dates">
              <p>Inizio: {{ formatTimestamp(evento.data_ora.inizio) }}</p>
              <p>Fine: {{ formatTimestamp(evento.data_ora.fine) }}</p>
            </section>
          </section>
        </article>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  name: 'UpcomingEvents'
};
</script>


