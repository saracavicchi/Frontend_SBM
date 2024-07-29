<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHomepage = computed(() => route.path === '/');
</script>

<template>
  <header>
    <!-- Link per saltare al contenuto principale -->
    <a href="#mainContent" accesskey="m" class="skip-link">Vai al contenuto principale</a>
    <!-- Link per saltare alla sezione laterale, visibile solo in homepage -->
    <a v-if="isHomepage" href="#right-section" accesskey="r" class="skip-link">Vai alla sezione laterale</a>

    <nav aria-label="Navigazione principale">
      <h2 class="logo">EVENTGO</h2>
      <ul>
        <li><a href="#home" aria-label="Vai alla home" accesskey="h">Home</a></li>
        <li><a href="#eventi" aria-label="Scopri gli eventi" accesskey="e">Eventi</a></li>
        <li><router-link to="/" aria-label="Accedi all'area personale" accesskey="a">Area personale</router-link></li>
        <li><a href="#help" aria-label="Ottieni aiuto" accesskey="l">Help</a></li>
        <li><a href="#logout" aria-label="Effettua il logout" accesskey="o">
          <img class="logout" alt="Logout" src="../../assets/images/homepageImg/logout.png" />
        </a></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header'
};
</script>
