<template>
    <TransitionRoot as="template" :show="sleep">
        <TransitionChild as="template" enter="ease-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-in duration-500" leave-from="opacity-100" leave-to="opacity-0">
            <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full min-h-full sm:max-w-md">
                    <img class="mx-auto h-96 w-auto rounded-full" src="/static/images/Logo.png" alt="Home App" />
                </div>
            </div>
        </TransitionChild>
    </TransitionRoot>
</template>
<script>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'
export default {
    name: 'screen-saver',
    components: {
        TransitionChild, TransitionRoot
    },
    data() {
        return {
            sleep: false,
            idleTimeout: null
        };
    },
    mounted() {
        this.resetIdleTimer();
        window.addEventListener('mousemove', this.resetIdleTimer);
        window.addEventListener('keydown', this.resetIdleTimer);
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.resetIdleTimer);
        window.removeEventListener('keydown', this.resetIdleTimer);
        this.clearIdleTimeout();
    },
    methods: {
        setSleep() {
            this.sleep = true;
        },
        resetIdleTimer() {
            this.sleep = false;
            this.clearIdleTimeout();
            this.idleTimeout = setTimeout(this.setSleep, 300000);
        },
        clearIdleTimeout() {
            if (this.idleTimeout) {
                clearTimeout(this.idleTimeout);
                this.idleTimeout = null;
            }
        }
    }
}
</script>