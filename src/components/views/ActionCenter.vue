<script setup lang="ts"></script>
<template>
  <section aria-labelledby="action-center" id="centro-azioni">
    <h2 id="action-center">Centro Azioni</h2>
    <section class="actions">
      <article>
        <a href="#gestisci-eventi" aria-label="Gestisci eventi - Vai alla sezione per la gestione degli eventi">
          <img class="action-img" src="@/assets/images/homepageImg/gestiscieventi.png" alt="Gestisci eventi" tabindex="0">
          <h3 class="action-text">Gestisci Eventi</h3>
        </a>
      </article>
      <article>
        <a href="#dashboard" aria-label="Dashboard - Vai alla tua dashboard personale">
          <img class="action-img" src="@/assets/images/homepageImg/dashboardfoto.png" alt="Dashboard" tabindex="0">
          <h3 class="action-text">Dashboard</h3>
        </a>
      </article>
      <article>
        <a href="#organizzazione" aria-label="Organizzazione - Vai alla sezione del profilo dell'organizzazione o crea una nuova organizzazione">
          <img class="action-img" src="../../assets/images/homepageImg/profiloOrganizzazione.png" alt="Profilo dell'organizzazione" tabindex="0">
          <h3 class="action-text">Organizzazione</h3>
        </a>
      </article>
      <article>
        <a href="#profilo" aria-label="Profilo - Vai alla pagina del tuo profilo personale">
          <img class="action-img" src="@/assets/images/homepageImg/profiloOrganizzatore.png" alt="Profilo organizzatore" tabindex="0">
          <h3 class="action-text">Profilo</h3>
        </a>
      </article>
      <article>
        <a href="#pagamenti" aria-label="Pagamenti - Vai alla sezione per gestire finanze e pagamenti">
          <img class="action-img" src="@/assets/images/homepageImg/pagamento.png" alt="Gestione pagamenti"tabindex="0">
          <h3 class="action-text">Pagamenti e Finanze</h3>
        </a>
      </article>
      <article>
        <a href="#marketing" aria-label="Marketing - Vai alla sezione per gestire il marketing">
          <img class="action-img" src="@/assets/images/homepageImg/marketing.png" alt="Campagne marketing" tabindex="0">
          <h3 class="action-text">Marketing</h3></a>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: 'ActionCenter'
};
</script>



