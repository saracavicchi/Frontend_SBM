<script setup lang="ts">


import {computed, defineProps, type PropType, ref, watch} from "vue";
import type {Organizzatore} from "@/types/organizzatoreType";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import defaultImage from "@/assets/images/creaOrganizzazioneImages/profilo.jpg";
import axios from "axios";
import type {Carta} from "@/types/cartaType";

const props = defineProps({
  organizzatore: {
    type: Object as PropType<Organizzatore>,
    required: true
  }
});

const router = useRouter();

const activeSection = ref('anagrafica');

const formRef = ref<HTMLFormElement | null>(null);

const photoUrl = ref('');

const fileInputRef = ref<HTMLInputElement | null>(null);

const errorMessage = ref('');

const deleted = ref('false');

const goBack = () => {
  router.go(-1);
};

const uploadPhoto = () => {
  if (fileInputRef.value instanceof HTMLInputElement) {
    fileInputRef.value.click();
  }
};

const getLinkUrl = (nomeSocial: string): string => {
  const link = props.organizzatore.link.find(l => l.nomeSocial === nomeSocial);
  return link ? link.url : '';
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
        deleted.value = 'true';
      }
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  photoUrl.value = '';
  const uploadInput = document.getElementById('photo-upload') as HTMLInputElement | null;

  if (uploadInput) {
    uploadInput.value = '';
  }
  deleted.value = 'true';
};

onBeforeRouteLeave(() => {
  errorMessage.value = '';
  photoUrl.value = defaultImage;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  formRef.value?.reset();
});


