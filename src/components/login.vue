<template>
    <div>
      <!-- if logged in -->
        <template v-if="isSignIn">
          <div >   
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar 
                    class="d-flex align-center"
                    v-bind="attrs"
                    v-on="on">
                    <img
                      :src="image"
                      alt="User"
                    >
                  </v-avatar>
                </template>
                  <v-card width="200px">
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
        </template>
      <!-- if logged in -->

      <!-- if not logged in -->
      <template v-else>
        <v-dialog
        v-model="dialog"
        max-width="290"   
        >
        <template v-slot:activator="{ on, attrs }">
          

          <div>
             <v-btn
                class="d-flex align-center"
                text
                v-bind="attrs"
                v-on="on"
              >
              Login
              <v-icon large right>mdi-account-circle-outline</v-icon>
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
              slider-color="#ED7B22"
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
      </template>
      <!-- if not logged in -->

    </div>
</template>
<script>
import googleLogin from '../login/googleLogin.js';
import axios from 'axios';

export default {
  name: 'Login',

  data: () => ({
    dialog: false,
    errorM: '',
    isSignIn: false,
    user_image: ''
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

        const profile = {
          userName: name,
          userEmail: email,
          userImage: image
        }

        let profileSerialized = JSON.stringify(profile)
        localStorage.setItem('profile', profileSerialized);
        let profileDeserialized = JSON.parse(localStorage.getItem('profile'))

        this.user_image = profileDeserialized.userImage
  
        googleLogin(name, email);
        console.log("googleUser name", name);
        console.log("googleUser email", email);
        this.dialog = false;
        
      } catch (error) {
        //on fail do something
        console.error(error);
        this.errorM = error.error;
        return null;
      } 
    },
    async logout(){
        try {
            await this.$gAuth.signOut();
            this.isSignIn = this.$gAuth.isAuthorized;
            console.log("isSignIn", this.$gAuth.isAuthorized);
        } catch (error) {
            console.error(error);
        }

          axios.post('https://colab-booking.herokuapp.com/api/logout/', {withCredentials: true})
          .then((response) => {
            console.log(response)
            })
          .catch((error) => {
            console.log(error)
          })
       
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('profile');
    },
    removeError(){
      this.errorM = '';
    },
  },
  mounted(){
    if(localStorage.getItem('profile')){
        let profileDeserialized = JSON.parse(localStorage.getItem('profile'))
        this.isSignIn = true
        this.user_image = profileDeserialized.userImage
    }
  },
};
</script>