<template lang="pug">
    .wrapper.ov
        .admin-page__content
            .admin-page__title-container
                h1.admin-page__title Блок "Обо мне"
                button.admin-page__add-skills-group() Добавить группу
            .admin-page__content-inner
                .admin-skills__wrapper
                    .admin-skills__group-container(v-for="category in categories")
                        skillsGroup(
                            :category="category"
                            :skills="filterSkills(category.id)"
                        )
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "about",
        components: {
            skillsGroup: () => import("../components/skills-group")
        },
        computed: {
            ...mapState('categories', {
                categories: state => state.categories
            }),
            ...mapState('skills', {
                skills: state => state.skills
            })
        },
        methods: {
            ...mapActions('skills', ['fetchSkills']),
            ...mapActions('categories', ['fetchCategories']),
            filterSkills(categoryId) {
                return this.skills.filter(skill => skill.category === categoryId)
            }
        },
        async created() {
            try {
                await this.fetchCategories();
            } catch {
                console.log(error.message);
            }

            try {
                const skills = this.fetchSkills();
            } catch(error) {
                console.log(error.message);
            }
        }
    }
</script>

<style scoped>
    .admin {
        &-skills {
            &__wrapper {
                display: grid;
                grid-gap: 32px;
                grid-template-columns: repeat(2, 1fr);
            }

            &__group-container {
                background: $white;
                box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
                padding: 30px;
            }
        }
    }
</style>