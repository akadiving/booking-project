<template>
    <v-app-bar app 
      color="#F66156"
      flat
      elevate-on-scroll>

            <v-avatar
            class="d-flex align-center"
            dark
            @click='home'
            >
            <v-icon x-large dark>mdi-stethoscope</v-icon>
            </v-avatar>

        <v-spacer></v-spacer>

            <v-btn
            text
            >   
            <Login />
            </v-btn>


      </v-app-bar>
</template>

<script>
import Login from '../components/login.vue';
import router from '../router/index';

export default {
    name: 'Header',
    components: {
        Login
    },
    data: () => ({

    }),
    methods: {
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
    }
}

</script>
