<template lang="pug">
    transition(name='modal')
        .modal-mask
            .modal-wrapper
                .modal-container
                    .modal-header
                        | Авторизация
                    form(@submit.prevent="getAuthToken").login__form
                        .modal-body
                            input(type="text" v-model="userData.name" placeholder="Логин")
                            input(type="password" v-model="userData.password" placeholder="Пароль")
                            button(type="submit") Отправить

</template>

<script>
    import $axios from "../requests";

    export default {
        name: "login",
        methods: {
            async getAuthToken() {
                try {
                    const {
                        data: { token }
                    } = await $axios.post("/login", this.userData);
                    localStorage.setItem('token', token);
                    $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
                    this.$router.replace("/");
                } catch(error) {
                    console.log(error.message);
                }
            }
        },
        data() {
            return {
                userData: {
                    name: "",
                    password: ""
                }
            }
        }
    }
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";
.modal {
    &-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        @include bg-img('../../images/content/bg-admin.jpg');
        -webkit-background-size: cover;
        background-size: cover;
        display: grid;
        align-content: center;
        justify-content: center;
    }

    &-wrapper {
        background: $white;
        padding: 60px 70px;
    }
}
</style>