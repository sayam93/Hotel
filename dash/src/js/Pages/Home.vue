<template>
    <main class="mx-auto max-w-[100rem] h-full">

        <confirm v-if="should_confirm" :is_vacant="next_state" :room="next_room" @close="confirmState" />
        <Loader v-if="loading" />
        <div v-else class="flex h-full space-x-7 lg:px-6 sm:py-4 sm:px-4 relative overflow-hidden">
            <div :class="[platform.os=='ios'?'pt-20 md:pt-12':'pt-12','w-1/2 sm:w-1/3 lg:w-60 xl:w-96 h-h-full bg-zinc-800 text-white px-1 sm:px-5 sticky top-0']">
                <div class="flex flex-col h-full overflow-hidden pt-6 sm:pt-0">
                    <p class="text-3xl sm:text-4xl xl:text-6xl font-extralight tracking-wider">{{ beauty_date.time }}
                    </p>
                    <div class="mt-5 text-zinc-100">{{ beauty_date.day }}</div>
                    <div :class="[platform.os=='ios'?'pb-20 md:pb-0':'','flex-1 overflow-y-auto overflow-x-hidden']">
                        <div class="pr-5 ">
                            <div @click="setActive(null)" :class="[!platform.is_touch?'hover:bg-zinc-700':'','flex space-x-5 items-center py-1 px-1 sm:py-3 sm:px-3  mt-1 rounded-md cursor-pointer']">
                                <span
                                    :class="[summary.empty ? 'bg-zinc-600' : summary.occupied ? 'bg-green-50' : 'bg-yellow-50', 'p-1.5  rounded-full']">
                                    <svg v-if="summary.empty" class="h-6 w-6 sm:h-9 sm:w-9 fill-zinc-800"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <title>bed-empty</title>
                                        <path d="M19,7H5V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7" />
                                    </svg>
                                    <svg v-else
                                        :class="[summary.occupied ? 'fill-green-600' : 'fill-yellow-600', 'h-6 w-6 sm:h-9 sm:w-9 ']"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <title>bed</title>
                                        <path
                                            d="M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z" />
                                    </svg>
                                </span>
                                <div class="tracking-wide text-xs sm:text-sm">
                                    <h3 class="font-semibold text-zinc-200 line-clamp-1">All Rooms</h3>
                                    <p class="text-zinc-400 line-clamp-1 capitalize">{{summary.status}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 pr-5">
                            <div v-for="(rtype, tidx) in room_labels" @click="setActive(rtype.id)" :class="[!platform.is_touch?'hover:bg-zinc-700':'',active_label==rtype.id?'bg-zinc-900':'','flex space-x-5 items-center py-1 px-1 sm:py-3 sm:px-3 mt-1 rounded-md cursor-pointer']">
                                <span
                                    :class="[rtype.empty ? 'bg-zinc-600' : rtype.occupied ? 'bg-green-50' : ' bg-yellow-50', 'p-1.5 rounded-full ']">
                                    <svg v-if="rtype.empty" class="h-6 w-6 sm:h-9 sm:w-9  fill-zinc-800"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <title>bed-empty</title>
                                        <path d="M19,7H5V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7" />
                                    </svg>
                                    <svg v-else
                                        :class="[rtype.occupied ? 'fill-green-600' : 'fill-yellow-600', 'h-6 w-6 sm:h-9 sm:w-9']"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <title>bed</title>
                                        <path
                                            d="M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z" />
                                    </svg>
                                </span>
                                <div class="tracking-wide text-xs sm:text-sm">
                                    <h3 class="font-semibold text-zinc-200 line-clamp-1">{{ rtype.name }}</h3>
                                    <p class="text-zinc-400 line-clamp-1">{{ rtype.status }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div
                class="flex-1 pr-3 overflow-y-auto overflow-x-hidden h-full py-4 sm:py-0 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-600 pb-1">
                <div :class="[platform.os=='ios'?'pt-20 pb-20 md:pb-0 sm:pt-0':'','sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid grid-cols-1 gap-3']">
                    <div v-for="(room, ridx) in display_rooms" class="grid-item" :style="{ 'height': height + 'px' }"
                        :key="ridx">

                        <button @click="changeState(room.id, room.is_vacant); createRipple(($event))"
                            :class="[room.is_vacant ? ' bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-zinc-100', 'rounded-3xl h-full w-full overflow-hidden relative']">
                            <svg v-if="room.is_vacant"
                                class="absolute top-10 sm:top-5 lg:top-10 left-6 h-1/3 w-auto fill-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>bag-carry-on-off</title>
                                <path
                                    d="M2.1 4.9L6 8.9V19C6 19.5 6.2 20 6.6 20.4C7 20.8 7.5 21 8 21V10.8L9 11.8V21H13.2C13.1 20.6 13 20.2 13 20C13 18.8 13.5 18 14.6 17.4L15.4 18.2C14.5 18.5 14.1 19.2 14.1 20.1C14.1 20.6 14.3 21.1 14.7 21.5C15 21.8 15.5 22 16 22C16.9 22 17.6 21.6 17.9 20.7L19.1 21.9L20.5 20.5L3.5 3.5L2.1 4.9M12 2C12 2.5 12.2 3 12.6 3.4S13.5 4 14 4V7H9.8L16 13.2V2H12Z" />
                            </svg>
                            <svg v-else class="absolute top-10 sm:top-5 lg:top-10 left-6 h-1/3 w-auto fill-red-600"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>bag-carry-on-check</title>
                                <path
                                    d="M15.28,16.69L18.14,13.88L18.84,14.58L15.28,18.14L13.17,16L13.88,15.28L15.28,16.69M8,21A2,2 0 0,1 6,19V9A2,2 0 0,1 8,7V21M9,7H14V4A2,2 0 0,1 12,2H16V10A6,6 0 0,1 22,16A6,6 0 0,1 16,22C14.77,22 13.63,21.63 12.68,21H9V7M16,12A4,4 0 0,0 12,16A4,4 0 0,0 16,20A4,4 0 0,0 20,16A4,4 0 0,0 16,12Z" />
                            </svg>
                            <div
                                :class="[room.is_vacant ? ' text-zinc-400 ' : 'text-zinc-600', 'absolute left-0 bottom-5 sm:bottom-4 lg:bottom-5 w-full text-sm md:text-base lg:text-xl font-semibold pl-6 sm:pl-2 lg:pl-6  tracking-wide text-left text-wrap']">
                                <span class="mr-2">{{ room.id }} </span>
                                <span v-if="room.is_vacant">Vacant</span>
                                <span v-else>Occupied</span>
                            </div>
                            <div class="absolute top-0 left-0 h-full w-full bg-red-600 opacity-5"
                                v-if="errors.includes(room.id)"></div>
                            <div class="absolute top-5 right-5" v-if="errors.includes(room.id)">
                                <div
                                    class="mx-auto flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 p-1.5">
                                    <ExclamationTriangleIcon class="h-4 w-4 text-red-600" aria-hidden="true" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import confirm from '../components/confirm.vue';
import Loader from '../components/Loader.vue';

import appMixen from '../mixins/app'
import { format } from "date-fns";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
export default {
    name: 'home-page',
    mixins: [appMixen],
    components: {
        confirm,
        Loader,
        ExclamationTriangleIcon
    },
    data() {
        return {
            loading: true,
            active_label:null,
            should_confirm: false,
            false: false,
            next_room: null,
            next_state: null,
            date: null,
            errors: [],
            getting_labels: false,
            height: 0,
        }
    },
    methods: {
        changeState(room, is_vacant) {
            this.next_room = room
            this.next_state = !is_vacant
            this.should_confirm = true
        },
        confirmState(status) {
            this.should_confirm = this.false
            if (!status) {
                this.next_state = null
                this.next_room = null
                return
            }

            this.changeRoomState(this.next_room, this.next_state)
        },
        setActive(label){
            console.error(label);
            if (this.active_label==label){
                this.active_label=null
            }else{
                this.active_label=label
            }
        },
        async changeRoomState(room, is_vacant) {
            this.wait(true)
            try {
                let resp=await this.$store.dispatch('setState',{room:room,'state':is_vacant?'off':'on'})
                if (resp){
                    // this.setroomStatus(room,is_vacant)
                }else{
                    this.errors.push(room)
                }
            } catch (error) {
                error(error)
                this.errors.push(room)
            }
            this.wait(false)
            setTimeout(() => {
                let idx = this.errors.indexOf(room)
                this.errors.splice(idx, 1)
            }, 5000);
        },
        updateGridItemSize() {
            const firstGridItem = document.querySelector('.grid-item');
            if (firstGridItem) {
                const width = firstGridItem.offsetWidth;
                this.height = width;
            }
        },
        async init() {
            // set date for app
            this.date = new Date()
            await this.$store.dispatch('entities')
            setInterval(() => {
                this.$store.dispatch('entities')
            }, 1000);
            setInterval(() => {
                this.date = new Date()
            }, 10000);
            this.loading = false
        }
    },
    computed: {
        beauty_date() {
            if (this.date == null) {
                return { time: '', day: '' }
            }
            return {
                time: format(this.date, "h:mm aa"),
                day: format(this.date, "EEEE, MMMM d")
            }
        },
        rooms() {
            let rooms = this.$store.getters['rooms']
            return rooms
        },
        display_rooms(){
            if (this.active_label==null){
                return this.rooms
            }
            return this.rooms.filter(el=>{
                return el.label==this.active_label
            })
        },
        labels() {
            return this.$store.getters['labels']
        },
        platform() {
            return this.$store.getters['platform']
        },
        room_labels() {
            let labels = []
            Object.keys(this.labels).forEach(label=>{
                let total = this.rooms.filter(element => {
                    return element.label==label
                })
                let empty = this.rooms.filter(element => {
                    return element.label==label && element.is_vacant
                })
                let occupied = this.rooms.filter(element => {
                    return element.label==label && !element.is_vacant
                })
                let status = 'All Vacant';
                if (occupied.length == total.length) {
                    status = 'All Occupied'
                } else if (occupied.length > 0) {
                    status = occupied.length + ' Occupied'
                }
                labels.push({ name: this.labels[label], id: label, total: total.length, status: status, empty: occupied.length == 0, occupied: occupied.length == total.length })
            })
            labels.sort((a, b) => b.total - a.total );
            return labels
        },
        summary() {
            let occupied = this.rooms.filter(element => {
                return !element.is_vacant
            })
            let total = this.rooms.length
            let status = 'All vacant';
            if (occupied.length == total) {
                status = 'All occupied'
            } else if (occupied.length > 0) {
                status = occupied.length + ' Occupied'
            }

            let types = { total: total, status: status, empty: occupied.length == 0, occupied: occupied.length == total }
            return types
        },
    },
    watch: {
        rooms:{
            handler(newValue,oldValue) {
                this.updateGridItemSize()
            },
            deep:true
            // this.get_labels()
            
        },
    },
    mounted() {
        this.init()
        window.addEventListener('resize', this.updateGridItemSize);
    }
}
</script>