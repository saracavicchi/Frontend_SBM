<script setup lang="ts">
// Importazione delle immagini delle stelle per visualizzare la valutazione degli eventi
import stellaPiena from '@/assets/images/stars/stellaPiena.png';
import stellaVuota from '@/assets/images/stars/stellaVuota.png';
</script>

<template>
  <section class="stars-rating">
    <span class="visually-hidden">Valutazione: {{ rating }} su 5</span>
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
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.star {
  width: 30px; /* Regola la dimensione delle stelle */
  height: 30px;
  filter: brightness(120%) saturate(110%);

}
</style>