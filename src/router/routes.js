import admin from "./modules/admin";
import auth from "./modules/auth";
import barang from "./modules/barang";
import riwayat from "./modules/riwayat";
const routes = [
    ...auth,
    ...barang,
    ...admin,
    ...riwayat,
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: ()=>import('../views/pages/dashboard/index.vue')
    }
]

export default routes