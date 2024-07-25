<script setup lang="ts">

import {onBeforeRouteLeave, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';
import type {Organizzatore} from "@/types/organizzatoreType";

const errorMessage = ref('');

const router = useRouter();
const photoUrl = ref('');

const fileInputRef = ref<HTMLInputElement | null>(null);

const formRef = ref<HTMLFormElement | null>(null);

const marzel = ref<Organizzatore>();

const goBack = () => {
  router.go(-1);
}

const uploadPhoto = () => {
  if (fileInputRef.value instanceof HTMLInputElement) {
    fileInputRef.value.click();
  }
};

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

const removePhoto = () => {
  photoUrl.value = ''; // Rimuove l'anteprima della foto
  const uploadInput = document.getElementById('photo-upload') as HTMLInputElement | null;
  if (uploadInput) {
    uploadInput.value = ''; // Resetta l'input file
  }
};

const submitForm = () => {
  if (formRef.value) {
    if (formRef.value.reportValidity()) {
      const formData = new FormData(formRef.value);
      if (fileInputRef.value && fileInputRef.value.files && fileInputRef.value.files[0]) {
        formData.append('foto', fileInputRef.value.files[0]);
      }

      axios.post('/api/organizzazione/creaOrganizzazione', formData)
          .then(response => {
            console.log(response.data);

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

onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage; // Imposta il valore iniziale
  if (fileInputRef.value) {
    fileInputRef.value.value = ''; // Resetta l'input del file
  }
  formRef.value?.reset();
});


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

  <section class="creation-form-section" aria-labelledby="creation-form-title" id="creation-form">


    <article class="form-header">
      <h1 id="creation-form-title">Crea la tua organizzazione</h1>

      <section class="form-buttons">
        <button type="button" id="cancel-button" class="form-button" aria-label="Annulla creazione" @click="goBack">
          Annulla
        </button>
        <button type="button" id="create-button" class="form-button" aria-label="Conferma creazione"
                @click="submitForm">Crea
        </button>
      </section>

    </article>

    <form class="creation-form" ref="formRef">

      <div class="photo-row" aria-live="polite">

        <img class="photo-upload-circle" @click="uploadPhoto" :src="photoUrl || defaultImage"
             alt="Foto organizzazione" aria-label="Carica o modifica foto organizzazione">
        <input type="file" id="photo-upload" name="foto" ref="fileInputRef" @change="handleFileChange"
               style="display: none;"
               accept="image/*" aria-hidden="true">

        <!-- image edit.png -->
        <img src="@/assets/images/creaOrganizzazioneImages/edit.png" alt="Icona modifica foto" width="32" height="32"
             style="margin-left: 10px;">

        <label for="photo-upload" style="margin-left: 20px;">Imposta foto organizzazione</label>
        <button v-if="photoUrl" class="remove-button" type="button" @click="removePhoto" style="margin-left: 20px;"
                aria-label="Rimuovi foto organizzazione">Rimuovi Foto
        </button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      </div>

      <div class="fields-row">

        <div class="form-column">

          <!-- nome -->
          <label for="name">Nome organizzazione *</label>
          <input type="text" id="name" name="nome" required aria-required="true"
                 aria-label="Inserisci nome organizzazione">

          <!-- email -->
          <label for="email">Email *</label>
          <input type="email" id="email" name="mail" required aria-required="true"
                 aria-label="Inserisci email organizzazione">

          <!-- telefono -->
          <label for="phone">Telefono</label>
          <input type="tel" id="phone" name="telefono" aria-label="Inserisci numero di telefono organizzazione">

          <!-- stato -->
          <label for="state">Stato</label>
          <input type="text" id="state" name="stato" aria-label="Inserisci stato/nazione organizzazione">

          <!-- provincia -->
          <label for="province">Provincia</label>
          <input type="text" id="province" name="provincia" aria-label="Inserisci provincia organizzazione">

          <!-- città -->
          <label for="city">Città</label>
          <input type="text" id="city" name="città" aria-label="Inserisci città organizzazione">

          <!-- cap -->
          <label for="cap">CAP</label>
          <input type="text" id="cap" name="cap" aria-label="Inserisci CAP organizzazione">

          <!-- via -->
          <label for="street">Via</label>
          <input type="text" id="street" name="via" aria-label="Inserisci via organizzazione">

          <!-- numero civico -->
          <label for="civic">Numero civico</label>
          <input type="text" id="civic" name="numCivico" aria-label="Inserisci numero civico organizzazione">

        </div>

        <div class="form-column">

          <!-- descrizione -->
          <label for="description">Descrizione</label>
          <textarea id="description" name="descrizione" aria-label="Inserisci descrizione organizzazione"></textarea>

          <!-- iban -->
          <label for="iban">IBAN</label>
          <input type="text" id="iban" name="iban" aria-label="Inserisci IBAN organizzazione">

          <!-- link sito web -->
          <label for="website">Sito web</label>
          <input type="url" id="website" name="sito" aria-label="Inserisci link sito web organizzazione">

          <!-- link instagram -->
          <label for="instagram">Instagram</label>
          <input type="url" id="instagram" name="instagram" aria-label="Inserisci link Instagram organizzazione">

          <!-- link facebook -->
          <label for="facebook">Facebook</label>
          <input type="url" id="facebook" name="facebook" aria-label="Inserisci link Facebook organizzazione">

          <!-- link twitter -->
          <label for="twitter">Twitter</label>
          <input type="url" id="twitter" name="twitter" aria-label="Inserisci link Twitter organizzazione">

          <!-- link linkedin -->
          <label for="linkedin">Linkedin</label>
          <input type="url" id="linkedin" name="linkedin" aria-label="Inserisci link Linkedin organizzazione">

        </div>

      </div>

      <input type="hidden" name="idAdmin" :value="marzel?.id">
      <input type="submit" style="display: none;" aria-hidden="true">

    </form>
  </section>

</template>


<style scoped>
@import "@/assets/css/CreaModificaOrganizzazione.css";

</style>