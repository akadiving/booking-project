<template>
  <v-data-table
    :headers="headers"
    :items="schedule"
    :items-per-page="10"
    class="elevation-1"
    :loading = loadSchedule
    loading-text="Loading... Please wait"
></v-data-table>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Schedule',

    data: () => ({
        users: [],
        headers: [
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Booking', value: 'booking' },
        ],
        loadSchedule: true,
        schedule: [],
    }),

    methods: {
        getSchedule(){
            const baseURL = 'https://colab-booking.herokuapp.com/api/admin/me/';
            axios.get(baseURL, {withCredentials: true})
            .then((response) => {
                console.log(response)
                this.loadSchedule = false
            })
        }
    },
    created(){
        this.getSchedule()
    }
}
</script>

<style scoped>

</style>