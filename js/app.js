const app = Vue.createApp({
    data() {
        return {
            isLoggedIn: !!getToken(),
            globalMessage: ""
        };
    },
    methods: {
        updateAuthStatus() {
            this.isLoggedIn = !!getToken();
            if (this.isLoggedIn) {
                this.$router.push('/admin'); 
            }
        },
        logoutStaff() {
            clearToken();
            this.isLoggedIn = false;
            alert("Logged out safely.");
            this.$router.push('/'); 
        }
    }
});

app.use(router);

app.mount("#app");