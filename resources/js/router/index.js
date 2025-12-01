import { createRouter, createWebHistory} from 'vue-router';

import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';

import Clubs from '../pages/clubs/Clubs.jsx';
import AddClub from '../components/AddClub.jsx';
import EditClub from '../components/EditClub.jsx';
import ShowClub from '../components/Clubs.jsx';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'about',
        path: '/about',
        component: About,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
    },
    {
        name: 'clubs',
        path: '/clubs',
        component: Clubs,
    },
    {
        name: 'add-club',
        path: '/clubs/add',
        component: AddClub,
    },
    {
        name: 'edit-club',
        path: '/clubs/edit/:id',
        component: EditClub,
    },
    {
        name: 'show-club',
        path: '/clubs/:id',
        component: ShowClub,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) {
        next({ name: "/login" });
    } else {
        next();
    }
});
export default router;
