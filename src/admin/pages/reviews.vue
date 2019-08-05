<template lang="pug">
    .wrapper.ov
        .admin-page__content
            .admin-page__title-container
                h1.admin-page__title Блок "Отзывы"
            .admin-page__content-inner
                reviewsManipulate(
                    v-if="mode !== ''"
                    :mode="mode"
                    @closeAddForm="closeAddForm"
                    @changemode="changemode"
                )
                .admin-reviews__wrapper
                    button.admin__btn.btn-add-review(
                            type="button"
                            :class="{disabled: mode !== ''}"
                            @click="addReview"
                        ) Добавить отзыв
                    review(
                        v-for="review in reviews"
                        :review="review"
                        :key="review.id"
                        @changemode="changemode"
                    )
</template>

<script>
    import { mapActions, mapState } from "vuex";
    import store from "@/store";

    export default {
        name: "reviews",
        components: {
            review: () => import("../components/review-item"),
            reviewsManipulate: () => import("../components/reviewsManipulate")
        },
        computed: {
            ...mapState('reviews', {
                reviews: state => state.reviews
            })
        },
        methods: {
            ...mapActions('reviews', ['fetchReviews']),
            ...mapActions("tooltips", ["showTooltip"]),

            addReview(){
                this.mode = 'new';
            },
            closeAddForm(){
                this.mode = '';
            },
            changemode(mode) {
                this.mode = mode;
            }
        },
        async created() {
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
                },
                mode: ""
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
            padding: 30px 20px;
            display: grid;
            grid-template-rows: max-content 1fr max-content;
            row-gap: 30px;
        }

        &__author {
            border-bottom:1px solid $admin-skills-border-color;
            display: grid;
            grid-template-columns: 70px auto;
            min-height: 70px;
            padding-bottom: 30px;
            column-gap: 20px;

            &-ava {
                width: 70px;
                min-height: 70px;
                border-radius: 50%;
                object-fit: cover;
                object-position: center center;
                -webkit-background-size: cover;
                background-size: cover;
            }

            &-info {
                align-self: center;

                h4 {
                    font-size: $font-size-name;
                    font-weight: bold;
                    color: $text-color;
                }

                p {
                    opacity: .5;
                    font-weight: 600;
                }
            }
        }

        &__btns {
            margin-top: 56px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            .admin__btn.blue,
            .admin__btn.decline {
                width: auto;
                height: 100%;
                justify-self: left;
                background-position-x: right;
                background-position-y: center;
                padding-right: 18px;
            }

            .admin__btn.decline.decline {
                justify-self: right;
            }
        }
    }

    .admin {
        &__btn {
            &.btn-add-review {
                background-image: $admin-page-btn-gradient;
                width: 100%;
                height: 100%;
                color: $white;
                opacity: .7;
                transition: $transition;
                display: grid;
                justify-content: center;
                justify-items: center;
                font-weight: bold;
                font-size: $font-size-name;
                grid-gap: 30px;
                padding-right: 100px;
                padding-left: 100px;

                &:before {
                    content: "+";
                    border:2px solid $white;
                    border-radius: 50%;
                    width: 150px;
                    height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 72px;
                    font-weight: 300;
                    margin: 0 auto 30px;
                }

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

</style>