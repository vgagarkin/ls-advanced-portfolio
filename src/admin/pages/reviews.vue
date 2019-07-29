<template lang="pug">
    .wrapper.ov
        .admin-page__content
            .admin-page__title-container
                h1.admin-page__title Блок "Отзывы"
            .admin-page__content-inner
                .admin-reviews__wrapper
                    .admin-reviews__add-container(v-if="addNewReviewOn === true")
                        form.new-review__form
                            .new-review__form-header Новый отзыв
                            .new-review__form-fields
                                label.new-review__form-label
                                    input.new-review__form-input(type="file" @change="uploadFile")
                                label.new-review__form-label
                                    input.new-review__form-input(type="text" v-model="newReview.author")
                                label.new-review__form-label
                                    input.new-review__form-input(type="text" v-model="newReview.occ")
                                label.new-review__form-label
                                    textarea.new-review__form-input(v-model="newReview.text")
                            .new-review__form-btns
                                button.admin__btn.btn-cancel-review(@click="addNewReviewOn = false") Отменить
                                button.admin__btn.btn-save-review(@click="addNewReview") Сохранить
                    button.admin__btn.btn-add-review(type="button" @click="addNewReviewOn = true") Добавить отзыв
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "reviews",
        components: {
            skillsGroup: () => import("../components/skills-group") //сюда нужно компонент с отзывами прикуярить после реализации добавления отзыва, ибо пока отзывов болт
        },
        methods: {
            ...mapActions('reviews', ['addReview']),
            uploadFile(event) {
                const file = event.target.files[0].name;
                this.newReview.photo = file;
                /*this.getBase64(file).then(binary => {
                    this.newReview.photo = binary;
                    console.log(this.newReview);
                });*/
            },
            getBase64(file) {
                return new Promise(resolve => {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        resolve(reader.result);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                });
            },
            async addNewReview() {
                try {
                    await this.addReview(this.newReview);
                } catch(error) {
                    console.log(error.message);
                } finally {
                    //this.addNewReviewOn = false;
                }
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

<style scoped>

</style>