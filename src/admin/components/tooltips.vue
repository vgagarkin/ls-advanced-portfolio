<template lang="pug">
    .alert-tooltip__container
        .alert-tooltip__inner(:class='type')
            .alert-tooltip__text {{text}}
</template>

<script>
    import { mapActions, mapState} from 'vuex';
    export default {
        computed:{
            ...mapState('tooltips',{
                text : state => state.text,
                type: state => state.type
            })
        },
        methods:{
            ...mapActions('tooltips', ['closeTooltip'])
        }
    }
</script>

<style lang="postcss" scoped>
    .alert-tooltip {
        &__container {
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            display:flex;
            justify-content: center;
            transform:translateY(100%);
            transition: all 0.2s ease-in-out;

            &.visible{
                transform:translateY(0);
            }
        }

        &__inner {
            width: 400px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            &.success {
                background-color: #4bb133;
            }
            &.overload {
                background-color: #2d3c4e;
            }
            &.error {
                background-color: #b13333;
            }
        }
    }
</style>
