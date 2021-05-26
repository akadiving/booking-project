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
      color="white"
    >
        
      <v-card-text color="#7E4875" class="py-2 black--text text-center footer">
        {{ new Date().getFullYear() }} — <strong>A.I Dev</strong>
        <v-btn
          class="mx-4"
          color="#7E4875"
          icon
          href="https://github.com/akadiving/booking-project"
          target="_blank"
        >
          <v-icon x-large color='#7E4875'>
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
        background-color: white;
        
    }
</style>