const LoginPage = {
    template: `
        <div class="login-container">
            <h2>Staff Login</h2>
            <form @submit.prevent="handleLogin">
                <div>
                    <label>Username:</label>
                    <input v-model="username" placeholder="Enter username" required>
                </div>
                <div>
                    <label>Password:</label>
                    <input v-model="password" type="password" placeholder="Enter password" required>
                </div>
                <button type="submit">Login</button>
            </form>
            <p v-if="loginMessage" class="message">{{ loginMessage }}</p>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            loginMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch(API_CONFIG.BASE_URL + "/login", { // Uses api.js config
                    method: "POST",
                    headers: publicHeaders(), // Uses api.js utility
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                const result = await response.json();
                
                if (response.ok && result.token) {
                    setToken(result.token); // Saves token in localStorage
                    this.loginMessage = "Login successful.";
                    this.$emit('login-success'); // Tells app.js that login completed
                    this.$router.push('/admin');
                    this.$emit('login-success');
                } else {
                    this.loginMessage = result.message || "Invalid login.";
                }
            } catch (error) {
                this.loginMessage = "Unable to connect to server.";
                console.error(error);
            }
        }
    }
};