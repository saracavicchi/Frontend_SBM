<script setup lang="ts">

import {defineProps, nextTick, type PropType, ref, watch} from "vue";
import type {Organizzatore} from "@/types/organizzatoreType";
import type {Organizzazione} from "@/types/organizzazioneType";
import axios from "axios";

import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';
import {useRouter} from "vue-router";

const router = useRouter();

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

const imageUrl = ref('');

watch(() => props.organizzazione, async (newVal) => {
  if (newVal && newVal.id) {
    try {
      //richiesta ad axios con parametro newVal.urlFoto, response type blob
      const response = await axios.get('/api/images/organizzazione', {
        params: {name: newVal.urlFoto},
        responseType: 'blob'
      });
      imageUrl.value = URL.createObjectURL(response.data);

    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, {immediate: true});

const showConfPopupOrganizzazione = ref(false);

const promptDelConfOrganizzazione = () => {
  showConfPopupOrganizzazione.value = true;

  nextTick(() => {
    (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.showModal();
  });
};

const confDelOrganizzazione = async () => {
  try {
    const response = await axios.get('/api/organizzazione/deleteOrganizzazione', {
      params: {
        id: props.organizzazione.id
      }
    });

    if (response.status === 200) {
      console.log('Organizzazione eliminata con successo!');
      (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
      await router.push({
        name: 'Homepage'
      })
    }

    (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();

  } catch (error) {
    console.error('Errore nella cancellazione dell\'organizzazione:', error);
    (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
  }
};

const cancDelOrganizzazione = () => {
  showConfPopupOrganizzazione.value = false;
  (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
};

</script>

<template>

  <div class="control-panel-container">

    <section class="info-organizzazione">
      <img class="organizzazione-image" :src="imageUrl || defaultImage" alt="Foto organizzazione"/>
      <h1 class="greeting-organizzazione">Ciao, {{ organizzazione.nome }}!</h1>
    </section>

    <section class="mod-buttons" v-if="organizzazione.admin.id === marzel.id">
      <button type="button" id="add-org-button" class="control-panel-button" aria-label="Aggiungi un organizzatore">
        Aggiungi
        organizzatore
      </button>
      <button type="button" id="mod-org-button" class="control-panel-button" aria-label="Aggiungi un organizzatore">
        Modifica
        organizzazione
      </button>
      <button type="button" id="del-org-button" class="control-panel-button" aria-label="Aggiungi un organizzatore"
              @click="promptDelConfOrganizzazione">
        Elimina
        organizzazione
      </button>
    </section>

  </div>

  <dialog v-if="showConfPopupOrganizzazione" class="confirmation-dialog-organizzazione" @close="cancDelOrganizzazione">
    <form method="dialog">
      <p>Sei sicuro di voler eliminare l'organizzazione?</p>
      <menu class="dialog-actions-organizzazione">
        <button type="button" class="dialog-confirm-button dialog-button" @click="confDelOrganizzazione"
                value="confirm">Conferma
        </button>
        <button type="button" class="dialog-cancel-button dialog-button" @click="cancDelOrganizzazione" value="cancel">
          Annulla
        </button>
      </menu>
    </form>
  </dialog>

</template>

<script lang="ts">
export default {
  name: 'ControlPanel'
};
</script>

<style scoped>

.organizzazione-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc; /* Sfondo neutro */
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5px 0 white;
}

.greeting-organizzazione {
  color: white;
  font-size: 1.5rem;
}

.info-organizzazione {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 5%;
  flex: 1;
}

.mod-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 5%;
  flex: 1.9;
}

@media (max-width: 768px) {
  .mod-buttons {
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
}

@media (max-width: 1000px) {
  .info-organizzazione {
    flex-direction: column;
    gap: 10px;
  }
}

.control-panel-button {
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #3152a8;
}

.control-panel-button:hover {
  background-color: #3152a8;
  color: #f2f2f2;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 0px 5px 0px white;
}

.control-panel-container {
  width: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 20px 26px 10px;
}

.confirmation-dialog-organizzazione {
  border: none;
  border-radius: 15px;
  padding: 20px;
  background-color: #f2f2f2;
  color: #3152a8;
  font-size: 1.2rem;
}

.dialog-actions-organizzazione {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-button {
  background-color: #3152a8;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: 0.2s;
  outline: none;
}

.dialog-button:hover {
  background-color: #007BFF;
  cursor: pointer;
}

</style>