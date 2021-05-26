<template>
 <v-container fluid>
    <v-row justify="center">
      <v-col cols='auto'>
        <v-card
          class="mx-auto"
          max-width="320"
        >
          <v-img
            height="250"
            width="100%"
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          ></v-img>
          
          <v-card-title>Dr. Amanda Nunez 
             <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="16"
                length='1'
                class="ms-2"
              >
              </v-rating>
              <div class="grey--text text-sm-body-2 ms-2 mt-1">
                4.5 (413)
              </div>
          </v-card-title>

          <v-card-text>
            
            <v-row
              align="center"
              class="mx-0"
            >
              <div class="my-4 subtitle-1 black--text">
                PhD, Physician, Pediatrician
              </div>
              <div class="black--text text-md-body-1">
                <v-icon color="#7E4875" class="mb-1 mr-1">mdi-clock-time-eight-outline</v-icon>
                9:00 AM - 16:00 PM
              </div>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
            >
              Check availability
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
    name: 'Booking',

    data: () => ({

    }),
    methods: {

    }
}
</script>

<style scoped>

</style>