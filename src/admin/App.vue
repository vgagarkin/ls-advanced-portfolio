<template lang="pug" id="app">
    .app
        app-header
        app-menu
        router-view
</template>


<script>
    export default {
        name: "app",
        components: {
            appHeader: () => import('./components/app-header'),
            appMenu: () => import('./components/app-menu')
        }
    }
</script>

<style lang="postcss">
    @import "normalize.css";
    @import url('../styles/mixins.pcss');
    @import url("../styles/layout/base.pcss");

    .wrapper {
        max-width: $bp-desktop;
    }

    .app {
        background-color: $admin-page-bg;
        min-height: 100vh;
    }
</style>