<template lang="pug">
    nav.admin-menu
        .admin-menu__wrapper.wrapper
            ul.admin-menu__items
                li.admin-menu__item(
                        v-for='menuItem in menuLinks'
                    )
                    router-link.admin-menu__link(
                            :to='menuItem.link'
                        ) {{menuItem.title}}

</template>

<script>
    export default {
        data() {
            return {
                menuLinks: [
                    {
                        title: 'Обо мне',
                        link: '/'
                    },
                    {
                        title: 'Работы',
                        link: '/projects'
                    },
                    {
                        title: 'Отзывы',
                        link: '/reviews'
                    }
                ]
            }
        }
    }
</script>

<style scoped src="../styles/app-menu.pcss">

</style>