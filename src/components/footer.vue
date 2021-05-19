<template>
<!-- footer bar -->
  <v-footer
    dark
    padless
    app
  > 
    <v-card
      class="flex footer"
      flat
      tile
      color="#CCF2EF"
    >
        
      <v-card-text class="py-2 white--text text-center footer">
        {{ new Date().getFullYear() }} — <strong>A.I Dev</strong>
        <v-btn
          class="mx-4"
          color="white"
          icon
          href="https://github.com/akadiving/booking-project"
          target="_blank"
        >
          <v-icon x-large>
            mdi-github
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
  <!-- search bar -->
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        background-color: #F66156;
        
    }
</style>