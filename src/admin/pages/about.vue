<template lang="pug">
    .wrapper.ov
        .admin-page__content
            .admin-page__title-container
                h1.admin-page__title Блок "Обо мне"
                button.admin__btn.add.small(type="button" @click="addNewCategoryOn = true" data-text="Добавить группу")
            .admin-page__content-inner
                .admin-skills__wrapper
                    .admin-skills__group-container(v-if="addNewCategoryOn === true")
                        .admin-skills__group-inner.new-group
                            .admin-skills__group-title
                                label.admin__label(
                                    :class="{error: !validatedCategoryTitle}"
                                    :data-error="validateCategoryTitleError"
                                )
                                    input.admin-skills__input(
                                        type="text"
                                        v-model="newCategoryTitle.title"
                                        placeholder="Название новой группы"
                                        @input="validateCategoryTitle"
                                    )
                                button.admin__btn.save(@click="sendNewCategory")
                                button.admin__btn.decline(@click="addNewCategoryOn = false")
                            ul.admin-skills__list
                    .admin-skills__group-container(v-for="category in categories")
                        skillsGroup(
                            :category="category"
                            :skills="filterSkills(category.id)"
                        )
</template>

<script>
    import { mapActions, mapState } from "vuex";
    import store from "@/store";

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
            ...mapActions("skills", ["fetchSkills"]),
            ...mapActions("categories", ["fetchCategories", "addNewCategory", "saveCategory"]),
            ...mapActions("tooltips", ["showTooltip"]),
            filterSkills(categoryId) {
                return this.skills.filter(skill => skill.category === categoryId)
            },
            async sendNewCategory() {
                this.validateCategoryTitle();
                if(this.validatedCategoryTitle) {
                    try {
                        await this.addNewCategory(this.newCategoryTitle);
                    } catch (error) {
                        console.log(error.message);
                    } finally {
                        this.addNewCategoryOn = false;
                    }
                }
            },
            validateCategoryTitle() {
                if (this.newCategoryTitle.title.length < 5) {
                    this.validatedCategoryTitle = false;
                    this.validateCategoryTitleError = "Введите название новой группы";
                } else {
                    this.validatedCategoryTitle = true;
                    this.validateCategoryTitleError = "";
                }
                return this.validatedCategoryTitle;
            },
        },
        async created() {
            try {
                await this.fetchCategories(store.getters["user/userId"]);
            } catch {
                this.showTooltip({
                    type: "error",
                    text: error
                });
            }

            try {
                this.fetchSkills(store.getters["user/userId"]);
            } catch(error) {
                this.showTooltip({
                    type: "error",
                    text: error
                });
            }
        },
        data() {
            return {
                addNewCategoryOn: false,
                newCategoryTitle: {
                    title: ""
                },
                validatedCategoryTitle: true,
                validateCategoryTitleError: ""
            }
        }
    }
</script>

<style>
    .admin {
        &-skills {
            &__wrapper {
                display: grid;
                grid-gap: 32px;
                grid-template-columns: repeat(2, 1fr);
            }

            &__group-container {
                background: $white;
                box-shadow: $admin-page-shadow;
                padding: 30px;
            }

            &__group-title {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 1fr auto;
                align-items: center;
                border-bottom:1px solid $admin-skills-border-color;
                padding: 0 0 14px;
                column-gap: 20px;

                h3 {
                    line-height: 2;
                    font-size: 18px;
                }
            }

            &__list {
                margin: 30px 0 0;
                row-gap: 30px;
                display: grid;
            }

            &__item {
                display: grid;
                grid-template-columns: 1fr .2fr min-content min-content;
                column-gap: 22px;
                align-items: center;

                &.new-skill {
                    margin-top: 36px;
                    max-width: 80%;
                    justify-self: right;
                }

                .percent-value {
                    position: relative;

                    &:after {
                        content: "%";
                        color: rgba(65, 76, 99, 0.7);
                        position: absolute;
                        right: 0;
                    }
                    input {
                        max-width: 66px;
                    }
                }
            }

            &__input {
                border: none;
                border-bottom: 1px solid;
                padding-bottom: 14px;
                color:$text-color;
                min-width: 0;

                &.titled {
                    font-size: 18px;
                    max-width: 270px;
                }

                &:hover,
                &:focus {
                    border-color: $admin-active-color;
                }
            }
        }
    }
</style>