<script setup lang="ts"></script>
<template>
  <header>
    <nav aria-label="Main Navigation">
      <h2 class="logo">EVENTGO</h2>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#eventi">Eventi</a></li>
        <li><a href="#area-personale">Area personale</a></li>
        <li><a href="#help">Help</a></li>
        <li><a href="/logout">
          <img class="logout" alt="Logout" src="@/assets/images/homepageImg/logout-24dp-e8eaed-fill0-wght400-grad0-opsz24-1.png" />
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
