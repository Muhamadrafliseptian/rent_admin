<template>
    <div class="card shadow mb-4">
        <div class="card-header py-4">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#tambahKategori">
                    Tambah Dataa
                </button>
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
                            nama
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
                    <tbody v-else-if="!kategori.length">
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
                    <tbody v-for="(data, index) in kategori" :key="index">
                        <tr>
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ data.name }}
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button data-toggle="modal" data-target="#editKategori"
                                        class="btn btn-warning btn-sm mr-2" @click="getId(data.id)">
                                        edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteKategori(data.id)">
                                        delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahKategori">
        <template #modal>
            <Label>Nama</Label>
            <input type="text" v-model="name" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="postKategori">
                submit
            </button>
        </template>
    </ModalComponent>
    <ModalComponent id="editKategori">
        <template #modal>
            <Label>Nama</Label>
            <input type="text" v-model="name" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="submitEdit">
                submit
            </button>
        </template>
    </ModalComponent>
</template>
<script>
import ModalComponent from '@/components/form/modalcomponent.vue'
import LoadingIndicator from '@/components/partials-dashboard/LoadingComponent.vue'
export default {
    data() {
        return {
            kategori: [],
            name: '',
            isLoading: false,
            id: ''
        }
    },
    created() {
        this.getKategori()
    },
    components: {
        LoadingIndicator, ModalComponent
    },
    methods: {
        getId(id){
            this.id = id
        },
        getKategori() {
            let type = "getData"
            let url = [
                "kategori", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.kategori = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        submitEdit(){
            let type = "updateData"
            let url = [
                `kategori/${this.id}`, {
                    name: this.name
                }, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
        postKategori() {
            let type = "postData"
            let url = [
                "kategori", {
                    name: this.name
                }, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.handleSuccess('berhasil tambah data')
                this.getKategori()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteKategori(id) {
            let type = "deleteData"
            let url = [
                `kategori`, id, {}
            ]
            this.$swal({
                icon: 'question',
                title: 'apakah ingin menghapus data kategori',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    this.$store.dispatch(type, url).then((response) => {
                        this.handleSuccess('berhasil hapus kategori')
                        this.getKategori()
                    }).catch((err) => {
                        console.log(err);
                    })
                }
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