<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { Evento } from '@/types/eventoType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';

const props = defineProps({
  eventiFuturi: Array as PropType<Evento[]>
});

function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
  const date = new Date(Date.parse(timestamp));
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });
}
</script>

<template>
  <section aria-labelledby="upcoming-events" id="eventi-in-programma" class="rounded-component">
    <h2 id="upcoming-events">
      <a href="#eventi-futuri" aria-label="Visualizza tutti gli eventi in programma" >Eventi In Programma</a>
    </h2>
    <ul>
      <li v-for="evento in eventiFuturi" :key="evento.id">
        <article>
          <img class="event-img" :src="evento.url_photo ? evento.url_photo : '@/assets/images/homepageImg/profilo.jpg'" :alt="evento.nome" />
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


<style>
.eventi-in-programma {
  height: 232px;
  left: 798px;
  position: absolute;
  top: 400px;
  width: 601px;
}

.eventi-in-programma .overlap {
  background-color: #ffffff40;
  border-radius: 20px;
  height: 232px;
  position: relative;
  width: 599px;
}

.eventi-in-programma .text-wrapper-12 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 25px;
  font-weight: 800;
  left: 152px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 14px;
}

.eventi-in-programma .line {
  height: 1px;
  left: 16px;
  object-fit: cover;
  position: absolute;
  top: 66px;
  width: 573px;
}

.eventi-in-programma .info-feste-in {
  height: 129px;
  left: 22px;
  position: absolute;
  top: 77px;
  width: 576px;
}

.eventi-in-programma .foto-festa {
  background-color: #d9d9d9;
  border-radius: 27.5px;
  height: 55px;
  left: 0;
  position: absolute;
  top: 0;
  width: 55px;
}

.eventi-in-programma .foto-festa-2 {
  background-color: #d9d9d9;
  border-radius: 27.5px;
  height: 55px;
  left: 0;
  position: absolute;
  top: 74px;
  width: 55px;
}

.eventi-in-programma .text-wrapper-13 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 413px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-14 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-15 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-16 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 423px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

.eventi-in-programma .text-wrapper-17 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

.eventi-in-programma .text-wrapper-18 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

</style>
