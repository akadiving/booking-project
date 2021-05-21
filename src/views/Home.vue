<template>
  <div>
    <Header />
    <div class='text-center'>
      Home
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

  export default {
    name: 'Home',

    components: {
      Header,
      Footer,
    },
  }
</script>
