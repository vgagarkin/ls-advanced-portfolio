<template lang="pug">
    p
        span {{skill.title}}
        span {{skill.percent}}
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "skills-item",
        props: {
          skill: Object
        },
        methods: {
            //...mapActions('skills', ['fetchSkills']),
        },
        created() {
            //this.fetchSkills();
        }
    }
</script>

<style scoped>

</style>