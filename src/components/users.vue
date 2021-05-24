<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="10"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
  ></v-data-table>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Users',

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
    }),

    methods: {
        getUsers(){
            const baseURL = 'https://colab-booking.herokuapp.com/api/users/';
            axios.get(baseURL, {withCredentials: true})
            .then((response) => {
                this.users = response.data
                console.log(this.users)
            })
        }
    },
    created(){
        this.getUsers()
    }
}
</script>

<style scoped>

</style>