<script setup lang="ts">import stellaPiena from '@/assets/images/stars/stellaPiena.png';
import stellaVuota from '@/assets/images/stars/stellaVuota.png';
</script>

<template>
  <div class="stars-rating">
    <img v-for="index in 5" :key="index"
         :src="index <= rating ? stellaPiena : stellaVuota"
         alt="Star" class="star">
  </div>
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