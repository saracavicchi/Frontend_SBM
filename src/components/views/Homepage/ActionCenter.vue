<script setup lang="ts">

import {ref, onMounted, watch, defineProps, type PropType} from "vue";
import axios from "axios";
import type {Organizzatore} from "@/types/organizzatoreType";

const organizzazionePath = ref('');

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

// Osserva le modifiche alla proprietà orgLoggato
watch(() => props.orgLoggato, async (newVal) => {
  // Se esiste un nuovo valore e ha un id
  if (newVal && newVal.id) {
    try {
      // Effettua una richiesta GET per verificare se l'organizzatore ha un'organizzazione
      const response = await axios.get(`/api/organizzatore/hasOrganizzazione?id=${newVal.id}`);
      // Se la risposta è vuota, imposta il percorso per creare una nuova organizzazione
      if (response.data === '') {
        organizzazionePath.value = '/creaOrganizzazione';
      } else {
        // Altrimenti, imposta il percorso per gestire l'organizzazione esistente
        organizzazionePath.value = '/gestisciOrganizzazione/' + response.data;
      }
    } catch (error) {
      // Gestisce eventuali errori nella richiesta
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
        <!-- Link alla sezione per la gestione degli eventi -->
        <a href="#gestisci-eventi" aria-label="Gestisci eventi - Vai alla sezione per la gestione degli eventi" accesskey="1">
          <img class="action-img" :src="gestisciEventiImg" alt="Gestisci eventi" tabindex="0">
          <h3 class="action-text">Gestisci Eventi</h3>
        </a>
      </article>

      <article>
        <!-- Link alla dashboard personale -->
        <a href="#dashboard" aria-label="Dashboard - Vai alla tua dashboard personale" accesskey="2">
          <img class="action-img" :src="dashboardImg" alt="Dashboard" tabindex="0">
          <h3 class="action-text">Dashboard</h3>
        </a>
      </article>

      <article>
        <!-- Link al profilo dell'organizzazione o per crearne una nuova -->
        <router-link :to="organizzazionePath" aria-label="Organizzazione - Vai alla sezione del profilo dell'organizzazione o crea una nuova organizzazione" accesskey="3">
          <img class="action-img" :src="profiloOrganizzazioneImg" alt="Gestione organizzazione" tabindex="0">
          <h3 class="action-text">Organizzazione</h3>
        </router-link>
      </article>

      <article>
        <!-- Link alla pagina del profilo personale -->
        <router-link :to="{name: 'ModificaOrganizzatore', params: { id: props.orgLoggato.id } }" aria-label="Profilo - Vai alla pagina del tuo profilo personale" accesskey="4">
          <img class="action-img" :src="profiloOrganizzatoreImg" alt="Profilo dell'organizzatore" tabindex="0">
          <h3 class="action-text">Profilo</h3>
        </router-link>
      </article>

      <article>
        <!-- Link alla sezione per gestire finanze e pagamenti -->
        <a href="#pagamenti" aria-label="Pagamenti - Vai alla sezione per gestire finanze e pagamenti" accesskey="5">
          <img class="action-img" :src="pagamentoImg" alt="Gestione pagamenti" tabindex="0">
          <h3 class="action-text">Pagamenti e Finanze</h3>
        </a>
      </article>

      <article>
        <!-- Link alla sezione per gestire il marketing -->
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



