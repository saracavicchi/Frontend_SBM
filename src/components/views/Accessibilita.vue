<script setup lang="ts">

</script>

<template>
  <section class="general-accessibility">
    <h1>Guida all'Accessibilità</h1>
    <p>Gli accesskey permettono una navigazione più rapida e accessibile, specialmente per gli utenti che si affidano alla tastiera per navigare. Per utilizzare un accesskey, premi contemporaneamente i tasti indicati a seconda del tuo sistema operativo. Questo ti porterà direttamente alla sezione del sito associata a quell'accesskey.</p>
    <section class="accessibility-section">
      <h2>Accesskey disponibili globalmente sul sito</h2>
      <p>Questa guida fornisce informazioni su come navigare nel nostro sito utilizzando le funzionalità di accessibilità.</p>
      <ul>
        <li><strong>Alt + M</strong> o <strong>Shift + Alt + M</strong> (Windows/Linux), <strong>Ctrl + Opt + M</strong> (macOS): Salta direttamente alla sezione principale della pagina</li>
        <li><strong>Alt + H</strong> o <strong>Shift + Alt + H</strong> (Windows/Linux), <strong>Ctrl + Opt + H</strong> (macOS): Home Page</li>
        <li><strong>Alt + E</strong> o <strong>Shift + Alt + E</strong> (Windows/Linux), <strong>Ctrl + Opt + E</strong> (macOS): Eventi</li>
        <li><strong>Alt + A</strong> o <strong>Shift + Alt + A</strong> (Windows/Linux), <strong>Ctrl + Opt + A</strong> (macOS): Area Personale</li>
        <li><strong>Alt + L</strong> o <strong>Shift + Alt + L</strong> (Windows/Linux), <strong>Ctrl + Opt + L</strong> (macOS): Help</li>
        <li><strong>Alt + O</strong> o <strong>Shift + Alt + O</strong> (Windows/Linux), <strong>Ctrl + Opt + O</strong> (macOS): Logout</li>
        <li><strong>Alt + T</strong> o <strong>Shift + Alt + T</strong> (Windows/Linux), <strong>Ctrl + Opt + T</strong> (macOS): Terms and conditions</li>
        <li><strong>Alt + G</strong> o <strong>Shift + Alt + G</strong> (Windows/Linux), <strong>Ctrl + Opt + G</strong> (macOS): Accessibilità</li>
        <li><strong>Alt + P</strong> o <strong>Shift + Alt + P</strong> (Windows/Linux), <strong>Ctrl + Opt + P</strong> (macOS): Privacy</li>
        <li><strong>Alt + C</strong> o <strong>Shift + Alt + C</strong> (Windows/Linux), <strong>Ctrl + Opt + C</strong> (macOS): Contattaci</li>
      </ul>
    </section>
    <section class="accessibility-section">
      <h2>Accessibilità per la pagina di homepage personale</h2>
      <p>Questa guida fornisce informazioni su come navigare nella pagina di homepage personale utilizzando le funzionalità di accessibilità.</p>
      <ul>
        <li><strong>Alt + R</strong> o <strong>Shift + Alt + R</strong> (Windows/Linux), <strong>Ctrl + Opt + R</strong> (macOS): Salta direttamente alla sezione laterale</li>
        <li><strong>Alt + 1</strong> o <strong>Shift + Alt + 1</strong> (Windows/Linux), <strong>Ctrl + Opt + 1</strong> (macOS): Gestisci Eventi</li>
        <li><strong>Alt + 2</strong> o <strong>Shift + Alt + 2</strong> (Windows/Linux), <strong>Ctrl + Opt + 2</strong> (macOS): Dashboard</li>
        <li><strong>Alt + 3</strong> o <strong>Shift + Alt + 3</strong> (Windows/Linux), <strong>Ctrl + Opt + 3</strong> (macOS): Organizzazione</li>
        <li><strong>Alt + 4</strong> o <strong>Shift + Alt + 4</strong> (Windows/Linux), <strong>Ctrl + Opt + 4</strong> (macOS): Profilo</li>
        <li><strong>Alt + 5</strong> o <strong>Shift + Alt + 5</strong> (Windows/Linux), <strong>Ctrl + Opt + 5</strong> (macOS): Pagamenti e Finanze</li>
        <li><strong>Alt + 6</strong> o <strong>Shift + Alt + 6</strong> (Windows/Linux), <strong>Ctrl + Opt + 6</strong> (macOS): Marketing</li>
        <li><strong>Alt + N</strong> o <strong>Shift + Alt + N</strong> (Windows/Linux), <strong>Ctrl + Opt + N</strong> (macOS): Centro Notifiche</li>
        <li><strong>Alt + K</strong> o <strong>Shift + Alt + K</strong> (Windows/Linux), <strong>Ctrl + Opt + K</strong> (macOS): Lista Eventi In Programma</li>
        <li><strong>Alt + F</strong> o <strong>Shift + Alt + F</strong> (Windows/Linux), <strong>Ctrl + Opt + F</strong> (macOS): Lista Eventi Passati</li>
      </ul>
    </section>
  </section>
</template>


<style>
.general-accessibility{
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  color: #00004d;
}
.accessibility-section {
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.accessibility-section  h1, .accessibility-section  h2 {
  color: #333;
  margin-bottom: 10px;
}

.accessibility-section h1{
  font-size: 25px;
}

.accessibility-section h2 {
  font-size: 22px;
}

.accessibility-section ul {
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
}

.accessibility-section  li {
  margin-bottom: 10px; /* Spazio tra gli elementi dell'elenco */
  line-height: 1.5; /* Spaziatura delle linee per una migliore leggibilità */
  font-size: 18px;
}

.accessibility-section  li strong {
  color: #007BFF; /* Colore per evidenziare i tasti di scelta rapida */
}
</style>