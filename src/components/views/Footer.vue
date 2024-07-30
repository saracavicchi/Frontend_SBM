<script setup lang="ts"></script>

<template>
  <footer>
    <p>&copy; 2024 Eventgo</p>
    <nav aria-label="Navigazione footer">
      <ul>
        <li><a href="#terms" aria-label="Termini e condizioni" accesskey="t">Terms and conditions</a></li>
        <li><router-link to="/accessibilita" aria-label="Guida all'accessibilità" accesskey="g">Accessibilità</router-link></li>
        <li><a href="#privacy" aria-label="Politica sulla privacy" accesskey="p">Privacy</a></li>
        <li><a href="#contact" aria-label="Contattaci" accesskey="c">Contattaci</a></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>


