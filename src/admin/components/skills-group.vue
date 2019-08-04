<template lang="pug">
    .admin-skills__group-inner
        .admin-skills__group-title(v-if="editCategoryMod === false")
            h3 {{category.category}}
            button.admin__btn.edit(type="button" @click="editCategoryMod = true")
            button.admin__btn.remove(type="button" @click="removeCategory")
        .admin-skills__group-title(v-else)
            label.admin__label(
                :class="{error: !validatedCategoryTitle}"
                :data-error="validateCategoryTitleError"
            )
                input.admin-skills__input.titled(
                        type="text"
                        v-model="editCategory.title"
                        required="required"
                        @input="validateCategoryTitle"
                    )
            button.admin__btn.save(@click="changeCategoryTitle")
            button.admin__btn.decline(type="button" @click="editCategoryMod = false")
        ul.admin-skills__list
            skillsItem(
                v-for="skill in skills"
                :skill="skill"
                :key="skill.id"
                @deleteSkill="deleteSkill"
            )
            .admin-skills__item.new-skill(:class="{disabled: formIsBlocked}")
                label.admin__label(
                    :class="{error: !validatedSkillName}"
                    :data-error="validateSkillNameError"
                )
                    input.admin-skills__input(
                            type="text"
                            placeholder="Новый навык"
                            v-model="skill.title"
                            :disabled="formIsBlocked"
                            @input="validateSkillName"
                        )
                label.admin__label.percent-value(
                    :class="{error: !validatedSkillPercent}"
                    :data-error="validateSkillPercentError"
                )
                    input.admin-skills__input(
                            type="text"
                            placeholder="100"
                            v-model="skill.percent"
                            :disabled="formIsBlocked"
                            required="required"
                            @input="validateSkillPercent"
                        )
                button.admin__btn.add(
                        type="button"
                        @click="!formIsBlocked ? addNewSkill(category.id) : ''"
                        :class="{disabled: formIsBlocked}"
                    )
</template>

<script>
    import { mapActions } from "vuex";

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
            ...mapActions('categories', ['saveCategory', 'deleteCategory']),
            ...mapActions("tooltips", ["showTooltip"]),
            async addNewSkill() {
                this.validateSkillName();
                this.validateSkillPercent();
                if(this.validatedSkillPercent && this.validatedSkillName) {
                    this.formIsBlocked = true;
                    try {
                        await this.addSkill(this.skill);
                        this.skill.title = '';
                        this.skill.percent = '';
                        this.showTooltip({
                            type: "success",
                            text: "Скилл успешно добавлен"
                        });
                    } catch (error) {
                        this.showTooltip({
                            type: "error",
                            text: error
                        });
                    } finally {
                        this.formIsBlocked = false;
                    }
                }
            },
            async changeCategoryTitle() {
                this.validateCategoryTitle();
                if(this.validatedCategoryTitle) {
                    try {
                        await this.saveCategory(this.editCategory);
                        this.showTooltip({
                            type: "success",
                            text: "Название категории успешно изменено"
                        });
                        this.category.category = this.editCategory.title;
                    } catch (error) {
                        this.showTooltip({
                            type: "error",
                            text: error
                        });
                    } finally {
                        this.editCategoryMod = false;
                    }
                }
            },
            async removeCategory() {
                try {
                    await this.deleteCategory(this.category.id);
                    this.showTooltip({
                        type: "overload",
                        text: "Категория успешно удалена"
                    });
                } catch(error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                } finally {
                    this.editCategoryMod = false;
                }
            },
            async deleteSkill(skillId) {
                try {
                    await this.removeSkill(skillId);
                    this.showTooltip({
                        type: "overload",
                        text: "Запись удалена"
                    });
                } catch(error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                }
            },
            validateSkillName() {
                if (this.skill.title.length < 3) {
                    this.validatedSkillName = false;
                    this.validateSkillNameError = "Введите название навыка";
                } else {
                    this.validatedSkillName = true;
                    this.validateSkillNameError = "";
                }
                return this.validatedSkillName;
            },
            validateSkillPercent() {
                if (this.skill.percent.length < 1) {
                    this.validatedSkillPercent = false;
                    this.validateSkillPercentError = "Введите уровень владения навыком";
                } else if (this.skill.percent > 100) {
                    this.validatedSkillPercent = false;
                    this.validateSkillPercentError = "Уровень владения не может превышать 100";
                }  else if (isNaN(this.skill.percent)) {
                    this.validatedSkillPercent = false;
                    this.validateSkillPercentError = "Значение должно быть числом!";
                } else {
                    this.validatedSkillPercent = true;
                    this.validateSkillPercentError = "";
                }
                return this.validatedSkillPercent;
            },
            validateCategoryTitle() {
                if (this.editCategory.title.length < 5) {
                    this.validatedCategoryTitle = false;
                    this.validateCategoryTitleError = "Введите новое название категории";
                } else {
                    this.validatedCategoryTitle = true;
                    this.validateCategoryTitleError = "";
                }
                return this.validatedCategoryTitle;
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
                },
                validatedSkillName: true,
                validatedSkillPercent: true,
                validatedCategoryTitle: true,
                validateSkillNameError: "",
                validateSkillPercentError: "",
                validateCategoryTitleError: ""
            }
        }
    }
</script>

<style scoped lang="postcss">
</style>