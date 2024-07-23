<script setup lang="ts">
 import { defineProps } from 'vue';
 import type { PropType } from 'vue';
 import type { Notifica } from '@/types/notificaType.ts';
 import { format } from 'date-fns-tz';
 import { toZonedTime } from 'date-fns-tz';

  const props = defineProps({
    notifiche: Array as PropType<Notifica[]>
  });

 function formatTimestamp(timestamp: string, timeZone: string = 'UTC'): string {
   const date = new Date(Date.parse(timestamp));
   const zonedDate = toZonedTime(date, timeZone);
   return format(zonedDate, 'dd/MM/yyyy - HH:mm:ss', { timeZone });
 }

</script>

<template>
  <section aria-labelledby="notification-center" id="centro-notifiche" class="rounded-component" role="region">
    <h2 id="notification-center">
      <a href="#notifiche" aria-label="Vai al Centro Notifiche" tabindex="0">Centro Notifiche</a>
    </h2>
    <ul role="list">
      <li v-for="notifica in notifiche" :key="notifica.id" role="listitem">
        <p>{{ formatTimestamp(notifica.data_ora) }}</p>
        <p class="messaggio" style="font-weight: bold">{{ notifica.mittente }}:</p>
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