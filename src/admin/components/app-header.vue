<template lang="pug">
    header.header
        .header__wrapper.wrapper
            .header__ava
                img.header__ava-photo(src="../../images/content/user.jpg")
            .header__name Владимир Гагаркин
            .header__description Панель администрирования
            .header__logout
                a.header__logout-link(@click="logout") Выйти
</template>

<script >
    import $axios from "../requests";

    export default {
        methods: {
            async logout() {
                try {
                    await $axios.post("/logout", this.userData);
                    localStorage.removeItem('token');
                    this.$router.replace("/login");
                } catch(error) {
                    console.log(error.message);
                }
            },
        }
    }
</script>

<style lang="postcss" scoped src="../styles/app-header.pcss"></style>