import { createStore } from "vuex";
import request from './request';
const store = createStore({
    namespaced: true,
    modules: {},
    state() {
        return {
            waiting: false,
            token: null,
            platform: null,
            auth_token:{},
            rooms: [],
            labels: [],
            room_types: {},
            device_id: {},
            error:false
        }
    },
    getters: {
        rooms(state){
            return state.rooms
        },
        platform(state){
            return state.platform
        },
        error(state){
            return state.error
        },
        labels(state){
            return state.labels
        },
        device_id(state) {
            return state.device_id;
        },
        waiting(state) {
            return state.waiting;
        },
        token(state) {
            return state.token;
        },
        room_types(state) {
            return state.room_types;
        },
    },
    actions: {
        async api(context,payload) {
            let response=await request.post(context,'api',payload)
            if (response.status){
                return true;
            }
            return false;
        },
        async log(context,payload) {
            let response=await request.get(context,'log',payload)
            if (response.status){
                context.commit('log',response.data.error);
            }
            return false;
        },
        async entities(context,payload) {
            let response=await request.get(context,'entities',payload)
            if (response.status){
                context.commit('entities',response.data)
                return true;
            }
            return false;
        },
        async setState(context,payload){
            let response=await request.post(context,'set-state',payload)
            if (response.status){
                return true;
            }
            return false;
        },
        async getauthToken(context,payload){
            let response=await request.post(context,'auth-token',payload)
            if (response.status){
                context.commit("platform",response.data)
                return true;
            }
            return false;
        },
        async doLogin(context,payload){
            let response=await request.post(context,'do-login',payload)
            if (response.status){
                context.commit("platform",response.data)
                return true;
            }
            return false;
        }
    },
    mutations: {
        token(state,payload){
            state.token=payload
        },
        log(state,payload){
            state.error=payload
        },
        entities(state,payload){
            if (state.labels!==payload.labels) {
                state.labels=payload.labels
            }
            if (state.rooms!==payload.rooms) {
                state.rooms=payload.rooms
            }
        },
        setRoomState(state,payload){
            state.rooms[payload.id].is_vacant=payload.state
        },

        device_id(state,payload){
            state.device_id=payload
        },
        waiting(state, payload) {
            state.waiting = payload;
        },
        platform(state, payload) {
            state.platform = payload;
        },
        labels(state,payload) {
            // Create a temporary object to group rooms by their types
            state.room_types=payload;
        },
        // room_types(state, payload) {
        //     state.room_types = payload;
        // },
    },
});

export default store;