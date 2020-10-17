<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue';
    import { STATE } from '@/services/api/_privateNeatoData';
    import { authenticate } from "@/services/api";

    export default {
        name: "Home",
        components: {
            HelloWorld
        },
        async beforeRouteEnter (to, from, next) {
            if (to.hash) {
                const parsedParams = {};
                to.hash.split('&')
                    .map(part => part.replace(/#/, ''))
                    .forEach(param => {
                        const parts = param.split('=');
                        parsedParams[parts[0]] = parts[1];
                    });
                if(parsedParams.access_token && parsedParams.state === STATE){
                    next();
                }else {
                    next({name:'not-found'});
                }
            } else {
                authenticate();
            }
        },
    };
</script>

<style scoped>

</style>