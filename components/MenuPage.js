const MenuPage = {
    template: `
        <div class="menu-container">
            <h2>Our Menu</h2>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <div class="menu-grid">
                <div v-for="item in menuItems" :key="item.menu_id" class="menu-card">
                    <h3>{{ item.menu_name }}</h3>
                    <p>Category: {{ item.category }}</p>
                    <p>Price: RM {{ parseFloat(item.price).toFixed(2) }}</p>
                    <p>Status: <span :class="item.availability.toLowerCase()">{{ item.availability }}</span></p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            menuItems: [],
            errorMessage: ''
        };
    },
    methods: {
        async fetchMenu() {
            try {
                const response = await fetch(API_CONFIG.BASE_URL + "/menu");
                if (!response.ok) throw new Error();
                this.menuItems = await response.json();
            } catch (error) {
                this.errorMessage = "Failed to load menu data.";
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchMenu(); // Fetches rows automatically when page loads
    }
};