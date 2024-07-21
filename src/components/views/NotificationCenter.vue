<script setup lang="ts">
 import { defineProps } from 'vue';
 import type { PropType } from 'vue';
 import type { Notifica } from '@/types/notificaType.ts';

  const props = defineProps({
    notifiche: Array as PropType<Notifica[]>
  });
</script>

<template>
  <section aria-labelledby="notification-center" id="centro-notifiche">
    <h2 id="notification-center">Centro Notifiche</h2>
    <img class="line-3" alt="Line" src="@/assets/images/homepageImg/line-4.svg" />
    <ul>
      <li v-for="(notifica, index) in notifiche" :key="index">{{ notifica.messaggio }}</li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  name: 'NotificationCenter'
};
</script>