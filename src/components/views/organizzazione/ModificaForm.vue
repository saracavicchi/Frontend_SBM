<script setup lang="ts">
import {defineProps, onMounted, type PropType, ref, watch} from 'vue';
import axios from 'axios';
import {onBeforeRouteLeave, useRouter} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import {AxiosError} from 'axios';
import defaultImage from "@/assets/images/creaOrganizzazioneImages/profilo.jpg";
import type {Organizzatore} from "@/types/organizzatoreType";

// Props per ricevere l'organizzazione esistente
const props = defineProps({
  organizzazione: {
    type: Object as PropType<Organizzazione>,
    required: true
  }
});
const marzel = ref<Organizzatore>();
const photoUrl = ref('');

const fileInputRef = ref<HTMLInputElement | null>(null);

const formRef = ref<HTMLFormElement | null>(null);

const router = useRouter();
const errorMessage = ref('');
const deleted = ref('false');

// Osserva i cambiamenti nell'organizzazione e aggiorna l'URL della foto
watch(() => props.organizzazione, async (newVal) => {
  if (newVal && newVal.id && newVal.urlFoto) {
    try {
      // Richiesta ad axios per ottenere l'immagine dell'organizzazione
      const response = await axios.get('/api/images/organizzazione', {
        params: {name: newVal.urlFoto},
        responseType: 'blob'
      });
      photoUrl.value = URL.createObjectURL(response.data);

    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, {immediate: true});

// Funzione per tornare alla pagina precedente
const goBack = () => {
  router.go(-1);
};

// Funzione per aprire il selettore di file
const uploadPhoto = () => {
  if (fileInputRef.value instanceof HTMLInputElement) {
    fileInputRef.value.click();
  }
};

// Gestisce il cambiamento del file selezionato
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement | null;
  if (input && input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target as FileReader | null;
      if (target && target.result) {
        photoUrl.value = target.result.toString();
      }
    };
    reader.readAsDataURL(file);
  }
};

// Rimuove la foto caricata
const removePhoto = () => {
  photoUrl.value = ''; // Rimuove l'anteprima della foto
  const uploadInput = document.getElementById('photo-upload') as HTMLInputElement | null;

  if (uploadInput) {
    uploadInput.value = ''; // Resetta l'input file
  }
  deleted.value = 'true';
};

// Resetta il form e i valori prima di lasciare la pagina
onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage; // Imposta il valore iniziale
  if (fileInputRef.value) {
    fileInputRef.value.value = ''; // Resetta l'input del file
  }
  formRef.value?.reset();
});

