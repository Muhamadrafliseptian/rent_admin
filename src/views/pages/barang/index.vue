<template>
    <div class="card shadow mb-4">
        <div class="card-header py-4">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">
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
                            deskripsi
                        </th>
                        <th>
                            harga
                        </th>
                        <th>
                            stok
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
                    <tbody v-else-if="!barang.length">
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
                    <tbody v-for="(data, index) in barang" :key="index">
                        <tr>
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ data.nama }}
                            </td>
                            <td>
                                {{ data.deskripsi }}
                            </td>
                            <td>
                                {{ data.harga }}
                            </td>
                            <td>
                                <i class="fas fa-minus" data-toggle="modal" data-target="#kurangQty" @click="getQty(data.id)"></i>
                                {{ data.stok }} 
                                <i class="fas fa-plus" data-toggle="modal" data-target="#tambahQty" @click="getQty(data.id)"></i>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button class="btn btn-warning btn-sm mr-2" @click="getQty(data.id)" data-toggle="modal" data-target="#editBarang">
                                        edit
                                    </button>
                                    <button class="btn btn-danger btn-sm mr-2" @click="deleteBarang(data.id)">
                                        delete
                                    </button>
                                    <a :href="data.foto" target="_blank" class="btn btn-sm btn-info">
                                        lihat foto
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="modal">
        <template #modal>
            <Label for="foto">Foto barang</Label>
            <input type="file" @change="chooseFoto" class="form-control">
            <Label>Nama</Label>
            <input type="text" v-model="form.name" class="form-control">
            <Label>Harga</Label>
            <input type="text" v-model="form.harga" class="form-control">
            <Label>Deskripsi</Label>
            <input type="text" v-model="form.description" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="postBarang">
                submit
            </button>
        </template>
    </ModalComponent>
    <ModalComponent id="tambahQty">
        <template #modal>
            <Label>Quantity</Label>
            <input type="text" v-model="form.qty" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="postQty">
                submit
            </button>
        </template>
    </ModalComponent>
    <ModalComponent id="kurangQty">
        <template #modal>
            <Label>Quantity</Label>
            <input type="text" v-model="form.qty" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="kurangQty">
                submit
            </button>
        </template>
    </ModalComponent>
    <ModalComponent id="editBarang">
        <template #modal>
            <Label for="foto">Foto barang</Label>
            <input type="file" @change="chooseFoto" class="form-control">
            <Label>Nama</Label>
            <input type="text" v-model="form.name" class="form-control">
            <Label>Harga</Label>
            <input type="text" v-model="form.harga" class="form-control">
            <Label>Deskripsi</Label>
            <input type="text" v-model="form.description" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="submitEdit">
                submit
            </button>
        </template>
    </ModalComponent>
</template>
<script>
import LoadingIndicator from '@/components/partials-dashboard/LoadingComponent.vue'
import ModalComponent from '@/components/form/modalcomponent.vue'
export default {
    data() {
        return {
            barang: [],
            form: {
                name: '',
                description: '',
                harga: '',
                foto: null,
                qty: '',
                gambarLama: ''
            },
            isLoading: false,
            id: ''
        }
    },
    computed: {
        formData() {
            const formData = new FormData()

            formData.append('foto', this.form.foto)
            formData.append('name', this.form.name)
            formData.append('harga', this.form.harga)
            formData.append('description', this.form.description)

            return formData;
        },
        formEdit() {
            const formEdit = new FormData()

            formEdit.append('foto', this.form.foto)
            formEdit.append('name', this.form.name)
            formEdit.append('harga', this.form.harga)
            formEdit.append('description', this.form.description)
            formEdit.append('gambarLama', this.form.gambarLama)

            return formEdit;
        },

    },
    components: {
        ModalComponent, LoadingIndicator
    },
    created() {
        this.getBarang()
    },
    methods: {
        getQty(id){
            this.id = id
        },
        postQty(){
            let type = "postData"
            let url = [
                "stok_barang/masuk", {
                    barang_id: this.id,
                    qty: this.form.qty
                }, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                window.location = '/barang'
            }).catch((err)=>{
                console.log(err);
            })
        },
        kurangQty(){
            let type = "postData"
            let url = [
                "stok_barang/keluar", {
                    barang_id: this.id,
                    qty: this.form.qty
                }, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                window.location = '/barang'
            }).catch((err)=>{
                console.log(err);
            })
        },
        getBarang() {
            let type = "getData"
            let url = [
                "barang", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.barang = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        postBarang() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", ['barang', this.formData])
                        .then((result) => {
                            this.handleSuccess('berhasil tambah data barang')
                            this.getBarang()
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    this.handleGalat('maaf, ukuran gambar terlalu besar')
                }
            } else {
                this.handleGalat('maaf, format gambar tidak sesuai')
            }
        },
        deleteBarang(id) {
            let type = "deleteData"
            let url = [
                "barang", id, {}
            ]
            this.$swal({
                icon: 'question',
                title: 'apakah ingin menghapus data barang',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    this.$store.dispatch(type, url).then((response)=>{
                        this.handleSuccess('berhasil hapus data')
                        this.getBarang()
                    })
                }
            })
        },
        chooseFoto(event) {
            this.form.foto = event.target.files[0]
        },
        submitEdit(){
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", [`barang/${this.id}?_method=put`, this.formEdit])
                        .then((result) => {
                            this.handleSuccess('berhasil ubah data barang')
                            this.getBarang()
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    this.handleGalat('Maaf, ukuran file gambar terlalu besar. Maksimum ukuran file adalah 5MB')
                }
            } else {
                this.handleGalat('Maaf, format yang diperbolehkan hanya jpg, png, jpeg')

            }
        },
        handleSuccess(message){
            this.$swal({
                icon: 'success',
                title: message
            })
        },
        handleGalat(message){
            this.$swal({
                icon: 'error',
                title: message
            })
        }
    }
}
</script>