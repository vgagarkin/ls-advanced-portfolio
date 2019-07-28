<template lang="pug">
    .admin-skills__group-inner
        .admin-skills__group-title(v-if="editCategoryMod === false")
            h3 {{category.category}}
            button.admin-skills__group-change(@click="editCategoryMod = true") Изменить
        .admin-skills__group-title(v-else)
            input(type="text" v-model="editCategory.title")
            button.admin-skills__group-change(@click="changeCategoryTitle") Сохранить
            button.admin-skills__group-change(@click="editCategoryMod = false") Отменить
        ul.admin-skills__list
            skillsItem(
                v-for="skill in skills"
                :skill="skill"
                :key="skill.id"
            )
        .skills__add-wrapper(:class="{disabled: formIsBlocked}")
            input(type="text" placeholder="Новый навык" v-model="skill.title")
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
            ...mapActions('categories', ['saveCategory']),
            async addNewSkill() {
                this.formIsBlocked = true;
                try {
                    await this.addSkill(this.skill);
                    this.skill.title = '';
                    this.skill.percent = '';
                } catch(error) {
                    console.log(error.message);
                } finally {
                    this.formIsBlocked = false;
                }
            },
            async changeCategoryTitle() {
                try {
                    await this.saveCategory(this.editCategory);
                } catch(error) {
                    console.log(error.message);
                } finally {
                    this.editCategoryMod = false;
                }
            },
        },
        data() {
            return {
                skill: {
                    title: "",
                    percent: "",
                    category: this.category.id
                },
                formIsBlocked: false,
                newCategory: false,
                editCategoryMod: false,
                editCategory: {
                    id: this.category.id,
                    title: this.category.category,
                    category: this.category.category
                }
            }
        }
    }
</script>

<style scoped lang="postcss">
    .disabled {
        & > * {
            display: none;
        }
    }
</style>