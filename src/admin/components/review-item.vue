<template lang="pug">
    .admin-reviews__item
        .admin-reviews__author
            img.admin-reviews__author-ava(:src="avaUrl")
            .admin-reviews__author-info
                h4 {{review.author}}
                p {{review.occ}}
        .admin-reviews__body {{review.text}}
        .admin-reviews__btns
            button.admin__btn.edit.blue(type="button" @click.prevent="changeCurrentReview") Изменить
            button.admin__btn.decline(type="button" @click.prevent="deleteReview") Удалить
</template>

<script>
    import { getImagePath } from "@/helpers/images";
    import { mapActions, mapMutations } from "vuex";

    export default {
        name: "review",
        props: {
            review: Object,
            mode: String
        },
        methods: {
            ...mapActions("reviews", ['removeReview']),
            ...mapActions("tooltips", ["showTooltip"]),
            ...mapMutations("reviews", ["CURRENT_REVIEW"]),

            async changeCurrentReview() {
                try {
                    this.CURRENT_REVIEW(this.review);
                    this.$emit("changemode", "edit");
                } catch (error) {
                    this.showTooltip({
                        type: "error",
                        text: error.message
                    });
                }
            },
            async deleteReview() {
                try {
                    const response = await this.removeReview(this.review.id);
                    this.showTooltip({
                        type: "overload",
                        text: "Отзыв успешно удален"
                    });
                } catch (error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                }
            }
        },
        created() {
            this.avaUrl = getImagePath(this.review.photo);
        },
        data() {
            return {
                avaUrl: "",
                editReviewOn: false
            }
        }
    }
</script>

<style scoped lang="postcss">

</style>