<script setup lang="ts">

import {onBeforeRouteLeave, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

import defaultImage from '@/assets/images/creaOrganizzazioneImages/profilo.jpg';
import type {Organizzatore} from "@/types/organizzatoreType";

// Messaggio di errore reattivo
const errorMessage = ref('');

const router = useRouter();

// URL della foto dell'organizzazione
const photoUrl = ref('');

// Riferimento all'input file per la foto
const fileInputRef = ref<HTMLInputElement | null>(null);

// Riferimento al form per la creazione dell'organizzazione
const formRef = ref<HTMLFormElement | null>(null);

// Dati dell'organizzatore corrente
const orgLoggato = ref<Organizzatore>();

// Funzione per tornare alla pagina precedente
const goBack = () => {
  router.go(-1);
}

// Funzione per aprire il selettore di file per la foto
const uploadPhoto = () => {
  if (fileInputRef.value instanceof HTMLInputElement) {
    fileInputRef.value.click();
  }
};

// Gestisce il cambio del file selezionato, mostrando l'anteprima della foto
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement | null;
  if (input && input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    // Callback per ottenere l'url dell'immagine
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
  photoUrl.value = '';
  const uploadInput = document.getElementById('photo-upload') as HTMLInputElement | null;
  if (uploadInput) {
    uploadInput.value = '';
  }
};

// Funzione per inviare il form di creazione dell'organizzazione
const submitForm = () => {
  if (formRef.value) {
    // Validazione form
    if (formRef.value.reportValidity()) {

      // Creazione form data e append foto
      const formData = new FormData(formRef.value);
      if (fileInputRef.value && fileInputRef.value.files && fileInputRef.value.files[0]) {
        formData.append('foto', fileInputRef.value.files[0]);
      }

      // Chiamata al server per la creazione dell'organizzazione
      axios.post('/api/organizzazione/creaOrganizzazione', formData)
          .then(response => {
            console.log(response.data);

            // Se la creazione è andata a buon fine, reindirizza alla pagina dell'organizzazione
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

// Eseguito prima di lasciare la rotta corrente per ripulire lo stato
onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  formRef.value?.reset();
});


// Eseguito al montaggio del componente per recuperare i dati dell'organizzatore
onMounted(async () => {
  try {
    // Recupero i dati dell'organizzatore loggato
    orgLoggato.value = (await axios.get('/api/homepage/utente')).data;
    console.log(JSON.stringify(orgLoggato.value));
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});

</script>

<template>

  <!-- Sezione per la creazione di una nuova organizzazione -->
  <section class="creation-form-section" aria-labelledby="creation-form-title" id="creation-form">

    <!-- Intestazione del form -->
    <article class="form-header">
      <h1 id="creation-form-title">Crea la tua organizzazione</h1>

      <!-- Pulsanti del form -->
      <section class="form-buttons">
        <button type="button" id="cancel-button" class="form-button" aria-label="Annulla creazione" @click="goBack">
          Annulla
        </button>
        <button type="button" id="create-button" class="form-button" aria-label="Conferma creazione"
                @click="submitForm">Crea
        </button>
      </section>

    </article>

    <!-- Form per la creazione dell'organizzazione -->
    <form class="creation-form" ref="formRef">

      <!-- Sezione foto dell'organizzazione -->
      <div class="photo-row" aria-live="polite">

        <!-- Foto dell'organizzazione -->
        <img class="photo-upload-circle" @click="uploadPhoto" :src="photoUrl || defaultImage"
             alt="Foto organizzazione" aria-label="Carica o modifica foto organizzazione">
        <input type="file" id="photo-upload" name="foto" ref="fileInputRef" @change="handleFileChange"
               style="display: none;"
               accept="image/*" aria-hidden="true">

        <!-- Icona modifica foto -->
        <img src="@/assets/images/creaOrganizzazioneImages/edit.png" alt="Icona modifica foto" width="32" height="32"
             style="margin-left: 10px;">


        <label for="photo-upload" style="margin-left: 20px;">Imposta foto organizzazione</label>

        <!-- Pulsante per rimuovere la foto -->
        <button v-if="photoUrl" class="remove-button" type="button" @click="removePhoto" style="margin-left: 20px;"
                aria-label="Rimuovi foto organizzazione">Rimuovi Foto
        </button>

        <!-- Messaggio di errore -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      </div>

      <!-- Sezione campi del form -->
      <div class="fields-row">

        <div class="form-column">

          <!-- nome -->
          <label for="name">Nome organizzazione *</label>
          <input type="text" id="name" name="nome" required aria-required="true"
                 aria-label="Inserisci nome organizzazione"
                 maxlength="45">

          <!-- email -->
          <label for="email">Email *</label>
          <input type="email" id="email" name="mail" required aria-required="true"
                 aria-label="Inserisci email organizzazione"
                 maxlength="254">

          <!-- telefono -->
          <label for="phone">Telefono</label>
          <input type="tel" id="phone" name="telefono" aria-label="Inserisci numero di telefono organizzazione"
                 maxlength="15">

          <!-- stato -->
          <label for="state">Stato</label>
          <input type="text" id="state" name="stato" aria-label="Inserisci stato/nazione organizzazione"
                 maxlength="45">

          <!-- provincia -->
          <label for="province">Provincia</label>
          <input type="text" id="province" name="provincia" aria-label="Inserisci provincia organizzazione"
                 maxlength="45">

          <!-- città -->
          <label for="city">Città</label>
          <input type="text" id="city" name="città" aria-label="Inserisci città organizzazione"
                 maxlength="45">

          <!-- cap -->
          <label for="cap">CAP</label>
          <input type="text" id="cap" name="cap" aria-label="Inserisci CAP organizzazione"
                 pattern="\d{5}">

          <!-- via -->
          <label for="street">Via</label>
          <input type="text" id="street" name="via" aria-label="Inserisci via organizzazione"
                 maxlength="45">

          <!-- numero civico -->
          <label for="civic">Numero civico</label>
          <input type="text" id="civic" name="numCivico" aria-label="Inserisci numero civico organizzazione"
                 maxlength="10">

        </div>

        <div class="form-column">

          <!-- descrizione -->
          <label for="description">Descrizione</label>
          <textarea id="description" name="descrizione" aria-label="Inserisci descrizione organizzazione"></textarea>

          <!-- iban -->
          <label for="iban">IBAN</label>
          <input type="text" id="iban" name="iban" aria-label="Inserisci IBAN organizzazione"
                 minlength="15"
                 maxlength="34"
                 pattern="[A-Z0-9]+">

          <!-- link sito web -->
          <label for="website">Sito web</label>
          <input type="url" id="website" name="sito" aria-label="Inserisci link sito web organizzazione"
                 maxlength="2000">

          <!-- link instagram -->
          <label for="instagram">Instagram</label>
          <input type="url" id="instagram" name="instagram" aria-label="Inserisci link Instagram organizzazione"
                 maxlength="2000">

          <!-- link facebook -->
          <label for="facebook">Facebook</label>
          <input type="url" id="facebook" name="facebook" aria-label="Inserisci link Facebook organizzazione"
                 maxlength="2000">

          <!-- link twitter -->
          <label for="twitter">Twitter</label>
          <input type="url" id="twitter" name="twitter" aria-label="Inserisci link Twitter organizzazione"
                 maxlength="2000">

          <!-- link linkedin -->
          <label for="linkedin">Linkedin</label>
          <input type="url" id="linkedin" name="linkedin" aria-label="Inserisci link Linkedin organizzazione"
                 maxlength="2000">

        </div>

      </div>

      <!-- Input nascosto per l'id dell'admin -->
      <input type="hidden" name="idAdmin" :value="orgLoggato?.id">
      <input type="submit" style="display: none;" aria-hidden="true">

    </form>
  </section>

</template>


<style scoped>
@import "@/assets/css/CreaModificaForm.css";

</style>