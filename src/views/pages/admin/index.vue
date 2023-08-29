<template>
    <div class="card shadow mb-4">
        <div class="card-header py-4">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#tambahAdmin">
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
                            email
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
                    <tbody v-else-if="!data_admin.length">
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
                    <tbody v-for="(data, index) in data_admin" :key="index">
                        <tr>
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ data.name }}
                            </td>
                            <td>
                                {{ data.email }}
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button class="btn btn-warning btn-sm mr-2" @click="detailAdmin(data.id)" type="button" data-toggle="modal" data-target="#postEdit">
                                        edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteAdmin(data.id)">
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
    <ModalComponent id="tambahAdmin">
        <template #modal>
            <Label>Nama</Label>
            <input type="text" v-model="form.name" class="form-control">
            <Label>Email</Label>
            <input type="email" v-model="form.email" class="form-control">
            <Label>Password</Label>
            <input type="password" v-model="form.password" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="postAdmin">
                submit
            </button>
        </template>
    </ModalComponent>
    <ModalComponent id="postEdit">
        <template #modal>
            <Label>Nama</Label>
            <input type="text" v-model="form.name" class="form-control">
            <Label>Email</Label>
            <input type="email" v-model="form.email" class="form-control">
            <Label>Password</Label>
            <input type="password" v-model="form.password" class="form-control">
            <button class="btn btn-sm btn-primary mt-3" @click="postEdit">
                submit
            </button>
        </template>
    </ModalComponent>
</template>
<script>
import LoadingIndicator from '@/components/partials-dashboard/LoadingComponent.vue'
import ModalComponent from '@/components/form/modalcomponent.vue'
export default{
    data(){
        return{
            data_admin: [],
            form: {
                id: '',
                name: '',
                email: '',
                password: '',
                role_id: ''
            },
            isLoading: false
        }
    },
    created(){
        this.getAdmin()
    },
    methods: {
        getAdmin(){
            let type = "getData"
            let url = [
                "user/admin", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.isLoading = false
                this.data_admin = result.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        postAdmin(){
            let type = "postData"
            let url = [
                "user/admin", {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    role_id: 2
                }, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.handleSuccess('berhasil tambah admin')
                this.getAdmin()
            }).catch((err)=>{
                console.log(err);
            })
        },
        detailAdmin(id){
            let type = "showData"
            let url = [
                `user/admin`, id + '/detail', {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.form = result.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        deleteAdmin(id){
            let type = "deleteData"
            let url = [
                `user/admin`, id + '/delete'
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.handleSuccess('berhasil hapus admin')
                this.getAdmin()
            }).catch((err)=>{
                console.log(err);
            })
        },
        postEdit(){
            let type = "putData"
            let url = [
            `user/admin/${this.form.id}/update`, {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                role_id: this.form.role_id
            }
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
        handleSuccess(message){
            this.$swal({
                icon: 'success',
                title: message
            })
        }
    },
    components: {
        ModalComponent, LoadingIndicator
    }
}
</script>