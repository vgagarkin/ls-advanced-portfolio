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
                            :class="{disabled: addNewReviewOn === true}"
                            @click="addNewReviewOn === false ? addNewReviewOn = true : ''"
                        ) Добавить отзыв
                    review(
                        v-for="review in reviews"
                        :review="review"
                        :key="review.id"
                    )
</template>

<script>
    import { mapActions, mapState } from "vuex";
    import store from "@/store";

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
            ...mapActions("tooltips", ["showTooltip"]),
            uploadFile(event) {
                const file = event.target.files[0];
                this.newReview.photo = file;
                this.getPhoto(file);
            },
            getPhoto(file) {
                const reader = new FileReader();
                try {
                    reader.readAsDataURL(file);
                } catch (error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                }
            },
            async addNewReview() {
                try {
                    await this.addReview(this.newReview);
                    this.newReview = {};
                    this.showTooltip({
                        type: "success",
                        text: "Отзыв успешно добавлен"
                    });
                } catch(error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                } finally {
                    this.addNewReviewOn = false;
                }
            }
        },async created() {
            try {
                await this.fetchReviews(store.getters["user/userId"]);
            } catch(error) {
                this.showTooltip({
                    type: "error",
                    text: error
                });
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
    .new-review {
        &__form {
            background: $white;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: $admin-page-shadow;
        }
    }

    .admin-reviews {
        &__wrapper {
            display: grid;
            grid-gap: 32px;
            grid-template-columns: repeat(3, 1fr);
        }

        &__item {
            background: $white;
            box-shadow: $admin-page-shadow;
        }

        &__author-ava {
            width: 70px;
        }
    }

    .admin {
        &__btn {
            &.btn-add-review {
                background-image: $admin-page-btn-gradient;
            }
        }
    }

</style>