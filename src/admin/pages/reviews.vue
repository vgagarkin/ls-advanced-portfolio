<template lang="pug">
    .wrapper.ov
        .admin-page__content
            .admin-page__title-container
                h1.admin-page__title Блок "Отзывы"
            .admin-page__content-inner
                .admin-reviews__add-container(v-if="addNewReviewOn === true")
                    form.new-review__form
                        .new-review__form-header Новый отзыв
                        .new-review__form-fields
                            label.new-review__form-label
                                input.new-review__form-input(type="file" @change="uploadFile")
                            label.new-review__form-label
                                | Имя автора
                                input.new-review__form-input(type="text" v-model="newReview.author")
                            label.new-review__form-label
                                | Титул автора
                                input.new-review__form-input(type="text" v-model="newReview.occ")
                            label.new-review__form-label
                                | Отзыв
                                textarea.new-review__form-input(v-model="newReview.text")
                        .new-review__form-btns
                            button.admin__btn.btn-cancel-review(@click="addNewReviewOn = false") Отменить
                            button.admin__btn.btn-save-review(@click="addNewReview") Сохранить
                .admin-reviews__wrapper
                    button.admin__btn.btn-add-review(
                            type="button"
                            @click="addNewReviewOn = true"
                            v-if="addNewReviewOn === false"
                        ) Добавить отзыв
                    review(
                        v-for="review in reviews"
                        :review="review"
                        :key="review.id"
                    )
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "reviews",
        components: {
            review: () => import("../components/review")
        },
        computed: {
            ...mapState('reviews', {
                reviews: state => state.reviews
            })
        },
        methods: {
            ...mapActions('reviews', ['addReview', 'fetchReviews']),
            uploadFile(event) {
                const file = event.target.files[0];
                this.newReview.photo = file;
                this.getPhoto(file);
            },
            getPhoto(file) {
                const reader = new FileReader();
                try {
                    reader.readAsDataURL(file);
                } catch (e) {
                    //тут вывести ошибки
                }
            },
            async addNewReview() {
                try {
                    await this.addReview(this.newReview);
                    this.newReview = {};
                } catch(error) {
                    console.log(error.message);
                } finally {
                    this.addNewReviewOn = false;
                }
            }
        },async created() {
            try {
                await this.fetchReviews();
            } catch {
                console.log(error.message);
            }
        },
        data() {
            return {
                addNewReviewOn: false,
                newReview: {
                    photo: {},
                    author: "",
                    occ: "",
                    text: ""
                }
            }
        }
    }
</script>

<style lang="postcss">

    .admin-reviews {
        &__wrapper {
            display: grid;
            grid-gap: 32px;
            grid-template-columns: repeat(3, 1fr);
        }

        &__item {
            background: $white;
            box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
        }

        &__author-ava {
            width: 70px;
        }
    }

</style>