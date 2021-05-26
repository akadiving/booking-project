<template>
    <div class="text-center" v-bind:class="{background: !isSignIn}">
        <div v-if='isSignIn'>
            You are already Signed in
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
        </div>
        <div v-else class='login'>
            <v-card max-width="290" elevation="4">
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
                    <v-form v-model="validLogin">
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
                                @click='login'
                                
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
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import router from '../router/index';

export default {
    name: "AdminLogin",

    data: () => ({
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
        //handling login workflow with axios
        login(){
            const baseURL = 'https://colab-booking.herokuapp.com/api/admin/login/';
            axios
            .post(baseURL, {
                email : this.email,
                password : this.password
            })
            .then((res) => {
                console.log(res)
                //Check if response contains ADMIN as a name and creates key on local storage
                if(res.data.name === 'admin'){
                    this.setWithExpiry('admin', res.data.name, 3600000)
                    this.isSignIn = true
                    this.adminPage() 
                }
            })
            .catch((error) => {
                console.log(error)
                this.errorM = "Wrong credentials";
                this.isSignIn = false
            });
        },
        //function navigate clinet to home page
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
        //function navigate clinet to admin page 
        adminPage(){
            router.push({ path: '/admin' }).catch(err => {
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
        //logs out by removing admin key from local storage
        logout(){
            axios.post('https://colab-booking.herokuapp.com/api/logout/', {withCredentials: true})
            .then((response) => {
                console.log(response)
                localStorage.removeItem('admin')
                this.isSignIn = false
                this.dialog = true
                this.email = ''
                this.password = ''
                this.errorM = ''
                this.home()
                })
            .catch((error) => {
                console.log(error)
                localStorage.removeItem('admin')
                this.isSignIn = false
                this.dialog = true
                this.email = ''
                this.password = ''
                this.errorM = ''
                this.home()
            })
        }, 
    },
    mounted(){
        if(localStorage.getItem('admin')){
            this.isSignIn = true
            }
        }
}
</script>

<style scoped>
    .login{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        
    }
    .background{
        background-color: rgb(231, 230, 230);
        width: 100%;
        height: 100%;
    }
</style>