<template>
    <div class="card shadow mb-4">
        <div class="card-header py-4">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                    <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#tambahData">
                        Tambah Data
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
                    <tbody>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>
                                tenda
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button class="btn btn-warning btn-sm mr-2">
                                        edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteBarang">
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
</template>
<script>
export default{
    data(){
        return{
            kategori_barang: []
        }
    },
    created(){
        this.getKategoriBarang()
    },
    methods: {
        getKategoriBarang(){
            let type = "getData"
            let url = [
                "kategori_barang", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.kategori_barang = result.data
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>