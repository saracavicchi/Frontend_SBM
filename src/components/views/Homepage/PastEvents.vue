<script setup lang="ts">
// Importazione delle funzioni necessarie da Vue e date-fns-tz, dei tipi definiti dall'utente e dell'immagine di default
import {defineProps, watchEffect, ref, type Ref} from 'vue';
import type { PropType} from 'vue';
import type { EventoConcluso } from '@/types/eventoConclusoType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';
import StarsRating from '@/components/views/Homepage/StarsRating.vue';
import axios from "axios";
import defaultImage from '@/assets/images/homepageImg/profilo.jpg';


// Definizione delle props del componente, accetta un array di eventi conclusi
const props = defineProps({
  eventiConclusi: Array as PropType<EventoConcluso[]>
});

// Variabile reattiva per memorizzare gli URL delle immagini degli eventi conclusi
const eventiConclusiImageUrls: Ref<string[]> = ref([]);

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
    return imageUrl;
  } catch (error) {
    console.error('Errore nel recupero dell\'immagine:', error);
    return defaultImage; // Ritorna un percorso di fallback in caso di errore
  }
}

// Effetto collaterale per recuperare gli URL delle immagini degli eventi conclusi
watchEffect(() => {
  if(props.eventiConclusi){
    const imageUrlsPromises = props.eventiConclusi.map(async (evento) => {
      return fetchImage(evento.url_photo)
          .catch(error => {
            console.error('Errore nel recupero dell\'immagine:', error);
            return defaultImage;
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

    <!-- Intestazione della sezione eventi conclusi -->
    <h2 id="past-events">
      <!-- Link per visualizzare tutti gli eventi conclusi con accesskey per l'accessibilità -->
      <a href="#eventi-conclusi" aria-label="Visualizza tutti gli eventi conclusi" accesskey="f">Eventi Conclusi</a>
    </h2>

    <!-- Lista degli eventi conclusi -->
    <ul>
      <!-- Itera sugli eventi conclusi e crea un elemento di lista per ciascuno -->
      <li v-for="(evento, index) in eventiConclusi" :key="evento.id" tabindex="0" role="listitem">

        <article>
          <!-- Immagine dell'evento con URL dinamico o immagine di default -->
          <img class="event-img" :src="evento.url_photo ? eventiConclusiImageUrls[index] : defaultImage" :alt="`Immagine dell'evento: ${evento.nome}, inizio: ${formatTimestamp(evento.data_ora.inizio)}, fine: ${formatTimestamp(evento.data_ora.fine)}`" />

          <section class="event-info">
            <!-- Nome dell'evento -->
            <p class="event-name">{{ evento.nome }}</p>

            <section class="event-details">

              <section class="event-dates">
                <!-- Date di inizio e fine dell'evento -->
                <p>Inizio: {{ formatTimestamp(evento.data_ora.inizio) }}</p>
                <p>Fine: {{ formatTimestamp(evento.data_ora.fine) }}</p>
              </section>

              <!-- Component per la valutazione in stelle dell'evento -->
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

