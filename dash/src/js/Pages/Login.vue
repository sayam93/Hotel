<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-48 w-auto rounded-full" src="/static/images/Logo.png" alt="Home App" />

        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
            <form @submit.prevent="doLogin()"
                class="space-y-6 bg-zinc-800 px-6 py-8 md:p-14 rounded-md border-2 border-zinc-700" action="#">
                <div class="">
                    <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-white">Welcome</h2>
                </div>
                <div v-if="login_error" class="text-red-600 text-base tracking-wider mt-5 text-center p-2 bg-red-50">
                    Please check your credentials and try again
                </div>
                <div>
                    <div class="mt-2">
                        <input v-model="data.password" id="code" name="code" type="password"
                            autocomplete="current-password" required=""
                            class="block w-full rounded-md border-l-0 border-t-0 border-r-0 border-b-2 py-2 focus:border-white bg-zinc-700 text-white shadow-sm ring-0  ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
                            placeholder="password" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import appMixen from '../mixins/app'
export default {
    name: 'login-page',
    mixins: [appMixen],
    components: {},
    data() {
        return {
            data: {
                password: '',
            },
            login_error: false
        }
    },
    methods: {
        async doLogin() {
            this.login_error = false
            let resp = await this.$store.dispatch('doLogin', {password: this.data.password,device_id:this.deviceID() })
            if (!resp) {
                this.login_error = true
                return
            }
            this.$router.push('/')
        }
    },
    computed: {},
    mounted() {
    }
}
</script>