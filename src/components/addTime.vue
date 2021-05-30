<template>
  <v-card>
    <v-card-title>Set working hours</v-card-title>
    <v-container>
      <v-row justify='center'>
        <v-col cols='12'>
          <VueCtkDateTimePicker 
          id='start' 
          v-model="start" 
          label='Starting time'
          :onlyTime='true' 
          format='HH:mm' 
          formatted='HH:mm a'
          minute-interval='30' 
          color='#7E4875' />
        </v-col>
        <v-col cols='12'>
          <VueCtkDateTimePicker 
          id='end' 
          v-model="end" 
          label='Ending time'
          :onlyTime='true' 
          format='HH:mm'
          formatted='HH:mm a' 
          minute-interval='30' 
          color='#7E4875' />
        </v-col>
      </v-row>
    </v-container> 
    <v-card-actions>
       <v-btn
        class="ml-2 mt-5"
        outlined
        rounded
        small
        color='#1F7087'
      >
        SET TIME
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>


export default {
    name: 'AddTime',
    data: () =>({
        start: null,
        end: null,
    }),
}
</script>
