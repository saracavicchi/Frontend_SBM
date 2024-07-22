<script setup lang="ts">
import { defineProps} from 'vue';
import type { PropType} from 'vue';
import type { EventoConcluso } from '@/types/eventoConclusoType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';
import StarsRating from '@/components/views/StarsRating.vue';

const props = defineProps({
  eventiConclusi: Array as PropType<EventoConcluso[]>
});

function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
  const date = new Date(Date.parse(timestamp));
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });
}
</script>

<<template>
  <section class="rounded-component" aria-labelledby="past-events" id="eventi-conclusi">
    <h2 id="past-events">
      <a href="#eventi-conclusi" aria-label="Visualizza tutti gli eventi conclusi" >Eventi Conclusi</a>
    </h2>
    <ul>
      <li v-for="(evento, index) in eventiConclusi" :key="evento.id">
        <article>
          <img class="event-img" :src="evento.url_photo ? evento.url_photo : '@/assets/images/homepageImg/profilo.jpg'" :alt="evento.nome" />
          <section class="event-info">
            <p class="event-name">{{ evento.nome }}</p>
            <section class="event-details">
              <section class="event-dates">
                <p>Inizio: {{ formatTimestamp(evento.data_ora.inizio) }}</p>
                <p>Fine: {{ formatTimestamp(evento.data_ora.fine) }}</p>
              </section>
              <StarsRating :rating="evento.stelle" />
              <!--<p class="stars" style="font-weight: bold">Stelle:</p><p class="stars"> {{ evento.stelle }}/5</p> -->
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

