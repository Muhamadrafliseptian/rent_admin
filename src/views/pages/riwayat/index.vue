<template>
    <div class="card shadow mb-4">
        <div class="card-header py-4">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <th>
                            no
                        </th>
                        <th>
                            invoice number
                        </th>
                        <th>
                            nama
                        </th>
                        <th>
                            alamat
                        </th>
                        <th>
                            harga
                        </th>
                        <th>
                            status
                        </th>
                        <th>
                            tanggal
                        </th>
                        <th>
                            aksi
                        </th>
                    </thead>
                    <tbody v-if="isLoading">
                        <tr>
                            <td colspan="12" class="text-center">
                                <LoadingIndicator />
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!riwayat.length">
                        <tr>
                            <td colspan="12" class="text-center">
                                <div class="alert alert-info w-100">
                                    <strong><i>
                                            Data Tidak Ada
                                        </i></strong>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-for="(data, index) in riwayat" :key="index">
                        <tr>
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ data.invoice }}
                            </td>
                            <td>
                                {{ data.user.nama }}
                            </td>
                            <td>
                                {{ data.user.alamat }}
                            </td>
                            <td>
                                {{ data.jumlahHarga }}
                            </td>
                            <td>
                                {{ data.status }}
                            </td>
                            <td>
                                {{ data.tanggal }}
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button data-toggle="modal" data-target="#editKategori"
                                        class="btn btn-warning btn-sm mr-2" @click="getDetailRiwayat(data.id)">
                                        edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="editKategori">
        <template #modal>
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
    </ModalComponent>
</template>
<script>
import ModalComponent from '@/components/form/modalcomponent.vue'
import LoadingIndicator from '@/components/partials-dashboard/LoadingComponent.vue'
export default {
    data() {
        return {
            riwayat: [],
            detailRiwayat: [],
            name: '',
            isLoading: false,
            id: ''
        }
    },
    created() {
        this.getRiwayat()
    },
    components: {
        LoadingIndicator, ModalComponent
    },
    methods: {
        getId(id){
            this.id = id
        },
        getRiwayat() {
            let type = "getData"
            let url = [
                "riwayat", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.riwayat = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getDetailRiwayat(id) {
            let type = "getData"
            let url = [
                `riwayat/${id}`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailRiwayat = result.data[0]
            }).catch((err) => {
                console.log(err);
            })
        },
        handleSuccess(message) {
            this.$swal({
                icon: 'success',
                title: message
            })
        },
    },
}
</script>