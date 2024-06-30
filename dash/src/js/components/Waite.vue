<template>
    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:p-6 z-50">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="waiting" class="pointer-events-auto w-48 overflow-hidden rounded-lg bg-zinc-700 shadow-lg ring-1 ring-zinc-500  mt-12">
            <div class="p-4">
                <div class="flex items-center">
                <div class="flex w-0 flex-1 justify-between">
                    <p class="w-0 flex-1 text-sm font-medium text-white">Please wait</p>
                    <span class="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </transition>
        </div>
    </div>
</template>
<script>
export default {
    name:'waite',
    data(){
        return{
        }
    },
    computed:{
        waiting(){
            return this.$store.getters['waiting'];
        }
    },
    mounted(){
        
    }
}
</script>