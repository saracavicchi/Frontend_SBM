<script setup lang="ts">

import {defineEmits, defineProps, nextTick, onMounted, type PropType, ref, watch} from "vue";
import type {Organizzazione} from "@/types/organizzazioneType";
import type {Organizzatore} from "@/types/organizzatoreType";

import axios from "axios";

import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';

const emit = defineEmits(['openPopup', 'closePopup']);

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

const organizzatori = ref<Organizzatore[]>([]);
const immaginiOrganizzatori = ref<Map<number, string>>(new Map());

watch(() => props.organizzazione.organizzatori, async (nuoviOrganizzatori) => {
  organizzatori.value = nuoviOrganizzatori;
  immaginiOrganizzatori.value.clear(); // Pulisci la mappa per evitare dati obsoleti
  for (const organizzatore of organizzatori.value) {
    if (organizzatore.urlFoto != null) {
      try {

        const response = await axios.get('/api/images/organizzatore', {
          params: {name: organizzatore.urlFoto},
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        immaginiOrganizzatori.value.set(organizzatore.id, imageUrl);
      } catch (error) {
        console.error('Errore nel recupero dell\'immagine:', error);
      }
    }
  }
}, {immediate: true, deep: true});


const showConfPopupOrganizzatore = ref(false);
const idToDelete = ref<number | null>(null);

const promptDelConfOrganizzatore = (id: number) => {

  showConfPopupOrganizzatore.value = true;
  idToDelete.value = id;

  emit('openPopup');

  nextTick(() => {
    (document.querySelector('.confirmation-dialog-organizzatore') as HTMLDialogElement)?.showModal();
  });

};

const confDelOrganizzatore = async () => {

  if (idToDelete.value !== null) {
    try {

      const response = await axios.get('/api/organizzazione/deleteOrganizzatore', {
        params: {
          idOrganizzatore: idToDelete.value,
          idOrganizzazione: props.organizzazione.id
        }
      });

      if (response.status === 200) {
        organizzatori.value = organizzatori.value.filter(organizzatore => organizzatore.id !== idToDelete.value);
        immaginiOrganizzatori.value.delete(idToDelete.value);
      }

      (document.querySelector('.confirmation-dialog-organizzatore') as HTMLDialogElement)?.close();
      emit('closePopup');

    } catch (error) {
      console.error('Errore nella cancellazione dell\'organizzatore:', error);
      (document.querySelector('.confirmation-dialog-organizzatore') as HTMLDialogElement)?.close();
      emit('closePopup');
    }
  }
};

const cancDelOrganizzatore = () => {
  showConfPopupOrganizzatore.value = false;
  idToDelete.value = null;
  emit('closePopup');
  (document.querySelector('.confirmation-dialog-organizzatore') as HTMLDialogElement)?.close();
}


</script>

<template>

  <h1 id="team-management" class="team-management-title" v-if="props.marzel.id === props.organizzazione.admin.id"
  >Team Management</h1>

  <div class="team-management-container" aria-labelledby="team-management">

    <div v-for="organizzatore in organizzatori" :key="organizzatore.id">

      <article class="organizzatore-box"
               :class="{'current-organizzatore-highlight': organizzatore.id === props.marzel.id}"
               aria-labelledby="org-name">

        <div class="upper-container">

          <img class="organizzatore-profile-image" :src="immaginiOrganizzatori.get(organizzatore.id) || defaultImage"
               alt="Foto profilo" aria-label="Foto profilo organizzatore" aria-labelledby="org-name"/>

          <p id="org-name" class="organizzatore-name">{{ organizzatore.nome }} {{ organizzatore.cognome }}</p>
          <p style="margin: 0; padding: 0; text-decoration: underline;"
             v-if="organizzatore.id === props.organizzazione.admin.id">Admin</p>

          <img class="delete-image" src="@/assets/images/organizzazioneImg/delete.png" alt="Icona modifica foto"
               width="32" height="32" @click="promptDelConfOrganizzatore(organizzatore.id)"
               v-if="props.marzel.id === props.organizzazione.admin.id && organizzatore.id !== props.organizzazione.admin.id"
               aria-label="Elimina organizzatore dall'organizzazione">

        </div>

        <p class="organizzatore-email" aria-label="Email dell'organizzatore">{{ organizzatore.mail }}</p>

      </article>

    </div>

  </div>

  <dialog v-if="showConfPopupOrganizzatore" class="confirmation-dialog-organizzatore" @close="cancDelOrganizzatore"
          aria-modal="true" aria-labelledby="dialog-descr"
  >
    <form method="dialog">
      <p id="dialog-descr">Sei sicuro di voler eliminare questo organizzatore?</p>
      <menu class="dialog-actions-organizzatore">
        <button type="button" class="dialog-confirm-button dialog-button" @click="confDelOrganizzatore" value="confirm"
                aria-label="Conferma eliminazione">
          Conferma
        </button>
        <button type="button" class="dialog-cancel-button dialog-button" @click="cancDelOrganizzatore" value="cancel"
                aria-label="Chiudi finestra di dialogo">
          Annulla
        </button>
      </menu>
    </form>
  </dialog>

</template>

<script lang="ts">
export default {
  name: 'TeamManagement'
};
</script>

<style scoped>

.organizzatore-box {
  background-color: #3152a8;
  color: white;
  padding: 20px 15px 20px 10px;
  text-align: center;
  border-radius: 15px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.upper-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
}

.organizzatore-email {
  margin: 0;
  padding: 15px 0 0;
  font-size: 1rem;
  text-align: center;
}

.organizzatore-name {
  max-width: 30%;
}

.team-management-container {
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 40px;
  column-gap: 10%;
  row-gap: 20%;
  height: 100%;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .team-management-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .team-management-container {
    grid-template-columns: repeat(1, 1fr);
  }
}

.organizzatore-profile-image {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5px 0 white;
}

.delete-image {
  cursor: pointer;
  transition: transform 0.2s;
}

.delete-image:hover {
  transform: scale(1.2);
}

.team-management-title {
  color: white;
  font-size: 1.5rem;
  margin: 0 0 10px;
}

.confirmation-dialog-organizzatore {
  border: none;
  border-radius: 15px;
  padding: 20px;
  background-color: #f2f2f2;
  color: #3152a8;
  font-size: 1.2rem;
}

.dialog-actions-organizzatore {
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

.current-organizzatore-highlight {
  border: 3px solid white;
}

</style>