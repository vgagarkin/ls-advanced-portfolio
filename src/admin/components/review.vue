<template lang="pug">
    .admin-reviews__item
        .admin-reviews__author
            img.admin-reviews__author-ava(:src="avaUrl")
            .admin-reviews__author-info
                h4 {{review.author}}
                p {{review.occ}}
        .admin-reviews__body {{review.text}}
        .admin-reviews__btns(v-if="editReviewOn === false")
            button.review__btn.btn-edit(type="button" @click.prevent="editReviewOn = true") Изменить
            button.review__btn.btn-remove(type="button" @click.prevent="deleteReview") Удалить
        .admin-reviews__btns(v-else)
            button.review__btn.btn-edit(type="button" @click.prevent="editReviewOn = false") Отменить
            button.review__btn.btn-remove(type="button" @click.prevent="changeReview") Сохранить
</template>

<script>
    import { getImagePath } from "@/helpers/images";
    import { mapActions } from "vuex";

    export default {
        name: "review",
        props: {
            review: Object
        },
        methods: {
          ...mapActions("reviews", ['removeReview']),
          async deleteReview() {
              try {
                  const response = await this.removeReview(this.review.id);
              } catch(e) {
                  //
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