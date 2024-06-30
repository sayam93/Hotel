import axios from 'axios';

export default{
    async post(context,url,payload={},params={},timeout=null){
        try {
            const response = await axios.post('/backend/'+url, payload,{
                params:params,
                timeout:timeout
            });
            if (response.data.hasOwnProperty("data")) {
                return {status:true,data:response.data.data};
            }
            return {status:true};
        } catch (error) {
            if(!error.hasOwnProperty('response')){
                return {status:false};
            }
            switch (error.response.status) {
                case 400:
                    context.dispatch('error', error.response.data,{root:true})
                    break;
            
                default:
                    break;
            }
            return {status:false};
        }
    },
    async file(context,url,payload={},params={}){
        try {
            const response = await axios.post('/backend/'+url, payload,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                params:params
            });
            if (response.data.hasOwnProperty("data")) {
                return {status:true,data:response.data.data};
            }
            return {status:true};
        } catch (error) {
            if(!error.hasOwnProperty('response')){
                return {status:false};
            }
            switch (error.response.status) {
                case 400:
                    context.dispatch('error', error.response.data,{root:true})
                    break;
            
                default:
                    break;
            }
            return {status:false};
        }
    },
    async get(context,url,params={},timeout=60000){
        try {
            const response = await axios.get('/backend/'+url,{
                params:params,
                timeout:timeout
            });
            
            switch (response.status) {
                case 200: case 201:
                    if (response.data.hasOwnProperty("data")) {
                        return {status:true,data:response.data.data};
                    }
                    return {status:true};
                default:
                    return {status:false};
            }
            
        } catch (error) {
            if(!error.hasOwnProperty('response')){
                return {status:false};
            }
            switch (error.response.status) {
                case 400:
                    context.dispatch('error', error.response.data,{root:true})
                    break;
            
                default:
                    break;
            }
            return {status:false};
        }
    }
}