<script setup>
import { onMounted, ref } from 'vue';
import { MODAL_TYPES } from '../../config/default';
import Button from '../Button.vue';
import CommentItem from '../CommentItem.vue';
import Modal from '../Modal.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const text = ref('');
const editedComment = ref(null);
const buttonCaption = ref('Добавить комментарий');
const isShowModal = ref(false);

const addCommentHandler = () => {
    const comment = {};

    if (!editedComment.value) {
        const date = new Date();

        comment.id = date.getTime();
        comment.body = text.value;
        comment.date = date.toLocaleString('ru-Ru');

        props.task.comments.push(JSON.stringify(comment));
    } else {
        const index = props.task.comments.indexOf(JSON.stringify(editedComment.value));
        const temp = props.task.comments.map(c => JSON.parse(c));

        if (index && temp[index].body) temp[index].body = text.value;
        props.task.comments = [...temp.map(c => JSON.stringify(c))];

        buttonCaption.value = 'Добавить комментарий';
    }

    text.value = '';
    editedComment.value = null;
}

const editCommentHandler = (comment) => {
    text.value = comment.body;
    editedComment.value = comment;
    buttonCaption.value = 'Обновить комментарий';
}

const deleteCommentHandler = (comment) => {
    editedComment.value = comment;
    isShowModal.value = true;
}

const closeModalHandler = () => {
  isShowModal.value = false;
  editedComment.value = null;
}

const agreeModalHandler = () => {
    props.task.comments = [...props.task.comments.filter(c => c !== JSON.stringify(editedComment.value))];
    isShowModal.value = false;
}
</script>
<template>
    <div class="comments">
        <div v-if="!task.comments.length" class="comments-area">
            <p class="no-data">Комментариев к заданию еще нет 😕</p>
        </div>
        <div v-else class="comments-area">
            <CommentItem v-for="comment in task.comments.map(c => JSON.parse(c))" :comment="comment" :key="comment.id"
                @onEdit="editCommentHandler" @onDelete="deleteCommentHandler" />
        </div>
        <div class="text-area">
            <p class="title">Комментарий к заданию:</p>
            <textarea class="textarea" cols="30" rows="20" v-model="text"></textarea>
            <Button :caption="buttonCaption" class="btn-blue" @click="addCommentHandler" :disabled="!text" />
        </div>
    </div>
    <Modal v-if="isShowModal" :title="MODAL_TYPES['delete'].title" :buttons="MODAL_TYPES['delete'].buttons"
        @close="closeModalHandler" @agree="agreeModalHandler">
        <p>{{ MODAL_TYPES['delete'].slot[0] }}</p><br>
    </Modal>
</template>
<style scoped>
.comments {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 30px;
}

.comments-area {
    background: #F2F6F9;
    border-radius: 6px;
    width: 70%;
    padding: 30px;
}


.text-area {
    width: 30%;
}

.title {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #10171E;
    margin-bottom: 4px;
}

.textarea {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #DFE3E7;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 5px 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
}

.text-area button {
    margin-left: auto;
}
</style>