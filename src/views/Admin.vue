<template>
  <div id="admin" class="text-center">
    <div v-if='admin'>
      {{name}}
      <v-btn @click='logout'>
        Logout
      </v-btn>
      <v-btn
        color="#1F7087"
        outlined
        @click="home"
      >
      <v-icon>
          mdi-home
      </v-icon>
        Home
      </v-btn>
      <v-container>
        <Users />
      </v-container>

      <v-container>
        <v-data-table
          :headers="headers"
          :items="schedule"
          :items-per-page="10"
          class="elevation-1"
          :loading = loadTable
          loading-text="Loading... Please wait"
        ></v-data-table>
      </v-container>
    </div>
  </div>
</template>

<script>
import router from '../router/index';
//import adminLogin from '../login/adminLogin.js';
//import axios from 'axios';
import Users from '../components/users.vue'

export default  {
  name: 'Admin',
  props: {
    
  },
  components: {
    Users
  },
  data: () => ({
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Day', value: 'day' },
      { text: 'Time', value: 'time' },
    ],
    errorM: '',
    admin: false,
    password: '',
    email: '',
    validLogin: true,
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    schedule: [],
    loadTable: true
  }),

  methods: {
    //logs out by removing admin key from local storage
    logout(){
      localStorage.removeItem('admin')
      this.admin = false
      this.dialog = true
      this.email = ''
      this.password = ''
      this.errorM = ''
      this.adminLoginPage()
    },
    //fonction for home link
    home(){
        router.push({ path: '/' }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
            ) {
                // But print any other errors to the console
                logError(err);
            }
        });
    },
    //Removes error from login pop-up
    removeError(){
      this.errorM = '';
    },
    //set expire date on admin key value
    setWithExpiry(key, value, ttl) {
      const now = new Date()

      // `item` is an object which contains the original value
      // as well as the time when it's supposed to expire
      const item = {
        value: value,
        expire: now.getTime() + ttl,
      }
      localStorage.setItem(key, JSON.stringify(item))
    },
    //checks the expirationd date on admin key stored in local storage
    getWithExpire(key) {
      const itemStr = localStorage.getItem(key)
      // if the item doesn't exist, return null
      if (!itemStr) {
        return null
      }
      const item = JSON.parse(itemStr)
      const now = new Date()
      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expire) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
      }
      return item.value
    },
    //gets the name of admin
    getName(key) {
      const itemStr = localStorage.getItem(key)
      // if the item doesn't exist, return null
      if (!itemStr) {
        return null
      }
      const item = JSON.parse(itemStr)
      const now = new Date()
      return item.value
    },
    adminLoginPage(){
      router.push({ path: '/adminlogin' }).catch(err => {
      // Ignore the vuex err regarding  navigating to the page they are already on.
      if (err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
          ) {
              // But print any other errors to the console
              logError(err);
          }
      });
    },
  },
  mounted(){
    if(this.getWithExpire('admin')){
      this.admin = true
      this.name = this.getName('admin')
    }else{
      this.adminLoginPage()
    }
  }
};

</script>

<style scoped>

</style>