<template lang="pug">
    li
        p(v-if="editMode === false")
            span {{skill.title}}
            span {{skill.percent}}
            button.skills__btn.btn-change(type="button" @click="editMode = true") Изменить
            button.skills__btn.btn-remove(type="button" @click="deleteSkill") Удалить
        p(v-else)
            input(type="text" v-model="editedSkill.title")
            input(type="text" v-model="editedSkill.percent")
            button.skills__btn.btn-save(type="button" @click="changeSkill") Сохранить
            button.skills__btn.btn-cancel(type="button" @click="editMode = false") Отменить
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "skills-item",
        props: {
          skill: Object
        },
        methods: {
            ...mapActions('skills', ['removeSkill', 'saveSkill']),
            async deleteSkill() {
                try {
                    await this.removeSkill(this.skill.id);
                } catch(error) {
                    console.log(error);
                }
            },
            async changeSkill() {
                try {
                    await this.saveSkill(this.editedSkill);
                    this.editMode = false;
                } catch(error) {
                    console.log(error);
                }
            }
        },
        created() {
        },
        data() {
            return {
                editMode: false,
                editedSkill: {...this.skill}
            }
        }
    }
</script>

<style scoped>

</style>