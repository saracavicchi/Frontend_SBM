<script setup lang="ts">


import {computed, defineProps, type PropType, ref, watch} from "vue";
import type {Organizzatore} from "@/types/organizzatoreType";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import defaultImage from "@/assets/images/creaOrganizzazioneImages/profilo.jpg";
import axios from "axios";
import type {Carta} from "@/types/cartaType";

// Definizione delle proprietà del componente
const props = defineProps({
  organizzatore: {
    type: Object as PropType<Organizzatore>,
    required: true
  }
});


const router = useRouter();

// Sezione attiva del form, anagrafica di default
const activeSection = ref('anagrafica');

// Riferimento al form
const formRef = ref<HTMLFormElement | null>(null);

// URL dell'immagine dell'organizzatore
const photoUrl = ref('');

// Riferimento all'input file per caricare l'immagine
const fileInputRef = ref<HTMLInputElement | null>(null);

// Messaggio di errore del server
const errorMessage = ref('');

// Flag per indicare se l'immagine è stata eliminata
const deleted = ref('false');

// Funzione per tornare alla pagina precedente
const goBack = () => {
  router.go(-1);
};

// Funzione per caricare l'immagine, apre il file dialog
const uploadPhoto = () => {
  if (fileInputRef.value instanceof HTMLInputElement) {
    fileInputRef.value.click();
  }
};

// Funzione per ottenere l'url di un social a partire dal nome del social
const getLinkUrl = (nomeSocial: string): string => {
  const link = props.organizzatore.link.find(l => l.nomeSocial === nomeSocial);
  return link ? link.url : '';
};

// Funzione per gestire il cambio di file immagine
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
    // Legge il file come data url
    reader.readAsDataURL(file);
  }
};

// Funzione per rimuovere l'immagine
const removePhoto = () => {
  photoUrl.value = '';
  const uploadInput = document.getElementById('photo-upload') as HTMLInputElement | null;

  if (uploadInput) {
    uploadInput.value = '';
  }
  deleted.value = 'true';
};

// Funzione per resettare lo stato del form prima di uscire dalla pagina
onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  formRef.value?.reset();
});


