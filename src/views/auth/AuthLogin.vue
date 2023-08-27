<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12 col-md-6 mx-auto">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" class="form-control mb-3" placeholder="email" v-model="form.email" />
                            <input type="password" class="form-control mb-3" placeholder="password"
                                v-model="form.password" />
                            <button class="btn btn-sm btn-primary" @click="submit">login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                email: 'super_admin@gmail.com',
                password: 'password'
            }
        }
    },
    methods: {
        submit() {
            axios.post('http://integrasiautama.my.id/api/login', {
                email: this.form.email,
                password: this.form.password
            }).then((response) => {
                if (response.data.pesan != "Berhasil Login") {
                    this.$swal({
                        icon: 'error',
                        title: response.pesan,
                        text: 'cek email dan passwordnya'
                    })
                } else {
                    Cookies.set('token', response.data.data.token);
                    window.location = '/dashboard'
                }

            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>