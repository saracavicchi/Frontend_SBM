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

watch(() => props.orgLoggato, async (newVal) => {
  if (newVal && newVal.id) {
    try {
      const response = await axios.get(`/api/organizzatore/hasOrganizzazione?id=${newVal.id}`);
      if (response.data === '') {
        organizzazionePath.value = '/creaOrganizzazione';
      } else {
        organizzazionePath.value = '/organizzazione/' + response.data;
      }
      //console.log('organizzazionePath:', organizzazionePath.value);
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, {immediate: true});

/*
const fetchData = async () => {
  if (props.marzel && props.marzel.id) {
    try {
      const response = await axios.get(`/api/organizzatore/hasOrganizzazione?id=${props.marzel.id}`);
      if (response.data === '') {
        organizzazionePath.value = '/creaOrganizzazione';
      } else {
        organizzazionePath.value = '/organizzazione/' + response.data;
      }
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
};

watch(() => props.marzel, (newValue, oldValue) => {
  if (newValue && newValue.id !== oldValue?.id) {
    fetchData();
  }
}, { immediate: true });

 */

</script>

<template>
  <section aria-labelledby="action-center" id="centro-azioni">
    <h2 id="action-center">Centro Azioni</h2>
    <div class="actions">
      <article>
        <a href="#gestisci-eventi">
          <img class="action-img" src="@/assets/images/homepageImg/gestiscieventi.png" alt="Gestisci eventi">
        </a>
      </article>
      <article>
        <a href="#dashboard">
          <img class="action-img" src="@/assets/images/homepageImg/dashboardfoto.png" alt="Dashboard">
        </a>
      </article>
      <article>
        <router-link :to="organizzazionePath">
          <img class="action-img" src="../../assets/images/homepageImg/profiloOrganizzazione.png" alt="Groups">
        </router-link>
      </article>
      <article>
        <router-link :to="{name: 'ModificaOrganizzatore', params: { id: props.orgLoggato.id } }">
          <img class="action-img" src="../../assets/images/homepageImg/profiloOrganizzatore.png" alt="Manage accounts">
        </router-link>
      </article>
      <article>
        <a href="#pagamenti">
          <img class="action-img" src="../../assets/images/homepageImg/pagamento.png" alt="Add card">
        </a>
      </article>
      <article>
        <a href="#marketing">
          <img class="action-img" src="../../assets/images/homepageImg/marketing.png" alt="Campaign">
        </a>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ActionCenter'
};
</script>


<style>
/*
.centro-azioni {
  height: 506px;
  left: 40px;
  position: absolute;
  top: 400px;
  width: 691px;
}

.centro-azioni .overlap-group {
  border-radius: 20px;
  height: 506px;
  position: relative;
  width: 677px;
}

.centro-azioni .gestiscieventi {
  height: 90px;
  left: 50px;
  object-fit: cover;
  position: absolute;
  top: 92px;
  width: 91px;
}

.centro-azioni .text-wrapper-5 {
  -webkit-text-stroke: 1px #000000;
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 25px;
  font-weight: 800;
  left: 230px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-shadow: 0px 4px 4px #00000040;
  top: 13px;
  width: 205px;
}

.centro-azioni .rectangle {
  background-color: #ffffff40;
  border-radius: 20px;
  height: 506px;
  left: 0;
  position: absolute;
  top: 0;
  width: 677px;
}

.centro-azioni .text-wrapper-6 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 29px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 195px;
  white-space: nowrap;
  width: 133px;
}

.centro-azioni .dashboardfoto {
  height: 90px;
  left: 288px;
  object-fit: cover;
  position: absolute;
  top: 92px;
  width: 91px;
}

.centro-azioni .text-wrapper-7 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 283px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 195px;
  white-space: nowrap;
  width: 108px;
}

.centro-azioni .text-wrapper-8 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 529px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 419px;
  width: 109px;
}

.centro-azioni .text-wrapper-9 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 288px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 419px;
  width: 110px;
}

.centro-azioni .add-card {
  height: 90px;
  left: 288px;
  object-fit: cover;
  position: absolute;
  top: 322px;
  width: 89px;
}

.centro-azioni .text-wrapper-10 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 62px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 419px;
  width: 67px;
}

.centro-azioni .text-wrapper-11 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 495px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 195px;
  white-space: nowrap;
  width: 152px;
}

.centro-azioni .groups {
  height: 90px;
  left: 526px;
  object-fit: cover;
  position: absolute;
  top: 92px;
  width: 90px;
}

.centro-azioni .manage-accounts {
  height: 90px;
  left: 50px;
  object-fit: cover;
  position: absolute;
  top: 322px;
  width: 90px;
}

.centro-azioni .campaign {
  height: 90px;
  left: 534px;
  object-fit: cover;
  position: absolute;
  top: 322px;
  width: 90px;
}
*/
</style>