// Osserva le modifiche alla proprietà dell'organizzatore per aggiornare l'immagine di conseguenza
watch(() => props.organizzatore, async (newVal) => {
  if (newVal && newVal.id && newVal.urlFoto) {
    try {
      // Richiesta ad axios per ottenere l'immagine dell'organizzatore
      const response = await axios.get('/api/images/organizzatore', {
        params: {name: newVal.urlFoto},
        responseType: 'blob'
      });
      photoUrl.value = URL.createObjectURL(response.data);

    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }
}, {immediate: true});

// Funzione per formattare la data nel formato MM/YY
const formatDate = (date: string): string => {
  const [year, month] = date.split('-');
  return `${month}/${year.slice(2)}`;
};

// Funzione per ottenere il campo di una carta, se è la data la formatta
const getCardField = (index: number, field: keyof Carta) => {
  return computed(() => {
    const card = props.organizzatore.carte[index - 1];
    if (card) {
      if (field === 'dataScadenza') {
        return formatDate(card.dataScadenza);
      }
      return card[field];
    }
    return '';
  });
};

// Funzione per salvare le modifiche al profilo, invia il form dopo la validazione
const submitForm = () => {
  if (formRef.value) {
    // Validazione di html5 del form
    if (formRef.value.reportValidity()) {

      // Controllo che tutti i campi di una carta siano completi o vuoti
      if (!checkCardFields()) {
        alert('Per ciascuna carta, tutti i campi devono essere completi oppure tutti vuoti.');
        return;
      }

      // Creazione di un oggetto FormData per inviare i dati
      const formData = new FormData(formRef.value);
      // Aggiunta dell'eventuale immagine
      if (fileInputRef.value && fileInputRef.value.files && fileInputRef.value.files[0]) {
        formData.append('foto', fileInputRef.value.files[0]);
      }

      // Conversione della data di scadenza delle carte in formato YYYY-MM-DD
      for (let i = 1; i <= 3; i++) {
        const fieldName = `dataScadenza${i}`;
        const fieldValue = formData.get(fieldName) as string;
        if (fieldValue) {
          formData.set(fieldName, convertToLastDayOfMonth(fieldValue));
        }
      }

      // Invio della richiesta di modifica al server
      axios.put(`/api/organizzatore/update/${props.organizzatore.id}`, formData)
          .then(response => {

            // Se la risposta è positiva, reindirizza alla homepage
            if (response.status === 200) {
              router.push({
                name: 'Homepage'
              })
            }
          })
          // Se c'è un errore, mostra un messaggio di errore e torna alla sezione anagrafica per visualizzarlo
          .catch(error => {
            console.error(error);
            activeSection.value = 'anagrafica';
            errorMessage.value = error.response.data;
          });
    }
  }
};

// Funzione per convertire la data in formato YYYY-MM-DD
const convertToLastDayOfMonth = (date: string): string => {
  console.log(date);
  const [month, year] = date.split('/');
  const lastDay = new Date(Number(`20${year}`), Number(month), 0).getDate();
  return `20${year}-${month}-${lastDay}`;
};

// Funzione per controllare che tutti i campi delle carte inserite siano completi o vuoti
const checkCardFields = () => {
  for (let i = 1; i <= 3; i++) {
    const cardNumber = (document.getElementById(`cardNumber${i}`) as HTMLInputElement).value.trim();
    const expirationDate = (document.getElementById(`expirationDate${i}`) as HTMLInputElement).value.trim();
    const cvv = (document.getElementById(`cvv${i}`) as HTMLInputElement).value.trim();
    const cardHolder = (document.getElementById(`cardHolder${i}`) as HTMLInputElement).value.trim();
    const cardHolderSurname = (document.getElementById(`cardHolderSurname${i}`) as HTMLInputElement).value.trim();

    const allFieldsEmpty = !cardNumber && !expirationDate && !cvv && !cardHolder && !cardHolderSurname;
    const allFieldsFilled = cardNumber && expirationDate && cvv && cardHolder && cardHolderSurname;

    if (!allFieldsEmpty && !allFieldsFilled) {
      return false;
    }
  }
  return true;
};

// Funzione per resettare i campi di una carta
const resetCardFields = (index: number) => {
  (document.getElementById(`cardNumber${index}`) as HTMLInputElement).value = '';
  (document.getElementById(`expirationDate${index}`) as HTMLInputElement).value = '';
  (document.getElementById(`cvv${index}`) as HTMLInputElement).value = '';
  (document.getElementById(`cardHolder${index}`) as HTMLInputElement).value = '';
  (document.getElementById(`cardHolderSurname${index}`) as HTMLInputElement).value = '';
};

</script>

<template>

  <div v-if="organizzatore">

    <!-- Sezione per la modifica del profilo dell'organizzatore -->
    <section class="edit-form-section" aria-labelledby="edit-organizzatore-tile">


      <!-- Intestazione del form -->
      <article class="form-header">
        <h1 id="edit-organizzatore-title">Modifica il tuo profilo</h1>

        <!-- Pulsanti per annullare o salvare le modifiche -->
        <section class="form-buttons">
          <button type="button" id="cancel-button" class="form-button" aria-label="Annulla modifica" @click="goBack" accesskey="u">
            Annulla
          </button>
          <button type="button" id="save-button" class="form-button" aria-label="Salva modifiche" @click="submitForm" accesskey="v">
            Salva Modifiche
          </button>
        </section>
      </article>


      <!-- Sezione per la selezione della sezione del form -->
      <nav aria-label="Seleziona sezione del form">

        <!-- Sezione anagrafica -->
        <button @click="activeSection = 'anagrafica'"
                :class="{ selected: activeSection === 'anagrafica', notSelected: activeSection !== 'anagrafica' }"
                aria-label="Vai alla sezione anagrafica" accesskey="w">
          Anagrafica
        </button>

        <!-- Sezione social -->
        <button @click="activeSection = 'social'"
                :class="{ selected: activeSection === 'social', notSelected: activeSection !== 'social' }"
                aria-label="Vai alla sezione social" accesskey="x">
          Social
        </button>

        <!-- Sezione pagamenti -->
        <button @click="activeSection = 'pagamenti'"
                :class="{ selected: activeSection === 'pagamenti', notSelected: activeSection !== 'pagamenti' }"
                aria-label="Vai alla sezione pagamenti" accesskey="y">
          Pagamenti
        </button>
      </nav>


      <!-- Form per la modifica del profilo -->
      <form class="edit-form" style="margin-top: 30px;" ref="formRef">

        <!-- Sezione anagrafica -->
        <section class="form-section"
                 :class="{ 'active' : activeSection === 'anagrafica', 'not-active' : activeSection !== 'anagrafica' }"
                 aria-label="Sezione anagrafica">

          <div class="photo-row" aria-live="polite">

            <!-- Foto dell'organizzazione -->
            <img class="photo-upload-circle" @click="uploadPhoto" :src="photoUrl || defaultImage"
                 alt="Foto profilo" aria-label="Carica o modifica foto profilo">
            <input type="file" id="photo-upload" name="foto" ref="fileInputRef" @change="handleFileChange"
                   style="display: none;" accept="image/*" aria-hidden="true">
            <img src="@/assets/images/creaOrganizzazioneImages/edit.png" alt="Icona modifica foto" width="32"
                 height="32"
                 style="margin-left: 10px;">
            <label for="photo-upload" style="margin-left: 20px;">Imposta foto profilo</label>
            <button v-if="photoUrl" class="remove-button" type="button" @click="removePhoto" style="margin-left: 20px;"
                    aria-label="Rimuovi foto profilo">Rimuovi Foto
            </button>
            <input type="hidden" name="deleted" id="deleted" v-model="deleted">

            <!-- Messaggio di errore -->
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          </div>

          <div class="fields-row">

            <div class="form-column">

              <!-- Nome -->
              <label for="name">Nome *</label>
              <input type="text" id="name" name="nome" v-model="organizzatore.nome" required aria-required="true"
                     aria-label="Nome"
                     maxlength="45">

              <!-- Cognome -->
              <label for="cognome">Cognome *</label>
              <input type="text" id="cognome" name="cognome" v-model="organizzatore.cognome" required
                     aria-required="true"
                     aria-label="Cognome"
                     maxlength="45">

              <!-- Username -->
              <label for="usernae">Username *</label>
              <input type="text" id="username" name="username" v-model="organizzatore.username" required
                     aria-required="true"
                     aria-label="Username"
                     maxlength="20">

              <!-- Email -->
              <label for="email">Email *</label>
              <input type="email" id="email" name="mail" v-model="organizzatore.mail" required aria-required="true"
                     aria-label="Email"
                     maxlength="254">

              <!-- Telefono -->
              <label for="telefono">Telefono</label>
              <input type="tel" id="telefono" name="telefono" v-model="organizzatore.telefono"
                     aria-label="Telefono"
                     maxlength="15">

              <!-- Data di nascita -->
              <label for="dataNascita">Data di nascita *</label>
              <input type="date" id="dataNascita" name="dataNascita" v-model="organizzatore.dataNascita" required
                     aria-required="true"
                     aria-label="Data di nascita">

              <!-- Codice Fiscale -->
              <label for="codFiscale">Codice Fiscale</label>
              <input type="text" id="codFiscale" name="codFiscale" v-model="organizzatore.codFiscale"
                     aria-label="Codice Fiscale"
                     maxlength="16"
                     minlength="16">

            </div>

            <div class="form-column">

              <!-- Bio -->
              <label for="bio">Bio</label>
              <textarea id="bio" name="bio" v-model="organizzatore.bio"
                        aria-label="Bio"></textarea>

              <!-- Stato -->
              <label for="state">Stato</label>
              <input type="text" id="state" name="stato" v-model="organizzatore.stato" aria-label="Stato"
                     maxlength="45">

              <!-- Provincia -->
              <label for="province">Provincia</label>
              <input type="text" id="province" name="provincia" v-model="organizzatore.provincia" aria-label="Provincia"
                     maxlength="45">

              <!-- Città -->
              <label for="city">Città</label>
              <input type="text" id="city" name="città" v-model="organizzatore.città" aria-label="Città"
                     maxlength="45">

              <!-- CAP -->
              <label for="cap">CAP</label>
              <input type="text" id="cap" name="cap" v-model="organizzatore.cap" aria-label="CAP"
                     pattern="\d{5}">

              <!-- Via -->
              <label for="via">Via</label>
              <input type="text" id="via" name="via" v-model="organizzatore.via" aria-label="Via"
                     maxlength="45">

              <!-- Numero civico -->
              <label for="civico">Numero civico</label>
              <input type="text" id="civico" name="numCivico" v-model="organizzatore.numCivico"
                     aria-label="Numero civico"
                     maxlength="10">


            </div>


          </div>


        </section>

        <!-- Sezione social -->
        <section class="form-section"
                 :class="{ 'active' : activeSection === 'social', 'not-active' : activeSection !== 'social' }"
                 aria-label="Sezione social">

          <div class="fields-row">

            <div class="form-column">

              <!-- Sito web -->
              <label for="website">Sito web</label>
              <input type="url" id="website" name="sito" :value="getLinkUrl('Sito')"
                     aria-label="Sito web personale"
                     maxlength="2000">

              <!-- Instagram -->
              <label for="instagram">Instagram</label>
              <input type="url" id="instagram" name="instagram" :value="getLinkUrl('Instagram')"
                     aria-label="Link Instagram"
                     maxlength="2000">

              <!-- Facebook -->
              <label for="facebook">Facebook</label>
              <input type="url" id="facebook" name="facebook" :value="getLinkUrl('Facebook')"
                     aria-label="Link Facebook"
                     maxlength="2000">

              <!-- Twitter -->
              <label for="twitter">Twitter</label>
              <input type="url" id="twitter" name="twitter" :value="getLinkUrl('Twitter')"
                     aria-label="Link Twitter"
                     maxlength="2000">

              <!-- Linkedin -->
              <label for="linkedin">Linkedin</label>
              <input type="url" id="linkedin" name="linkedin" :value="getLinkUrl('Linkedin')"
                     aria-label="Link Linkedin"
                     maxlength="2000">

            </div>

          </div>

        </section>

        <!-- Sezione pagamenti -->
        <section class="form-section"
                 :class="{ 'active' : activeSection === 'pagamenti', 'not-active' : activeSection !== 'pagamenti' }"
                 aria-label="Sezione pagamenti">


          <div class="fields-row">

            <div class="form-column">

              <!-- IBAN -->
              <label for="iban">IBAN</label>
              <input type="text" id="iban" name="iban" v-model="organizzatore.iban" aria-label="IBAN"
                     minlength="15"
                     maxlength="34"
                     pattern="[A-Z0-9]+">
            </div>


            <div class="form-column">

              <!-- Partita IVA -->
              <label for="piva">Partita IVA</label>
              <input type="text" id="piva" name="partitaIva" v-model="organizzatore.partitaIva" aria-label="Partita IVA"
                     pattern="\d{11}">
            </div>

          </div>


          <!-- Carte, 3 totali -->
          <div class="card" v-for="index in 3" :key="index" aria-labelledby="cards-title">

            <!-- Campo nascosto per l'id della carta -->
            <input type="hidden" :name="'idCarta' + index" :value="getCardField(index, 'id').value">

            <!-- Header della carta, con titolo e icona per eliminarla -->
            <div class="card-header">
              <h2 id="cards-title" class="card-title">Carta {{ index }}</h2>

              <!-- Icona per eliminare la carta -->
              <img class="delete-image" src="@/assets/images/organizzazioneImg/delete.png" alt="Icona elimina carta"
                   width="32" height="32"
                   aria-label="Elimina carta"
                   @click="resetCardFields(index)">
            </div>


            <div class="fields-row" style="margin-bottom: 10px;">

              <!-- Numero carta -->
              <label :for="'cardNumber' + index" style="text-wrap: nowrap;">Numero carta</label>
              <input type="text" :id="'cardNumber' + index" :name="'numero' + index"
                     v-model="getCardField(index, 'numero').value"
                     :aria-label="'Numero carta ' + index"
                     pattern="\d{16}">

            </div>

            <div class="fields-row">

              <div class="form-column">

                <!-- Data scadenza -->
                <label :for="'expirationDate' + index">Data scadenza</label>
                <input type="text" :id="'expirationDate' + index" :name="'dataScadenza' + index"
                       v-model="getCardField(index, 'dataScadenza').value"
                       :aria-label="'Data scadenza ' + index"
                       pattern="\d{2}/\d{2}">

                <!-- CVV -->
                <label :for="'cvv' + index">CVV</label>
                <input type="text" :id="'cvv' + index" :name="'cvv' + index"
                       v-model="getCardField(index, 'cvv').value"
                       :aria-label="'CVV ' + index"
                       pattern="\d{3}">
              </div>

              <div class="form-column">

                <!-- Nome intestatario -->
                <label :for="'cardHolder' + index">Nome intestatario</label>
                <input type="text" :id="'cardHolder' + index" :name="'nome' + index"
                       v-model="getCardField(index, 'nome').value"
                       :aria-label="'Nome intestatario ' + index"
                       maxlength="45">

                <!-- Cognome intestatario -->
                <label :for="'cardHolderSurname' + index">Cognome intestatario</label>
                <input type="text" :id="'cardHolderSurname' + index" :name="'cognome' + index"
                       v-model="getCardField(index, 'cognome').value"
                       :aria-label="'Cognome intestatario ' + index"
                       maxlength="45">

              </div>
            </div>
          </div>
        </section>

        <input type="submit" style="display: none;" aria-hidden="true">


      </form>

    </section>

  </div>


</template>

<style scoped>

@import "@/assets/css/CreaModificaForm.css";

/* Stile per bottone navigazione selezionato */
.selected {
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #3152a8;
}

/* Stile per bottone navigazione non selezionato */
.notSelected {
  background-color: #3152a8;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.notSelected:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* Stile per sezione attiva */
.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}

/* Stile per sezione non attiva */
.not-active {
  display: none;
}

/* Titolo della carta */
.card-title {
  color: white;
  text-align: center;
}

/* Stile per il box della carta */
.card {
  background-color: #007BFF;
  border-radius: 15px;
  padding: 15px 20px;
  margin: 20px;
}

/* Stile per l'icona di eliminazione di una carta */
.delete-image {
  cursor: pointer;
  transition: transform 0.2s;
}

.delete-image:hover {
  transform: scale(1.2);
}

/* Layout per l'header della carta */
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

</style>