// Osserva le modifiche alla proprietà dell'organizzazione per aggiornare l'immagine di conseguenza
watch(() => props.organizzatore, async (newVal) => {
  if (newVal && newVal.id && newVal.urlFoto) {
    try {
      // Richiesta ad axios per ottenere l'immagine dell'organizzazione
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

const formatDate = (date: string): string => {
  const [year, month] = date.split('-');
  return `${month}/${year.slice(2)}`;
};

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

const submitForm = () => {
  if (formRef.value) {
    if (formRef.value.reportValidity()) {

      if (!checkCardFields()) {
        alert('Per ciascuna carta, tutti i campi devono essere completi oppure tutti vuoti.');
        return;
      }

      const formData = new FormData(formRef.value);
      if (fileInputRef.value && fileInputRef.value.files && fileInputRef.value.files[0]) {
        formData.append('foto', fileInputRef.value.files[0]);
      }

      props.organizzatore.carte.forEach((carta, index) => {
        const fieldName = `dataScadenza${index + 1}`;
        const fieldValue = formData.get(fieldName) as string;
        if (fieldValue) {
          formData.set(fieldName, convertToLastDayOfMonth(fieldValue));
        }
      });

      axios.put(`/api/organizzatore/update/${props.organizzatore.id}`, formData)
          .then(response => {

            if (response.status === 200) {
              router.push({
                name: 'Homepage'
              })
            }
          })
          .catch(error => {
            console.error(error);
            activeSection.value = 'anagrafica';
            errorMessage.value = error.response.data;
          });
    }
  }
};

const convertToLastDayOfMonth = (date: string): string => {
  const [month, year] = date.split('/');
  const lastDay = new Date(Number(`20${year}`), Number(month), 0).getDate();
  return `20${year}-${month}-${lastDay}`;
};

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

</script>

<template>

  <div v-if="organizzatore">

    <section class="edit-form-section">


      <article class="form-header">
        <h1>Modifica il tuo profilo</h1>

        <!-- Pulsanti per annullare o salvare le modifiche -->
        <section class="form-buttons">
          <button type="button" id="cancel-button" class="form-button" aria-label="Annulla modifica" @click="goBack">
            Annulla
          </button>
          <button type="button" id="save-button" class="form-button" aria-label="Salva modifiche" @click="submitForm">
            Salva Modifiche
          </button>
        </section>
      </article>


      <nav aria-label="Seleziona sezione del form">
        <button @click="activeSection = 'anagrafica'"
                :class="{ selected: activeSection === 'anagrafica', notSelected: activeSection !== 'anagrafica' }">
          Anagrafica
        </button>
        <button @click="activeSection = 'social'"
                :class="{ selected: activeSection === 'social', notSelected: activeSection !== 'social' }">Social
        </button>
        <button @click="activeSection = 'pagamenti'"
                :class="{ selected: activeSection === 'pagamenti', notSelected: activeSection !== 'pagamenti' }">
          Pagamenti
        </button>
      </nav>


      <form class="edit-form" style="margin-top: 30px;" ref="formRef">

        <section class="form-section"
                 :class="{ 'active' : activeSection === 'anagrafica', 'not-active' : activeSection !== 'anagrafica' }">

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

              <label for="name">Nome *</label>
              <input type="text" id="name" name="nome" v-model="organizzatore.nome" required aria-required="true"
                     aria-label="Nome"
                     maxlength="45">

              <label for="cognome">Cognome *</label>
              <input type="text" id="cognome" name="cognome" v-model="organizzatore.cognome" required
                     aria-required="true"
                     aria-label="Cognome"
                     maxlength="45">

              <label for="usernae">Username *</label>
              <input type="text" id="username" name="username" v-model="organizzatore.username" required
                     aria-required="true"
                     aria-label="Username"
                     maxlength="45">

              <label for="email">Email *</label>
              <input type="email" id="email" name="mail" v-model="organizzatore.mail" required aria-required="true"
                     aria-label="Email"
                     maxlength="254">

              <label for="telefono">Telefono</label>
              <input type="tel" id="telefono" name="telefono" v-model="organizzatore.telefono"
                     aria-label="Telefono"
                     maxlength="15">

              <label for="dataNascita">Data di nascita *</label>
              <input type="date" id="dataNascita" name="dataNascita" v-model="organizzatore.dataNascita" required
                     aria-required="true"
                     aria-label="Data di nascita">

              <label for="codFiscale">Codice Fiscale</label>
              <input type="text" id="codFiscale" name="codFiscale" v-model="organizzatore.codFiscale"
                     aria-label="Codice Fiscale"
                     maxlength="16"
                     minlength="16">

            </div>

            <div class="form-column">

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

        <section class="form-section"
                 :class="{ 'active' : activeSection === 'social', 'not-active' : activeSection !== 'social' }">

          <div class="fields-row">

            <div class="form-column">

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

        </section>

        <section class="form-section"
                 :class="{ 'active' : activeSection === 'pagamenti', 'not-active' : activeSection !== 'pagamenti' }">


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


          <div v-for="index in 3" :key="index">

            <h2 class="card-title">Carta {{ index }}</h2>

            <div class="fields-row" style="margin-bottom: 10px;">

              <label :for="'cardNumber' + index" style="text-wrap: nowrap;">Numero carta</label>
              <input type="text" :id="'cardNumber' + index" :name="'numero' + index"
                     v-model="getCardField(index, 'numero').value"
                     :aria-label="'Numero carta ' + index"
                     pattern="\d{16}">

            </div>

            <div class="fields-row">

              <div class="form-column">

                <label :for="'expirationDate' + index">Data scadenza</label>
                <input type="text" :id="'expirationDate' + index" :name="'dataScadenza' + index"
                       v-model="getCardField(index, 'dataScadenza').value"
                       :aria-label="'Data scadenza ' + index"
                       pattern="\d{2}/\d{2}">

                <label :for="'cvv' + index">CVV</label>
                <input type="text" :id="'cvv' + index" :name="'cvv' + index"
                       v-model="getCardField(index, 'cvv').value"
                       :aria-label="'CVV ' + index"
                       pattern="\d{3}">
              </div>

              <div class="form-column">

                <label :for="'cardHolder' + index">Nome intestatario</label>
                <input type="text" :id="'cardHolder' + index" :name="'nome' + index"
                       v-model="getCardField(index, 'nome').value"
                       :aria-label="'Nome intestatario ' + index"
                       maxlength="45">

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

@import "@/assets/css/CreaModificaOrganizzazione.css";

.selected {
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #3152a8;
}

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

.card-title {
  color: white;
  text-align: center;
  margin-top: 30px;
}

.not-active {
  display: none;
}

</style>