<template>
  <v-app>
    <v-main>
      <Header />
      <router-view/>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  data: () => ({
    
  }),
  methods: {
    
  },
};
</script>
