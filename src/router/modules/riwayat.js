export default([
    {
        path: '/transaksi/riwayat',
        name: 'Riwayat Transaksi',
        component: ()=>import('@/views/pages/riwayat/index.vue')
    },
    {
        path: '/transaksi/riwayat/:id',
        name: 'Detail Transaksi',
        component: ()=>import('@/views/pages/riwayat/detail_riwayat.vue')
    }
])