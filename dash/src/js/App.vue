<template>
    <div class="h-full">
        <Loader v-if="loading" />
        <Error v-else-if="has_error" />
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
import Error from './components/Error.vue';
export default {
    name: 'app',
    mixins:[AppMixin],
    components: {
        SceenSaver,
        Loader,
        Waite,
        Error
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
        async init() {
            let response = await this.$store.dispatch('getauthToken',{device_id:this.deviceID()})
            this.loading = false
            setInterval(() => {
                this.$store.dispatch('log')
            }, 1000);
            if (!response) {
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
        has_error() {
            return this.$store.getters['error']
        },
    },
    watch: {
    },
    mounted() {
        this.init()
    }
}
</script>