<template lang="pug">
    transition(name='modal')
        .modal-mask
            .modal-wrapper
                .modal-container
                    .modal-header
                        h2.title Авторизация
                    form(@submit.prevent="getAuthToken").login__form
                        .modal-body
                            label.feedback__block.feedback__block--name(
                                :class="{error: !nameValidated}"
                                :data-error="nameErrorText"
                            )
                                .feedback__label-text.text Логин
                                input.feedback__field(
                                    type="text"
                                    v-model="userData.name"
                                    placeholder="Логин"
                                    @input="nameValidate"
                                )
                                svg.feedback__label-icon(viewbox="0 0 482.9 482.9" preserveaspectratio="none")
                                    use(xlink:href="sprite.svg#user")
                            label.feedback__block.feedback__block--password(
                                :class="{error: !passValidated}"
                                :data-error="passErrorText"
                            )
                                .feedback__label-text.text Пароль
                                input.feedback__field(
                                    type="password"
                                    v-model="userData.password"
                                    placeholder="Пароль"
                                    @input="passValidate"
                                )
                                svg.feedback__label-icon(viewbox="0 0 482.9 482.9" preserveaspectratio="none")
                                    use(xlink:href="sprite.svg#user")
                            button.btn.btn--submit(type="submit") Войти

</template>

<script>
    import { mapActions } from "vuex";
    import $axios from "../requests";

    export default {
        name: "login",
        methods: {
            ...mapActions("tooltips", ["showTooltip"]),
            async getAuthToken() {
                this.passValidate();
                this.nameValidate();
                if(this.passValidated && this.nameValidated) {
                    try {
                        const {
                            data: {token}
                        } = await $axios.post("/login", this.userData);
                        localStorage.setItem('token', token);
                        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
                        this.$router.replace("/");
                    } catch (error) {
                        this.showTooltip({
                            type: "error",
                            text: error.response.data.error
                        });
                    }
                }
            },
            passValidate() {
                console.log(this.userData.password.length);
                if(this.userData.password.length < 3) {
                    this.passValidated = false;
                    this.passErrorText = "Пароль не может быть меньше 3 символов"
                } else {
                    this.passValidated = true;
                    this.passErrorText = "";
                }
                return this.passValidated;
            },
            nameValidate() {
                console.log(this.userData.name.length);
                if(this.userData.name.length < 3) {
                    this.nameValidated = false;
                    this.nameErrorText = "Имя  не может быть меньше 3 символов"
                } else {
                    this.nameValidated = true;
                    this.nameErrorText = "";
                }
                return this.nameValidated;
            }
        },
        data() {
            return {
                userData: {
                    name: "",
                    password: ""
                },
                nameValidated: true,
                nameErrorText: "",
                passValidated: true,
                passErrorText: ""
            }
        }
    }
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";
@import "../../styles/blocks/feedback.pcss";
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

    &-header {
        .title {
            text-align: center;
            font-weight: 600;
            margin-bottom: 34px;
        }
    }

    &-body {
        display: grid;
        justify-content: stretch;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, auto);
        row-gap: 40px;
    }
}

.error {
    position: relative;
    input {
        border-color: firebrick;
    }

    &:after {
        position: absolute;
        top:100%;
        width: 100%;
        background: firebrick;
        color: $white;
        padding: 5px 10px;
        font-size: .7rem;
        content: attr(data-error);
    }
}
</style>