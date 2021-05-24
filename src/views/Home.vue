<template>
  <div>
    <Header />
    <div class='text-center'>
      <Booking />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import Booking from '../components/booking.vue'

  export default {
    name: 'Home',

    components: {
      Header,
      Footer,
      Booking
    },
  }
</script>
