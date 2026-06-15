
const routes = [
    { 
        path: '/', 
        component: MenuPage, 
        name: 'menu' 
    },
    { 
        path: '/login', 
        component: LoginPage, 
        name: 'login' 
    },
    { 
        path: '/admin', 
        component: AdminMenuPage, 
        name: 'admin',
        meta: { requiresAuth: true } 
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), 
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!getToken(); 

    if (to.meta.requiresAuth && !isAuthenticated) {
        alert("Access Denied. Please log in first.");
        next('/login'); 
    } else {
        next(); 
    }
});