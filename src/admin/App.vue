<template lang="pug" id="app">
    .app
        app-header
        app-menu
        router-view
        alert(:class="{'visible' : visible}")
</template>


<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "app",
        components: {
            appHeader: () => import('./components/app-header'),
            appMenu: () => import('./components/app-menu'),
            alert:() => import('./components/tooltips')
        },
        computed:{
            ...mapState('tooltips', { visible: state => state.visible })
        },
        methods:{
            ...mapActions('tooltips', ['closeTooltip'])
        },
        watch:{
            visible(value){
                if (value === true){
                    let timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        this.closeTooltip();
                    }, 3000);
                }
            }
        }
    }
</script>

<style lang="postcss">
    @import "normalize.css";
    @import url('../styles/mixins.pcss');
    @import url("../styles/layout/base.pcss");

    .wrapper {
        max-width: calc($bp-desktop - 120px);
        
        &.ov {
            overflow: visible;
        }
    }

    .app {
        background-color: $admin-page-bg;
        min-height: 100vh;
        padding-bottom: 30px;
    }

    .admin {
        &__btn {

            display: block;
            width: 14px;
            height: 12px;

            &.edit {
                background: svg-load("pencil.svg",fill=rgba(#414c63, 1),width=14px,height=12px) center no-repeat;
            }

            &.save {
                background: svg-load("tick.svg",fill=rgba(#00d70a, 1),width=14px,height=12px) center no-repeat;
            }

            &.decline {
                background: svg-load("remove.svg",fill=rgba(#bf2929, 1),width=14px,height=12px) center no-repeat;
            }

            &.remove {
                background: svg-load("trash.svg",fill=rgba(#414c63, 1),width=14px,height=12px) center no-repeat;
            }

            &.add {
                display: grid;
                grid-auto-flow: column;
                column-gap: 20px;
                align-items: center;
                height: 100%;
                opacity: .7;
                transition: $transition;


                &::before {
                    content: '+';
                    background: $admin-page-btn-gradient;
                    border-radius: 50%;
                    color: $white;
                    font-size: 30px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                    font-weight: 600;
                }

                &:after {
                    content: attr(data-text);
                    width: max-content;
                    color: $admin-active-color;
                    font-weight: 600;
                }

                &.small {
                    &::before {
                        width: 21px;
                        height: 21px;
                        font-size: 14px;
                    }
                }

                &:hover {
                    opacity: 1;
                }
            }

            &.disabled {
                opacity: .5;
                cursor: no-drop;
            }
        }

        &-page {
            &__title-container {
                margin: 60px 0;
                display: grid;
                grid-template-columns: repeat(2, max-content);
                column-gap: 60px;
            }

            &__title {
                font-size: $font-size-admin-title;
                font-weight: bold;
                line-height: 1.62;
                color: $text-color;
            }
        }

        &__label {
            position: relative;

            &.error {
                input {
                    border-color: firebrick;
                }

                &:before {
                    position: absolute;
                    bottom:100%;
                    width: 150px;
                    background: firebrick;
                    color: $white;
                    padding: 5px 10px;
                    font-size: .7rem;
                    content: attr(data-error);
                }
            }
        }
    }
</style>