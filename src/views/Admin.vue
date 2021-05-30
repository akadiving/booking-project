<template>
  <div id="admin" class="text-center">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="blue"
          size="64"
        >
        <v-icon dark x-large>
          mdi-account
        </v-icon>
        </v-avatar>

        <div>Admin</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          link
          @click="home"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          @click="logout"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="addTime"
        >
          <v-list-item-icon>
            <v-icon>mdi-clock-time-one-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Add Time</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <div v-if='admin'>
      <v-btn
        color="#1F7087"
        outlined
        @click.stop="drawer = !drawer"
        class="mt-3 style={position: absolute;}"
      >
      <v-icon v-if="drawer">
        mdi-close
      </v-icon>
      <v-icon v-if="!drawer">
        mdi-menu
      </v-icon>
      </v-btn>
      <v-container>
        <v-row justity='center'>
          <v-col cols='auto'>
            <Users />
          </v-col>
          <v-col cols='auto'>
            <Schedule />
          </v-col>
          <v-col cols='auto'>
            <transition name="fade-transition">
              <keep-alive>
                <component v-bind:is="component"></component>
              </keep-alive>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import router from '../router/index';
//import adminLogin from '../login/adminLogin.js';
import axios from 'axios';
import Users from '../components/users.vue';
import Schedule from '../components/schedule.vue';
import AddTime from '../components/addTime.vue'

export default  {
  name: 'Admin',
  props: {
    
  },
  components: {
    Users,
    Schedule,
    'AddTime':AddTime
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
    drawer: null,
    loadTable: true,
    component: ''
  }),

  methods: {
    //logs out by removing admin key from local storage
    logout(){
      axios.post('https://colab-booking.herokuapp.com/api/logout/', {withCredentials: true})
      .then((response) => {
        console.log(response)
        localStorage.removeItem('admin')
        this.admin = false
        this.dialog = true
        this.email = ''
        this.password = ''
        this.errorM = ''
        this.adminLoginPage()
        
        })
      .catch((error) => {
        console.log(error)
        localStorage.removeItem('admin')
        this.isSignIn = false
        this.admin = false
        this.dialog = true
        this.email = ''
        this.password = ''
        this.errorM = ''
        this.adminLoginPage()
      })
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
    addTime(){
      if(this.component){
        this.component = ''
      }else{
        this.component = 'AddTime'
      }
      
    }
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