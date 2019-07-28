<template lang="pug">
    header.header
        .header__wrapper.wrapper
            .header__ava
                img.header__ava-photo(src="../../images/content/user.jpg")
            .header__name Владимир Гагаркин
            .header__description Панель администрирования
            .header__logout
                a.header__logout-link(href="#") Выйти
</template>

<script >
    export default {

    }
</script>

<style lang="postcss" scoped src="../styles/app-header.pcss"></style>