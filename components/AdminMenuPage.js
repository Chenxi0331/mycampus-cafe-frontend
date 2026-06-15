const AdminMenuPage = {
    template: `
        <div class="admin-container">
            <h2>Menu Management (Staff View)</h2>
            <p class="status-message" v-if="feedbackMessage">{{ feedbackMessage }}</p>

            <form @submit.prevent="addMenu" class="crud-form">
                <h3>Add New Menu Item</h3>
                <input v-model="newMenu.menu_name" placeholder="Item Name" required>
                <select v-model="newMenu.category">
                    <option value="Main Course">Main Course</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Snack">Snack</option>
                </select>
                <input v-model="newMenu.price" type="number" step="0.01" placeholder="Price (RM)" required>
                <select v-model="newMenu.availability">
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                <button type="submit">Add Item</button>
            </form>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price (RM)</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in menuItems" :key="item.menu_id">
                        <td>{{ item.menu_id }}</td>
                        <td><input v-model="item.menu_name" @change="updateMenu(item)"></td>
                        <td>
                            <select v-model="item.category" @change="updateMenu(item)">
                                <option value="Main Course">Main Course</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </td>
                        <td><input v-model="item.price" type="number" step="0.01" @change="updateMenu(item)"></td>
                        <td>
                            <select v-model="item.availability" @change="updateMenu(item)">
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </td>
                        <td>
                            <button class="delete-btn" @click="deleteMenu(item.menu_id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() {
        return {
            menuItems: [],
            feedbackMessage: '',
            newMenu: { menu_name: '', category: 'Main Course', price: '', availability: 'Available' }
        };
    },
    methods: {
        async fetchMenu() {
            const response = await fetch(API_CONFIG.BASE_URL + "/menu");
            this.menuItems = await response.json();
        },
        async addMenu() {
            try {
                const response = await fetch(API_CONFIG.BASE_URL + "/menu", {
                    method: "POST",
                    headers: authHeaders(), // Injects Authorization Bearer Token
                    body: JSON.stringify(this.newMenu)
                });
                const result = await response.json();

                if (response.ok) {
                    this.feedbackMessage = "Menu item added successfully.";
                    this.newMenu = { menu_name: '', category: 'Main Course', price: '', availability: 'Available' };
                    this.fetchMenu();
                } else {
                    this.feedbackMessage = handleApiError(response, result);
                }
            } catch (error) { 
                this.feedbackMessage = "Critical server connection error.";
            }
        },
        async updateMenu(item) {
            try {
                const response = await fetch(API_CONFIG.BASE_URL + "/menu/" + item.menu_id, {
                    method: "PUT",
                    headers: authHeaders(),
                    body: JSON.stringify(item)
                });
                if (response.ok) this.feedbackMessage = "Menu item updated in database.";
            } catch (error) { console.error(error); }
        },
        async deleteMenu(id) {
            if (!confirm("Are you sure you want to delete this menu item?")) return;
            try {
                const response = await fetch(API_CONFIG.BASE_URL + "/menu/" + id, {
                    method: "DELETE",
                    headers: authHeaders()
                });
                if (response.ok) {
                    this.feedbackMessage = "Menu item deleted successfully.";
                    this.fetchMenu();
                }
            } catch (error) { console.error(error); }
        }
    },
    mounted() {
        this.fetchMenu();
    }
};