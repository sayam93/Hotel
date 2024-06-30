<template>
    <div class="h-full">
        <Loader v-if="loading" />
        <div v-else class="h-full">
            <SceenSaver />

            <Waite />
            <router-view v-slot="slotProps" class="z-10 h-full">
                <transition mode="out-in" name="page" enter-active-class="duration-300 ease-out"
                    enter-from-class="transition transform opacity-0" enter-to-class="opacity-100"
                    leave-active-class="duration-300 ease-in" leave-from-class="opacity-100"
                    leave-to-class="transition transform opacity-0">
                    <component :is="slotProps.Component" :key="$route.path + load_index"></component>
                </transition>
            </router-view>
        </div>

    </div>
</template>
<script>
import SceenSaver from './components/SceenSaver.vue'
import Waite from './components/Waite.vue'
import Loader from './components/Loader.vue';
import AppMixin from './mixins/app'

export default {
    name: 'app',
    mixins:[AppMixin],
    components: {
        SceenSaver,
        Loader,
        Waite,
    },
    data() {
        return {
            loading: true,
            show_entity: true,
            show_screensaver: false,
            has_error: false,
        }
    },
    methods: {

        rndStr(len = 20) {
            let text = " "
            let chars = "abcdefghijklmnopqrstuvwxyz"

            for (let i = 0; i < len; i++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return text
        },
        eventHandler(connection, data) {
            console.error("Connection has been established again");
        },

        async init() {
            let response = await this.$store.dispatch('getauthToken',{device_id:this.deviceID()})
            this.loading = false
            if (!response) {
                if (window.location.pathname != '/login') {
                    this.$router.push('/login');
                }
                return
            }
            if (!this.auth_token) {
                if (window.location.pathname != '/login') {
                    this.$router.push('/login');
                }
                return
            }
            if (window.location.pathname == '/login') {
                this.$router.push('/');
            }
        },

    },
    computed: {
        auth_token() {
            return this.$store.getters['auth_token']
        }
    },
    watch: {
    },
    mounted() {
        this.init()
    }
}
</script>