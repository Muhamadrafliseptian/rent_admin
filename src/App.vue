<template>
    <template v-if="token">
        <div id="wrapper">
            <SidebarComponent />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopbarComponent />
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </div>
                <FooterComponent />
            </div>
        </div>
    </template>
    <template v-else>
        <router-view></router-view>
    </template>
</template>
<script>
import Cookies from 'js-cookie'
import FooterComponent from './components/partials/FooterComponent.vue';
import SidebarComponent from './components/partials/SidebarComponent.vue';
import TopbarComponent from './components/partials/TopbarComponent.vue';
export default {
    data() {
        return {
            token: Cookies.get("token"),
            publicPath: import.meta.env.BASE_URL
        }
    },
    components: {
        FooterComponent,
        SidebarComponent,
        TopbarComponent
    }
}
</script>