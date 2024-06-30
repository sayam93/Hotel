export default{
    data(){
        return{
            connection:null,
            auth:null,
            cookies:null
        }
    },
    methods:{
        createRipple(event) {
            const button = event.currentTarget;
      
            // Create span element for the ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
      
            // Calculate size and position of the ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      
            // Append the ripple to the button
            button.appendChild(ripple);
      
            // Remove the ripple after the animation
            ripple.addEventListener('animationend', () => {
              ripple.remove();
            });
          },
        rndStr(len=20) {
            let text = " "
            let chars = "abcdefghijklmnopqrstuvwxyz"

            for (let i = 0; i < len; i++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return text
        },
        setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        },
        getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        deviceID() {
            let deviceId = this.getCookie("device_id");
            if (!deviceId) {
                deviceId=this.rndStr(40)
                this.setCookie("device_id", deviceId, 3650); 
            }
            return deviceId;
        },
        wait(value){
            this.$store.commit('waiting',value);
        },
    },
    computed:{
        token(){
            return this.$store.getters['token']
        },
        waiting() {
            return this.$store.getters['waiting'];
        },
    },
    mounted(){
    }
}