// Invia il form con i dati aggiornati
const submitForm = () => {
  if (formRef.value) {
    if (formRef.value.reportValidity()) {
      const formData = new FormData(formRef.value);
      if (fileInputRef.value && fileInputRef.value.files && fileInputRef.value.files[0]) {
        formData.append('foto', fileInputRef.value.files[0]);
      }

      console.log(props.organizzazione);
      axios.put(`/api/organizzazione/update/${props.organizzazione.id}`, formData)
          .then(response => {
            // Debug: Stampa i dati del form
            for (let [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }

            if (response.status === 200) {
              router.push({
                name: 'Organizzazione',
                params: {
                  id: response.data
                }
              })
            }
          })
          .catch(error => {
            console.error(error);
            errorMessage.value = error.response.data;
          });
    }
  }
};

// Ottiene l'URL del link social
const getLinkUrl = (nomeSocial: string): string => {
  const link = props.organizzazione.link.find(l => l.nomeSocial === nomeSocial);
  return link ? link.url : '';
};

// Carica i dati iniziali al montaggio del componente
onMounted(async () => {
  try {
    marzel.value = (await axios.get('/api/homepage/marzel')).data;
    console.log(JSON.stringify(marzel.value));
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <div v-if="organizzazione">

    <section class="edit-form-section" aria-labelledby="edit-form-title" id="edit-form">

      <article class="form-header">
        <h1 id="edit-form-title">Modifica la tua organizzazione</h1>
        <section class="form-buttons">
          <button type="button" id="cancel-button" class="form-button" aria-label="Annulla modifica" @click="goBack">
            Annulla
          </button>
          <button type="button" id="save-button" class="form-button" aria-label="Salva modifiche"
                  @click="submitForm">Salva Modifiche
          </button>
        </section>
      </article>

      <form class="edit-form" ref="formRef">

        <div class="photo-row" aria-live="polite">
          <img class="photo-upload-circle" @click="uploadPhoto" :src="photoUrl || defaultImage"
               alt="Foto organizzazione" aria-label="Carica o modifica foto organizzazione">
          <input type="file" id="photo-upload" name="foto" ref="fileInputRef" @change="handleFileChange"
                 style="display: none;" accept="image/*" aria-hidden="true">
          <img src="@/assets/images/creaOrganizzazioneImages/edit.png" alt="Icona modifica foto" width="32" height="32"
               style="margin-left: 10px;">
          <label for="photo-upload" style="margin-left: 20px;">Imposta foto organizzazione</label>
          <button v-if="photoUrl" class="remove-button" type="button" @click="removePhoto" style="margin-left: 20px;"
                  aria-label="Rimuovi foto organizzazione">Rimuovi Foto
          </button>
          <input type="hidden" name="deleted" id="deleted" v-model="deleted">

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <div class="fields-row">
          <div class="form-column">

            <label for="name">Nome organizzazione *</label>
            <input type="text" id="name" name="nome" v-model="organizzazione.nome" required aria-required="true"
                   aria-label="Nome organizzazione"
                   maxlength="45">

            <label for="email">Email *</label>
            <input type="email" id="email" name="mail" v-model="organizzazione.mail" required aria-required="true"
                   aria-label="Email organizzazione"
                   maxlength="254">

            <label for="phone">Telefono</label>
            <input type="tel" id="phone" name="telefono" v-model="organizzazione.telefono"
                   aria-label="Telefono organizzazione"
                   maxlength="15">

            <label for="state">Stato</label>
            <input type="text" id="state" name="stato" v-model="organizzazione.stato" aria-label="Stato organizzazione"
                   maxlength="45">

            <label for="province">Provincia</label>
            <input type="text" id="province" name="provincia" v-model="organizzazione.provincia"
                   aria-label="Provincia organizzazione"
                   maxlength="45">

            <label for="city">Città</label>
            <input type="text" id="city" name="città" v-model="organizzazione.città" aria-label="Città organizzazione"
                   maxlength="45">

            <label for="cap">CAP</label>
            <input type="text" id="cap" name="cap" v-model="organizzazione.cap" aria-label="CAP organizzazione"
                   pattern="\d{5}">

            <label for="street">Via</label>
            <input type="text" id="street" name="via" v-model="organizzazione.via" aria-label="Via organizzazione"
                   maxlength="45">

            <label for="civic">Numero civico</label>
            <input type="text" id="civic" name="numCivico" v-model="organizzazione.numCivico"
                   aria-label="Numero civico organizzazione"
                   maxlength="10">

          </div>

          <div class="form-column">
            <label for="description">Descrizione</label>
            <textarea id="description" name="descrizione" v-model="organizzazione.descrizione"
                      aria-label="Descrizione organizzazione"></textarea>

            <label for="iban">IBAN</label>
            <input type="text" id="iban" name="iban" v-model="organizzazione.iban" aria-label="IBAN organizzazione"
                   minlength="15"
                   maxlength="34"
                   pattern="[A-Z0-9]+">

            <label for="website">Sito web</label>
            <input type="url" id="website" name="sito" :value="getLinkUrl('Sito')"
                   aria-label="Inserisci link sito web organizzazione"
                   maxlength="2000">

            <label for="instagram">Instagram</label>
            <input type="url" id="instagram" name="instagram" :value="getLinkUrl('Instagram')"
                   aria-label="Inserisci link Instagram organizzazione"
                   maxlength="2000">

            <label for="facebook">Facebook</label>
            <input type="url" id="facebook" name="facebook" :value="getLinkUrl('Facebook')"
                   aria-label="Inserisci link Facebook organizzazione"
                   maxlength="2000">

            <label for="twitter">Twitter</label>
            <input type="url" id="twitter" name="twitter" :value="getLinkUrl('Twitter')"
                   aria-label="Inserisci link Twitter organizzazione"
                   maxlength="2000">

            <label for="linkedin">Linkedin</label>
            <input type="url" id="linkedin" name="linkedin" :value="getLinkUrl('Linkedin')"
                   aria-label="Inserisci link Linkedin organizzazione"
                   maxlength="2000">
          </div>

        </div>

        <input type="hidden" name="idAdmin" :value="marzel?.id">
        <input type="submit" style="display: none;" aria-hidden="true">

      </form>
    </section>
  </div>
</template>

<style scoped>
@import "@/assets/css/CreaModificaOrganizzazione.css";
</style>