export default([
    {
        path: '/barang',
        name: 'Barang',
        component: ()=>import('@/views/pages/barang/index.vue')
    },
    {
        path: '/kategori-barang',
        name: 'Kategori Barang',
        component: ()=>import('@/views/pages/kategori/index.vue')
    },
    {
        path: '/grouping-barang',
        name: 'Grouping Barang',
        component: ()=>import('@/views/pages/grouping-barang/index.vue')
    }
])