<template lang="pug">
    .admin-skills__group-inner
        h3.admin-skills__group-title {{category.category}}
        ul.admin-skills__list
            li(v-for="skill in skills")
                skillsItem(
                    :skill="skill"
                )
        .skills__add-wrapper
            input(type="text" placeholder="Название" v-model="skill.title")
            input(type="text" placeholder="Проценты" v-model="skill.percent")
            button(type="button" @click="addNewSkill(category.id)") Добавить
</template>

<script>
    import { mapActions } from "vuex";
    import $axios from "../requests";

    export default {
        name: "skills-group",
        components: {
            skillsItem: () => import("./skills-item")
        },
        props: {
          category: Object,
          skills: Array
        },
        methods: {
            ...mapActions('skills', ['addSkill']),
            async addNewSkill() {
                try {
                    await this.addSkill(this.skill);
                } catch(error) {
                    console.log(error.message);
                }
            },
        },
        data() {
            return {
                skill: {
                    title: "",
                    percent: "",
                    category: this.category.id
                }
            }
        }
    }
</script>

<style scoped>

</style>