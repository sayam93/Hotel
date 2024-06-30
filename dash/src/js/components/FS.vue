<template>
    <TransitionRoot as="template" :show="!full_screen">
        <Dialog class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-zinc-900 bg-opacity-95 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-hidden over">
                <button class="w-0 h-0"></button>
                <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-zinc-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div>
                                <div class="mx-auto flex  items-center justify-center rounded-full ">
                                    <img class="mx-auto h-48 w-auto rounded-full" src="/static/images/Logo.png"
                                        alt="Home App" />
                                </div>
                                <div class="mt-3 text-center sm:mt-8">
                                    <DialogTitle as="h3"
                                        class="text-2xl font-semibold leading-6 text-white tracking-wider uppercase">
                                        Welcome to <span class="">Walk-in WatchDog</span>
                                    </DialogTitle>
                                </div>
                            </div>
                            <div class="mt-5 text-center md:mt-8  flex justify-center">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                    @click="toggleApi()">Get Started</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';
export default {
    name: 'full-screen',
    props: {
        is_vacant: {
            required: false,
            default: false
        }
    },
    components: {
        Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
        ExclamationCircleIcon
    },
    data() {
        return {
            open: false,
            full_screen: true
        }
    },
    methods: {
        toggleApi() {
            this.$fullscreen.toggle(document.body, true)
            this.full_screen = true
        },
        activate_screen() {
            console.error(this.$fullscreen.isFullscreen);
        }
    },
    mounted() {
        this.full_screen = false
    }
}
</script>