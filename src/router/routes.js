import admin from "./modules/admin";
import auth from "./modules/auth";
import barang from "./modules/barang";
const routes = [
    ...auth,
    ...barang,
    ...admin,
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: ()=>import('../views/pages/dashboard/index.vue')
    }
]

export default routes