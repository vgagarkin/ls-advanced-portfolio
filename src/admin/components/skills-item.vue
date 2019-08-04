<template lang="pug">
    .admin-skills__item(v-if="editMode === false")
        span {{skill.title}}
        .percent-value
            span {{skill.percent}}
        button.admin__btn.edit(type="button" @click="editMode = true")
        button.admin__btn.remove(type="button" @click="$emit('deleteSkill', skill.id)")
    .admin-skills__item(v-else)
        input.admin-skills__input(type="text" v-model="editedSkill.title")
        .percent-value
            input.admin-skills__input(type="text" v-model="editedSkill.percent")
        button.admin__btn.save(type="button" @click="changeSkill")
        button.admin__btn.decline(type="button" @click="editMode = false")
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "skills-item",
        props: {
          skill: Object
        },
        methods: {
            ...mapActions('skills', ['saveSkill']),
            ...mapActions("tooltips", ["showTooltip"]),
            async changeSkill() {
                try {
                    const response = await this.saveSkill(this.editedSkill);
                    this.editMode = false;
                    this.showTooltip({
                        type: "success",
                        text: "Запись обновлена"
                    });
                } catch(error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
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