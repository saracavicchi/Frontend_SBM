<script setup lang="ts">
// Importazione delle immagini delle stelle per visualizzare la valutazione degli eventi
import stellaPiena from '@/assets/images/stars/stellaPiena.png';
import stellaVuota from '@/assets/images/stars/stellaVuota.png';
</script>

<template>
  <section class="stars-rating">
    <!-- Descrizione nascosta per l'accessibilità -->
    <span class="visually-hidden">Valutazione: {{ rating }} su 5</span>
    <!-- Itera per 5 volte per visualizzare le stelle -->
    <img v-for="index in 5" :key="index"
         :src="index <= Math.round(rating) ? stellaPiena : stellaVuota"
         :alt="`Stella ${index <= Math.round(rating) ? 'piena' : 'vuota'} per una valutazione di ${rating} su 5`"
         class="star">
  </section>
</template>

<script lang="ts">
export default {
  name: 'StarsRating',
  props: {
    // Proprietà per il punteggio di valutazione
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
/* Stile per le immagini delle stelle */
.star {
  width: 30px;
  height: 30px;
  filter: brightness(120%) saturate(110%);
}
</style>