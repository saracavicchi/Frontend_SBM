<script setup lang="ts">
import {defineProps, onMounted, type PropType, ref, watch} from 'vue';
import axios from 'axios';
import {onBeforeRouteLeave, useRouter} from 'vue-router';
import type {Organizzazione} from "@/types/organizzazioneType";
import {AxiosError} from 'axios';
import defaultImage from "@/assets/images/creaOrganizzazioneImages/profilo.jpg";
import type {Organizzatore} from "@/types/organizzatoreType";

// Definizione delle proprietà passate al componente
const props = defineProps({
  organizzazione: {
    type: Object as PropType<Organizzazione>,
    required: true
  }
});

// Dati dell'organizzatore corrente
const orgLoggato = ref<Organizzatore>();

// URL della foto dell'organizzazione
const photoUrl = ref('');

// Riferimento all'input file per la foto
const fileInputRef = ref<HTMLInputElement | null>(null);

// Riferimento al form per la modifica dell'organizzazione
const formRef = ref<HTMLFormElement | null>(null);

const router = useRouter();

// Messaggio di errore reattivo
const errorMessage = ref('');

// Stato che indica se la foto è stata eliminata
const deleted = ref('false');

// Osserva le modifiche alla proprietà dell'organizzazione per aggiornare l'immagine di conseguenza
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
  deleted.value = 'true';
};

// Eseguito prima di lasciare la rotta corrente per ripulire lo stato del componente
onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  formRef.value?.reset();
});

// Funzione per inviare il form di modifica dell'organizzazione
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

            //for (let [key, value] of formData.entries()) {
              //console.log(`${key}: ${value}`);
            //}

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


// Funzione per ottenere l'URL di un link sociale specifico
const getLinkUrl = (nomeSocial: string): string => {
  const link = props.organizzazione.link.find(l => l.nomeSocial === nomeSocial);
  return link ? link.url : '';
};


// Eseguito al montaggio del componente per recuperare i dati dell'organizzatore
onMounted(async () => {
  try {
    orgLoggato.value = (await axios.get('/api/homepage/utente')).data;
    console.log(JSON.stringify(orgLoggato.value));
    //console.log (props.organizzazione);
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
});
</script>

<template>
  <div v-if="organizzazione">

    <!-- Sezione per la modifica di un'organizzazione -->
    <section class="edit-form-section" aria-labelledby="edit-form-title" id="edit-form">

      <!-- Intestazione del form -->
      <article class="form-header">
        <h1 id="edit-form-title">Modifica la tua organizzazione</h1>

        <!-- Pulsanti per annullare o salvare le modifiche -->
        <section class="form-buttons">
          <button type="button" id="cancel-button" class="form-button" aria-label="Annulla modifica" @click="goBack">
            Annulla
          </button>
          <button type="button" id="save-button" class="form-button" aria-label="Salva modifiche"
                  @click="submitForm">Salva Modifiche
          </button>
        </section>
      </article>

      <!-- Form per la modifica dell'organizzazione -->
      <form class="edit-form" ref="formRef">

        <!-- Sezione per l'upload della foto dell'organizzazione -->
        <div class="photo-row" aria-live="polite">

          <!-- Foto dell'organizzazione -->
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

          <!-- Messaggio di errore -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <!-- Sezione per i campi del form -->
        <div class="fields-row">
          <div class="form-column">

            <!-- Nome -->
            <label for="name">Nome organizzazione *</label>
            <input type="text" id="name" name="nome" v-model="organizzazione.nome" required aria-required="true"
                   aria-label="Nome organizzazione"
                   maxlength="45">

            <!-- Email -->
            <label for="email">Email *</label>
            <input type="email" id="email" name="mail" v-model="organizzazione.mail" required aria-required="true"
                   aria-label="Email organizzazione"
                   maxlength="254">

            <!-- Telefono -->
            <label for="phone">Telefono</label>
            <input type="tel" id="phone" name="telefono" v-model="organizzazione.telefono"
                   aria-label="Telefono organizzazione"
                   maxlength="15">

            <!-- Stato -->
            <label for="state">Stato</label>
            <input type="text" id="state" name="stato" v-model="organizzazione.stato" aria-label="Stato organizzazione"
                   maxlength="45">

            <!-- Provincia -->
            <label for="province">Provincia</label>
            <input type="text" id="province" name="provincia" v-model="organizzazione.provincia"
                   aria-label="Provincia organizzazione"
                   maxlength="45">

            <!-- Città -->
            <label for="city">Città</label>
            <input type="text" id="city" name="città" v-model="organizzazione.città" aria-label="Città organizzazione"
                   maxlength="45">

            <!-- CAP -->
            <label for="cap">CAP</label>
            <input type="text" id="cap" name="cap" v-model="organizzazione.cap" aria-label="CAP organizzazione"
                   pattern="\d{5}">

            <!-- Via -->
            <label for="street">Via</label>
            <input type="text" id="street" name="via" v-model="organizzazione.via" aria-label="Via organizzazione"
                   maxlength="45">

            <!-- Numero civico -->
            <label for="civic">Numero civico</label>
            <input type="text" id="civic" name="numCivico" v-model="organizzazione.numCivico"
                   aria-label="Numero civico organizzazione"
                   maxlength="10">

          </div>

          <div class="form-column">

            <!-- Descrizione -->
            <label for="description">Descrizione</label>
            <textarea id="description" name="descrizione" v-model="organizzazione.descrizione"
                      aria-label="Descrizione organizzazione"></textarea>

            <!-- IBAN -->
            <label for="iban">IBAN</label>
            <input type="text" id="iban" name="iban" v-model="organizzazione.iban" aria-label="IBAN organizzazione"
                   minlength="15"
                   maxlength="34"
                   pattern="[A-Z0-9]+">

            <!-- Sito web -->
            <label for="website">Sito web</label>
            <input type="url" id="website" name="sito" :value="getLinkUrl('Sito')"
                   aria-label="Inserisci link sito web organizzazione"
                   maxlength="2000">

            <!-- Instagram -->
            <label for="instagram">Instagram</label>
            <input type="url" id="instagram" name="instagram" :value="getLinkUrl('Instagram')"
                   aria-label="Inserisci link Instagram organizzazione"
                   maxlength="2000">

            <!-- Facebook -->
            <label for="facebook">Facebook</label>
            <input type="url" id="facebook" name="facebook" :value="getLinkUrl('Facebook')"
                   aria-label="Inserisci link Facebook organizzazione"
                   maxlength="2000">

            <!-- Twitter -->
            <label for="twitter">Twitter</label>
            <input type="url" id="twitter" name="twitter" :value="getLinkUrl('Twitter')"
                   aria-label="Inserisci link Twitter organizzazione"
                   maxlength="2000">

            <!-- Linkedin -->
            <label for="linkedin">Linkedin</label>
            <input type="url" id="linkedin" name="linkedin" :value="getLinkUrl('Linkedin')"
                   aria-label="Inserisci link Linkedin organizzazione"
                   maxlength="2000">
          </div>

        </div>

        <!-- Input nascosto per l'id dell'admin -->
        <input type="hidden" name="idAdmin" :value="orgLoggato?.id">

        <input type="submit" style="display: none;" aria-hidden="true">

      </form>
    </section>
  </div>
</template>

<style scoped>
@import "@/assets/css/CreaModificaOrganizzazione.css";
</style>