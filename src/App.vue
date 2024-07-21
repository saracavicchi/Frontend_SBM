<script setup lang="ts"></script>
<<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/views/Header.vue';
import Footer from './components/views/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import './assets/main.css';
</style>