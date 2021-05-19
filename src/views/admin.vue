<template>
    <div class="text-center">
        <v-dialog
        v-model="dialog"
        max-width="290"
        persistent   
        >
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
                    <v-icon x-large color="#1F7087">mdi-account-circle-outline</v-icon>
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
                  <v-form ref="loginform" @submit.prevent="adminLogin()" v-model="validLogin">
                    <v-container class="justify-center">
                      <v-row justify="center"
                        align="center" 
                        dense>
                        <v-col cols="12">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            placeholder="Email"
                            name='email'
                            prepend-inner-icon="mdi-account"
                            outlined
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            name='password'
                            placeholder="Password"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            clearable
                            type="password"
                            required
                            v-on:keyup.enter="login"
                          ></v-text-field>
                        </v-col>

                        <v-divider></v-divider>

                        <v-col cols="auto">
                          <v-btn
                            color="#1F7087"
                            outlined
                            block
                            :disabled="!validLogin"
                            type='submit'
                          >
                            Login
                          </v-btn>
                        </v-col>
                        <v-col cols="auto">
                          <v-btn
                            color="#1F7087"
                            outlined
                            block
                            @click="home"
                          >
                          <v-icon>
                              mdi-home
                          </v-icon>
                            Home
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <!-- login form -->

                </v-tab-item>
              <!-- login tab -->

          </v-tabs>
          <!-- tabs --> 
        </v-card>

        </v-dialog>
    </div>
</template>

<script>
import router from '../router/index';
import adminLogin from '../login/adminLogin.js'

export default  {
    name: 'Admin',
    components: {

    },
    data: () => ({
        dialog: true,
        errorM: '',
        isSignIn: false,
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
    }),

    methods: {
        removeError(){
            this.errorM = '';
        },
        async adminLogin(){
            try{
                adminLogin(this.email, this.password)
                this.isSignIn = true
                this.dialog = false
            }catch (error) {
                //on fail do something
                console.error(error);
                this.errorM = error.error;
                this.isSignIn = false
                this.dialog = true
        }
            
            
        },
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
    },
};

</script>

<style scoped>

</style>