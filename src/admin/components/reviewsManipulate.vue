<template lang="pug">
    .admin-reviews__add-container
        form.new-review__form
            .new-review__form-header {{(mode === 'edit') ? 'Редактировать отзыв' : 'Новый отзыв'}}
            .new-review__form-fields
                label.new-review__form-label.feedback__block--image
                    input.new-review__form-input(type="file" @change="uploadFile")
                .new-review__author
                    label.feedback__block.feedback__block--author(
                        :class="{error: !authorValidated}"
                        :data-error="authorValidateErrorText"
                    )
                        .feedback__label-text.text Имя автора
                        input.feedback__field(
                            type="text"
                            v-model="review.author"
                            placeholder="Имя автора"
                            @input="authorValidate"
                        )
                    label.feedback__block.feedback__block--occ(
                        :class="{error: !occValidated}"
                        :data-error="occValidateErrorText"
                    )
                        .feedback__label-text.text Титул автора
                        input.feedback__field(
                            type="text"
                            v-model="review.occ"
                            placeholder="Титул автора"
                            @input="occValidate"
                        )
                label.feedback__block.feedback__block--review(
                    :class="{error: !reviewValidated}"
                    :data-error="reviewValidateErrorText"
                )
                    .feedback__label-text.text Отзыв
                    textarea.feedback__field(
                        type="text"
                        v-model="review.text"
                        placeholder="Отзыв"
                        @input="occValidate"
                    )
            .new-review__form-btns
                button.admin__btn.btn-cancel-review(@click.prevent="$emit('closeAddForm')") Отменить
                button.admin__btn.btn-save-review(
                    type="submit"
                    @click.prevent="mode === 'new' ? addNewReview() : editExistedReview()"
                ) {{(mode === 'edit') ? 'Сохранить' : 'Добавить'}}
</template>

<script>
    import { getImagePath } from "@/helpers/images";
    import { mapActions, mapState } from "vuex";
    import store from "@/store";

    export default {
        props: {
            mode: String
        },
        computed: {
            ...mapState("reviews", {
                currentReview: state => state.currentReview
            })
        },
        name: "reviewsManipulate",
        watch: {
            currentReview() {
                if (this.mode === "edit") this.getCurrentReview();
            },
            mode() {
                if (this.mode === "edit") {
                    this.getCurrentReview();
                } else {
                    this.review = {
                        photo: null,
                        author: "",
                        occ: "",
                        text: ""
                    };
                    this.photoUrl = "";
                }
            }
        },
        methods: {
            ...mapActions('reviews', ['addReview', 'editReview']),
            ...mapActions("tooltips", ["showTooltip"]),

            uploadFile(event) {
                const file = event.target.files[0];
                this.review.photo = file;
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
                    await this.addReview(this.review);
                    this.review = {};
                    this.showTooltip({
                        type: "success",
                        text: "Отзыв успешно добавлен"
                    });
                    this.$emit("changemode", "");
                } catch(error) {
                    this.showTooltip({
                        type: "error",
                        text: error
                    });
                } finally {
                    this.addNewReviewOn = false;
                }
            },
            async getCurrentReview() {
                this.review = { ...this.currentReview };
                this.photoUrl = getImagePath(this.review.photo);
                this.review.photo = "";
            },
            async editExistedReview() {
                //let authorValid = this.validateAuthor();
                //let occValid = this.validateOcc();
                //let textValid = this.validateText();
                //if (authorValid && occValid && textValid) {
                    try {
                        const response = await this.editReview(this.review);
                        this.review = {
                            photo: null,
                            author: "",
                            occ: "",
                            text: ""
                        };
                        this.$emit("closeAddForm");
                        this.showTooltip({
                            type: "success",
                            text: "Отзыв успешно обновлен"
                        });
                    } catch (error) {
                        this.showTooltip({
                            type: "error",
                            text: error.message
                        });
                    }
                //}
            },
            authorValidate() {

            },
            occValidate() {}
        },
        created() {
            if (this.mode === "edit") this.getCurrentReview();
        },
        data() {
            return {
                review: {
                    photo: {},
                    author: "",
                    occ: "",
                    text: ""
                },
                authorValidated: true,
                authorValidateErrorText: "",
                occValidated: true,
                occValidateErrorText: "",
                reviewValidated: true,
                reviewValidateErrorText: "",
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/mixins.pcss";
    @import "../../styles/blocks/feedback.pcss";

    .new-review {

        &__form {
            display: grid;
            row-gap: 50px;

            &-header {
                border-bottom:1px solid $admin-skills-border-color;
                font-size: $font-size-name;
                font-weight: bold;
                padding-bottom: 26px;
            }

            &-fields {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 200px repeat(2, 1fr);
                column-gap: 30px;

                .feedback__block {
                    display: grid;
                    grid-template-rows: repeat(2, auto);
                    grid-template-columns: 1fr;
                    column-gap: 0;

                    &--image {
                        grid-area: 1 / 1 / 3 / 2;
                        width: 200px;
                        height: 200px;
                        cursor: pointer;
                        background: $upload-image-bg;
                        border-radius: 50%;

                        input {
                            display: none;
                        }

                    }

                    &--review {
                        grid-template-columns: 0 1fr;
                    }
                }
            }

            &-btns {
                display: grid;
                grid-auto-flow: column;

                button {
                    height: 100%;

                    &:hover {
                        color: $admin-active-color;
                    }
                }
            }
        }

        &__author {
            display: grid;
            column-gap: 30px;
            grid-auto-flow: column;
        }
    }
</style>