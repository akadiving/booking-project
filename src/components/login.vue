<template>
    <div>
      <!-- if logged in -->
      <div v-if="isSignIn"> 
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar 
                class="d-flex align-center"
                v-bind="attrs"
                v-on="on"
                v-if="image">
                <img
                  :src="image"
                  alt="User"
                >
              </v-avatar>
            </template>
              <v-card width="180px">
                <v-list>
                  <v-list-item link @click='logout'>
                    <v-btn 
                    class="d-flex align-center"
                    text
                    >
                      <v-icon>mdi-logout</v-icon>
                    </v-btn>
                    <v-list-item-title>
                      Logout
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>     
          </v-menu>
        </div>
      </div>
      <!-- if logged in -->

      <!-- if not logged in -->
      <div v-else>
        <v-dialog
        v-model="dialog"
        max-width="290"   
        >
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-btn
            class="d-flex align-center"
            v-bind="attrs"
            v-on="on"
            color='#7E4875'
            dark
            elevation='0'
            >
              Login
            </v-btn>
          </div>
           
        </template>
          <v-card>
            <!-- tabs -->
            <v-tabs
            dark
            background-color="#7E4875"
            grow
            flat
            >
              <v-tab>
              Login
              </v-tab>

              <!-- login tab -->
              <v-tab-item>
              <v-card-title class="justify-center text-h4">
                  <v-icon x-large color="primary">mdi-account-circle-outline</v-icon>
              </v-card-title>

              <!-- error message -->
              <v-slide-x-transition>
                <div v-if="errorM">
                  <v-card-title class="justify-center text-h4" >
                    <v-chip
                    color="red"
                    outlined
                    label
                    close
                    @click:close='removeError()' 
                    > {{errorM}}</v-chip>
                  </v-card-title>
                </div>
              </v-slide-x-transition>
              <!-- error message -->
                  
              <!-- login form -->
              <v-container class="justify-center">
                <v-row justify="center"
                  align="center" 
                  dense>

                  <!-- Google login -->
                  <v-col cols="auto">
                    <v-chip
                    class="ma-2"
                    color="#f24b29"
                    outlined
                    @click='googleLogin()'
                    >
                      Login with
                      <v-icon right color="#f24b29">
                        mdi-google
                      </v-icon>
                    </v-chip> 
                  </v-col>
                  <!-- Google login -->
                        
                  <!-- Facebook login -->
                  <v-col cols="auto">
                    <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    @click='fbLogin'
                    >
                      Login with
                      <v-icon right>
                        mdi-facebook
                      </v-icon>
                    </v-chip>
                  </v-col>
                  <!-- Facebook login -->

                </v-row>
              </v-container>
              <!-- login form -->

              </v-tab-item>
              <!-- login tab -->

            </v-tabs>
            <!-- tabs --> 
          </v-card>
        </v-dialog>
      </div>
      <!-- if not logged in -->

    </div>
</template>
<script>
import nodeLogin from '../login/nodeLogin.js';
import axios from 'axios';

export default {
  name: 'Login',
  components: {

  },
  props: {

  },

  data: () => ({
    dialog: false,
    errorM: '',
    user_image: '',
    isSignIn: false,
    
  }),
  computed: {
    image(){
      return this.user_image
    }
  },
  methods: {
    async googleLogin(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }

        const name = googleUser.getBasicProfile().getGivenName();
        const email = googleUser.getBasicProfile().getEmail();
        const image = googleUser.getBasicProfile().getImageUrl();

        const profile =  {
          userName: name,
          userEmail: email,
          userImage: image
        } 

        let profileSerialized = JSON.stringify(profile)
        localStorage.setItem('profile', profileSerialized);
        let profileDeserialized = JSON.parse(localStorage.getItem('profile'))
        this.user_image = profileDeserialized.userImage

  
        nodeLogin(name, email);
        console.log("googleUser name", name);
        console.log("googleUser email", email);
        console.log("googleUser image", image);
        this.dialog = false;
        this.isSignIn = true
        
      } catch (error) {
        //on fail do something
        console.error(error);
        this.errorM = error.error;
        return null;
      }
    },
    fbLogin(){
      FB.login(function(response) {
        if (response.authResponse) {
          console.log(response);
          FB.api('/me', 'GET', {fields: 'id,first_name,email,picture'}, function(response) {
            console.log(response)

            const name = response.first_name
            const email = response.email
            const image = response.picture.data.url

            const profile =  {
              userName: name,
              userEmail: email,
              userImage: image
            }

            let profileSerialized = JSON.stringify(profile)
            localStorage.setItem('profile', profileSerialized);
            let profileDeserialized = JSON.parse(localStorage.getItem('profile'))
            this.user_image = profileDeserialized.userImage

            nodeLogin(name, email)
            this.isSignIn = true
            this.dialog = false
          })
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      })
      this.dialog = false 
      this.isSignIn = true
    },
    async logout(){
      axios.post('https://colab-booking.herokuapp.com/api/logout/', {withCredentials: true})
      .then((response) => {
        console.log(response)      
        this.removeItems()
        this.isSignIn = false
        })
      .catch((error) => {
        console.log(error)
        this.removeItems()
        this.isSignIn = false
      })
      
    },
    removeError(){
      this.errorM = '';
    },
    removeItems(){
      localStorage.removeItem('profile');
    },
  },
  mounted(){
    if(localStorage.getItem('profile')){
        this.isSignIn = true
        let profileDeserialized = JSON.parse(localStorage.getItem('profile'))
        this.user_image = profileDeserialized.userImage
        console.log(this.user_image)
    }
  },
};
</script>

<style scoped>

</style>