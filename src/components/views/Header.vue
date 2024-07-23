<script setup lang="ts"></script>
<template>
  <header>
    <nav aria-label="Navigazione principale">
      <h2 class="logo">EVENTGO</h2>
      <ul>
        <li><a href="#home" aria-label="Vai alla home">Home</a></li>
        <li><a href="#eventi" aria-label="Scopri gli eventi">Eventi</a></li>
        <li><a href="#area-personale" aria-label="Accedi all'area personale">Area personale</a></li>
        <li><a href="#help" aria-label="Ottieni aiuto">Help</a></li>
        <li><a href="/logout" aria-label="Effettua il logout">
          <img class="logout" alt="Logout" src="../../assets/images/homepageImg/logout.png" />
        </a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>
