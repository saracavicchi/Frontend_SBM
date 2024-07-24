<template>
  <div class="form-container"> <!--Div che contiene tutti i form -->
    <form>
      <div class="form-row">
        <div class="form-column"> <!-- Prima colonna a sx-->
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" />
          </div>
          <div class="form-group">
            <label for="cognome">Cognome</label>
            <input type="text" id="cognome" name="cognome" />
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" />
          </div>
          <div class="form-group">
            <label for="data-nascita">Data di Nascita</label>
            <input type="date" id="data-nascita" name="data-nascita" />
          </div>
          <div class="form-group">
            <label for="codice-fiscale">Codice Fiscale</label>
            <input type="text" id="codice-fiscale" name="codice-fiscale" />
          </div>
        </div>
        <div class="form-column"> <!-- Seconda colonna a dx-->
          <div class="form-group">
            <label for="username">Nome Utente</label>
            <input type="text" id="username" name="username" />
          </div>
          <div class="form-group">
            <label for="telefono">Numero di Telefono</label>
            <input type="tel" id="telefono" name="telefono" />
          </div>
          <div class="form-group">
            <label for="stato">Stato</label>
            <input type="text" id="stato" name="stato" />
          </div>
          <div class="form-group">
            <label for="provincia">Provincia</label>
            <input type="text" id="provincia" name="provincia" />
          </div>
          <div class="form-group">
            <label for="cap">CAP</label>
            <input type="text" id="cap" name="cap" />
          </div>
          <div class="form-group">
            <label for="via">Via</label>
            <input type="text" id="via" name="via" />
          </div>
          <div class="form-group">
            <label for="civico">Numero Civico</label>
            <input type="text" id="civico" name="civico" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Puoi aggiungere logica qui se necessario
</script>

<style scoped>
.form-container {
  padding: 20px;
  border-radius: 15px;
  background-color: #2553AE; /* Colore di sfondo del form */
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-column {
  width: 45%; /* Regola la larghezza delle colonne come preferisci */
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.form-group label {
  margin-bottom: 10px;
  color: #ffffff;
}

.form-group input {
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 10px; /* Bordi arrotondati */
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #2553AE;
}



</style>
