<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full min-h-full sm:max-w-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mx-auto h-60 w-auto text-red-600">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>

            <p class="text-4xl md:text-6xl font-extralight tracking-wider mt-8 text-white text-center">We've encountered an error!
            </p>
            <p class="text-xl font-extralight tracking-wider mt-8 text-zinc-400 text-left">There might be a problem. Please check your internet connection. If its working, try restarting the local server. If you still see this message, contact customer care for further assistance.</p>
            
            <div class="mt-8 text-center">
                <button @click="reload()" type="button"
                    class="rounded-md bg-teal-600 px-5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white/20">Retry</button>
            </div>
        </div>
    </div>
</template>
<script>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'
export default {
    name: 'error page',
    components: {
        TransitionChild, TransitionRoot
    },
    data() {
        return {
            is_time: false
        }
    },
    methods: {
        reload(){
            window.location.reload();
        }
    },
    computed: {},
}
</script>