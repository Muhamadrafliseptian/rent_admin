<template>
    <Label>Nama</Label>
    <input type="text" :value="detailRiwayat.barang.nama" readonly class="form-control">
    <Label>Deskripsi</Label>
    <input type="text" :value="detailRiwayat.barang.deskripsi" readonly class="form-control">
    <Label>Harga Satuan</Label>
    <input type="text" :value="detailRiwayat.barang.harga" readonly class="form-control">
    <p class="mt-2 mb-0">
        Total Qty: {{ detailRiwayat.qty }}
    </p>
    <p class="mt-1">
        Total Harga: {{ detailRiwayat.totalBeli }}
    </p>
</template>
<script>
export default {
    data(){
        return{
            detailRiwayat: []
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    created() {
        this.getDetailRiwayat()
    },
    methods: {
        getDetailRiwayat() {
            let type = "getData"
            let url = [
                `riwayat/${this.idFromParams}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.detailRiwayat = result.data[0]
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>