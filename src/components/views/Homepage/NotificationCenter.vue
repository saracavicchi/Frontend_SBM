<script setup lang="ts">
// Importazione delle funzioni necessarie da Vue e date-fns-tz e dei tipi definiti dall'utente
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { Notifica } from '@/types/notificaType.ts';
import { format } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';

// Definizione delle props del componente
const props = defineProps({
  notifiche: Array as PropType<Notifica[]>
});

// Funzione per formattare i timestamp in una stringa leggibile, considerando il fuso orario
function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
  const date = new Date(Date.parse(timestamp));
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'dd/MM/yyyy - HH:mm:ss', { timeZone });
}

</script>

<template>
  <section aria-labelledby="notification-center" id="centro-notifiche" class="rounded-component" role="region">

    <!-- Intestazione del centro notifiche -->
    <h2 id="notification-center">
      <!-- Link al centro notifiche con accesskey per l'accessibilità -->
      <a href="#notifiche" aria-label="Vai al Centro Notifiche" tabindex="0" accesskey="n">Centro Notifiche</a>
    </h2>

    <!-- Lista delle notifiche -->
    <ul role="list">
      <!-- Itera sulle notifiche e crea un elemento di lista per ciascuna -->
      <li v-for="notifica in notifiche" :key="notifica.id" role="listitem">
        <!-- Mostra il timestamp formattato della notifica -->
        <p>{{ formatTimestamp(notifica.data_ora) }}</p>
        <!-- Mostra il mittente della notifica in grassetto -->
        <p class="messaggio" style="font-weight: bold">{{ notifica.mittente }}:</p>
        <!-- Mostra il testo della notifica con un margine a sinistra -->
        <p class="messaggio" style="margin-left: 15px">{{ notifica.testo }}</p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  name: 'NotificationCenter'
};
</script>