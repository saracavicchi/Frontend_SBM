<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { Notifica } from '@/types/notificaType.ts';

const props = defineProps({
  notifiche: Array as PropType<Notifica[]>
});

function formatTimestamp(timestamp: number | string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() restituisce 0-11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formatNumber = (num: number): string => (num < 10 ? `0${num}` : num.toString());

  const formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)}`;
  const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  return `${formattedDate} ${formattedTime}`;
}
</script>

<template>
  <section aria-labelledby="notification-center" id="centro-notifiche">
    <h2 id="notification-center">Centro Notifiche</h2>
    <img class="line-3" alt="Line" src="@/assets/images/homepageImg/line-4.svg" />
    <ul>
      <li v-for="notifica in notifiche" :key="notifica.id">{{ formatTimestamp(notifica.data_ora) }} <strong>{{ notifica.mittente }}:</strong> {{ notifica.testo }}</li>
    </ul>
    <a href="#notifiche">Visualizza tutte le notifiche</a>
  </section>
</template>

<script lang="ts">
export default {
  name: 'NotificationCenter'
};
</script>
