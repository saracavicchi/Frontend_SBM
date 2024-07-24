<script setup lang="ts">

import {defineProps, type PropType} from "vue";
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";

const props = defineProps({
  organizzazione: {
    type: Object as PropType<Organizzazione>,
    required: true
  },
  marzel: {
    type: Object as PropType<Organizzatore>,
    required: true
  }
});

</script>

<template>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>
  <p>Ciao come stai</p>

</template>

<script lang="ts">
export default {
  name: 'TeamManagement'
};
</script>

<style scoped>

p {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  margin: 0;
}

</style>