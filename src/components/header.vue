<template>
    <v-app-bar app 
      color="white"
      flat
      light
      elevation='1'>

            <v-avatar
            class="d-flex align-center"
            @click='home'
            >
            <v-icon x-large dark color="#7E4875">mdi-stethoscope</v-icon>
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
