<script setup lang="ts">

import {defineProps, nextTick, type PropType, ref, watch, defineEmits} from "vue";
import type {Organizzatore} from "@/types/organizzatoreType";
import type {Organizzazione} from "@/types/organizzazioneType";
import axios from "axios";
import qs from 'qs';


import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';
import {useRouter} from "vue-router";

const router = useRouter();
const emit = defineEmits(['organizzatoreAdded', 'openPopup', 'closePopup']);

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
  if (newVal && newVal.id && newVal.urlFoto) {
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

const navigateToModificaOrganizzazione = () => {
  router.push({ name: 'ModificaOrganizzazione', params: { id: props.organizzazione.id } });
};

const promptDelConfOrganizzazione = () => {
  showConfPopupOrganizzazione.value = true;
  emit('openPopup');

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
      emit('closePopup');
      await router.push({
        name: 'Homepage'
      })
    }

    (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
    emit('closePopup');

  } catch (error) {
    console.error('Errore nella cancellazione dell\'organizzazione:', error);
    (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
    emit('closePopup');
  }
};


const cancDelOrganizzazione = () => {
  showConfPopupOrganizzazione.value = false;
  (document.querySelector('.confirmation-dialog-organizzazione') as HTMLDialogElement)?.close();
  emit('closePopup');
};

const showAddOrganizzatorePopup = ref(false);
const email = ref('');
const responseMessage = ref('');

const openAddOrganizzatorePopup = () => {
  showAddOrganizzatorePopup.value = true;
  emit('openPopup');
  responseMessage.value = '';
  nextTick(() => {
    (document.querySelector('.add-organizzatore-dialog') as HTMLDialogElement)?.showModal();
  })
};

const closeAddOrganizzatorePopup = () => {
  showAddOrganizzatorePopup.value = false;
  email.value = '';
  (document.querySelector('.add-organizzatore-dialog') as HTMLDialogElement)?.close();
  emit('closePopup');

};

const addOrganizzatore = async () => {
  try {
    console.log('Email:', email.value);

    const response = await axios.post('/api/organizzazione/addOrganizzatore', qs.stringify({
      emailAddress: email.value,
      idOrganizzazione: props.organizzazione.id
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status === 200) {
      responseMessage.value = response.data;
      emit('organizzatoreAdded');
      email.value = '';

    } else {
      responseMessage.value = 'Errore nell\'aggiunta dell\'organizzatore';
    }
  } catch (error) {
    if (axios.isAxiosError(error) && (error.response?.status === 409 || error.response?.status === 404)) {
      responseMessage.value = error.response?.data;
      return;
    }
    responseMessage.value = 'Errore nell\'aggiunta dell\'organizzatore';
    console.error('Errore nell\'aggiunta dell\'organizzatore:', error);
  }
};

</script>

<template>

  <div v-if="organizzazione && marzel">


    <div class="control-panel-container" aria-label="Pannello di controllo organizzazione">

      <section class="info-organizzazione" aria-labelledby="organizzazione-name">
        <img class="organizzazione-image" :src="imageUrl || defaultImage" alt="Foto organizzazione"
             aria-label="Foto profilo organizzazione"/>
        <h1 id="organizzazione-name" class="greeting-organizzazione">Ciao, {{ organizzazione.nome }}!</h1>
      </section>

      <section class="mod-buttons" v-if="organizzazione.admin.id === marzel.id"
               aria-label="Pulsanti per interagire con l'organizzazione">
        <button type="button" id="add-org-button" class="control-panel-button" aria-label="Aggiungi un organizzatore"
                @click="openAddOrganizzatorePopup">
          Aggiungi
          organizzatore
        </button>
        <button type="button" id="mod-org-button" class="control-panel-button" aria-label="Modifica organizzazione" @click="navigateToModificaOrganizzazione">
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



    <dialog v-if="showConfPopupOrganizzazione" class="confirmation-dialog-organizzazione" @close="cancDelOrganizzazione"
            aria-labelledby="del-dialog-descr">
      <form method="dialog">
        <p id="del-dialog-descr">Sei sicuro di voler eliminare l'organizzazione?</p>
        <menu class="dialog-actions-organizzazione">
          <button type="button" class="dialog-confirm-button dialog-button" @click="confDelOrganizzazione"
                  value="confirm" aria-label="Conferma eliminazione organizzazione">Conferma
          </button>
          <button type="button" class="dialog-cancel-button dialog-button" @click="cancDelOrganizzazione" value="cancel"
                  aria-label="Annulla eliminazione organizzazione">
            Annulla
          </button>
        </menu>
      </form>
    </dialog>

    <dialog v-if="showAddOrganizzatorePopup" class="add-organizzatore-dialog" aria-label="Finestra di dialogo per aggiungere un organizzatore">
      <form method="dialog" @submit.prevent="addOrganizzatore">
        <label for="email>">Email organizzatore:</label>
        <input type="email" id="email" v-model="email" required aria-required="true"/>
        <p style="margin: 0;" v-if="responseMessage">{{ responseMessage }}</p>
        <menu>
          <button type="submit" class="dialog-button" aria-label="Aggiungi organizzatore">Aggiungi</button>
          <button type="button" @click="closeAddOrganizzatorePopup" class="dialog-button" aria-label="Chiudi finestra di dialogo">Annulla</button>
        </menu>
      </form>
    </dialog>
  </div>
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
  text-wrap: nowrap;
}

.info-organizzazione {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 25px;
}

.mod-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 20px;
}

@media (max-width: 768px) {
  .mod-buttons {
    flex-direction: column;
    gap: 10px;
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
  transition: 0.2s;
}

.control-panel-button:hover {
  background-color: #3152a8;
  color: #f2f2f2;
  cursor: pointer;
  box-shadow: 0 0 5px 0 white;
}

.control-panel-container {
  width: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 100px;
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

.add-organizzatore-dialog {
  border: none;
  border-radius: 15px;
  padding: 20px;
  background-color: #f2f2f2;
  color: #3152a8;
  font-size: 1.2rem;
  width: 50vw;
}

.add-organizzatore-dialog form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-organizzatore-dialog menu {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

input[type="email"] {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  color: #3152a8;
  resize: none;
  margin-bottom: 10px;
  outline: none;
  border: 2px solid #3152a8;
}

</style>