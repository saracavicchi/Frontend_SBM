<script setup lang="ts">

import {ref, onMounted, watch, defineProps, type PropType} from "vue";
import axios from "axios";
import type {Organizzatore} from "@/types/organizzatoreType";

const organizzazionePath = ref('');

/*
const props = defineProps({
  marzel: Object
});

 */

const props = defineProps({
  orgLoggato: {
    type: Object as PropType<Organizzatore>,
    required: true
  }
});

const gestisciEventiImg = new URL('@/assets/images/homepageImg/gestiscieventi.png', import.meta.url).href;
const dashboardImg = new URL('@/assets/images/homepageImg/dashboardfoto.png', import.meta.url).href;
const profiloOrganizzazioneImg = new URL('@/assets/images/homepageImg/profiloOrganizzazione.png', import.meta.url).href;
const profiloOrganizzatoreImg = new URL('@/assets/images/homepageImg/profiloOrganizzatore.png', import.meta.url).href;
const pagamentoImg = new URL('@/assets/images/homepageImg/pagamento.png', import.meta.url).href;
const marketingImg = new URL('@/assets/images/homepageImg/marketing.png', import.meta.url).href;


watch(() => props.orgLoggato, async (newVal) => {
  if (newVal && newVal.id) {
    try {
      const response = await axios.get(`/api/organizzatore/hasOrganizzazione?id=${newVal.id}`);
      if (response.data === '') {
        organizzazionePath.value = '/creaOrganizzazione';
      } else {
        organizzazionePath.value = '/gestisciOrganizzazione/' + response.data;
      }
      //console.log('organizzazionePath:', organizzazionePath.value);
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, {immediate: true});


</script>

<template>
  <section aria-labelledby="action-center" class="centro-azioni">
    <h2 id="action-center">Centro Azioni</h2>
    <section class="actions">
      <article>
        <a href="#gestisci-eventi" aria-label="Gestisci eventi - Vai alla sezione per la gestione degli eventi" accesskey="1">
          <img class="action-img" :src="gestisciEventiImg" alt="Gestisci eventi" tabindex="0">
          <h3 class="action-text">Gestisci Eventi</h3>
        </a>
      </article>
      <article>
        <a href="#dashboard" aria-label="Dashboard - Vai alla tua dashboard personale" accesskey="2">
          <img class="action-img" :src="dashboardImg" alt="Dashboard" tabindex="0">
          <h3 class="action-text">Dashboard</h3>
        </a>
      </article>
      <article>
        <router-link :to="organizzazionePath" aria-label="Organizzazione - Vai alla sezione del profilo dell'organizzazione o crea una nuova organizzazione" accesskey="3">
          <img class="action-img" :src="profiloOrganizzazioneImg" alt="Gestione organizzazione" tabindex="0">
          <h3 class="action-text">Organizzazione</h3>
        </router-link>
      </article>
      <article>
        <router-link :to="{name: 'ModificaOrganizzatore', params: { id: props.orgLoggato.id } }" aria-label="Profilo - Vai alla pagina del tuo profilo personale" accesskey="4">
          <img class="action-img" :src="profiloOrganizzatoreImg" alt="Profilo dell'organizzatore" tabindex="0">
          <h3 class="action-text">Profilo</h3>
        </router-link>
      </article>

      <!-- <article>
        <a href="#organizzazione" aria-label="Organizzazione - Vai alla sezione del profilo dell'organizzazione o crea una nuova organizzazione" accesskey="3">
          <img class="action-img" src="../../../assets/images/homepageImg/profiloOrganizzazione.png" alt="Profilo dell'organizzazione" tabindex="0">
          <h3 class="action-text">Organizzazione</h3>
        </a>
      </article>
      <article>
        <a href="#profilo" aria-label="Profilo - Vai alla pagina del tuo profilo personale" accesskey="4">
          <img class="action-img" src="../../../assets/images/homepageImg/profiloOrganizzatore.png" alt="Profilo organizzatore" tabindex="0">
          <h3 class="action-text">Profilo</h3>
        </a>
      </article>-->
      <article>
        <a href="#pagamenti" aria-label="Pagamenti - Vai alla sezione per gestire finanze e pagamenti" accesskey="5">
          <img class="action-img" :src="pagamentoImg" alt="Gestione pagamenti" tabindex="0">
          <h3 class="action-text">Pagamenti e Finanze</h3>
        </a>
      </article>
      <article>
        <a href="#marketing" aria-label="Marketing - Vai alla sezione per gestire il marketing" accesskey="6">
          <img class="action-img" :src="marketingImg" alt="Campagne marketing" tabindex="0">
          <h3 class="action-text">Marketing</h3></a>
      </article>
    </section>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ActionCenter'
};
</script>



