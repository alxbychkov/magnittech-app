<script setup>
import EditIcon from './icons/EditIcon.vue';
import BasketIcon from './icons/BasketIcon.vue';
defineProps({
    comment: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["onEdit","onDelete"]);

const onEditClick = (comment) => {
    emit('onEdit', comment);
}

const onDeleteClick = (comment) => {
    emit('onDelete', comment);
}
</script>
<template>
    <div class="comment-item">
        <div class="comment-body">{{ comment.body }}</div>
        <div class="comment-bottom">
            <div class="comment-actions">
                <button class="btn-edit" @click="onEditClick(comment)">
                    <EditIcon />
                </button>
                <button class="btn-delete" @click="onDeleteClick(comment)">
                    <BasketIcon />
                </button>
            </div>
            <div class="comment-date">{{ comment.date }}</div>
        </div>
    </div>
</template>
<style scoped>
.comment-item {
    background: #FFFFFF;
    border: 1px solid #DFE3E7;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 20px;
}

.comment-body {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #10171E;
    margin-bottom: 16px;
}

.comment-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-actions {
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.comment-actions button {
    border: none;
    background: no-repeat;
    cursor: pointer;
}

.comment-actions button.btn-edit svg {
    max-height: 13px;
}

.comment-actions button.btn-delete svg {
    max-height: 16px;
}

.comment-date {
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    color: #82898F;
    align-items: flex-end;
}
</style>