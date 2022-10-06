<script setup>
import { onBeforeUnmount, onMounted } from '@vue/runtime-core';
import Button from './Button.vue';
defineProps({
    title: {
        type: String,
        default: ''
    },
    buttons: {
        type: Array,
        default: ['Отмена', 'Удалить']
    }
});

const emit = defineEmits(["close", "agree"]);

const onClose = () => {
    emit('close');
}

const onAgree = () => {
    emit('agree');
}

const keydownHandler = (e) => {
    if (e.key === "Escape") onClose();
}

onMounted(() => {
    document.addEventListener("keydown", keydownHandler);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keydownHandler);
});

</script>
<template>
    <div class="modal-layout" @click="onClose">
        <div class="modal" @click.stop>
            <div class="modal-title">{{ title }}</div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-bottom">
                <Button :caption="buttons[0]" class="btn-white" @click="onClose" />
                <Button :caption="buttons[1]" class="btn-blue" @click="onAgree"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-layout {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(112, 116, 120, .4);
    display: flex;
    animation: show .3s;
}

.modal-layout.show {
    height: 100%;
    width: 100%;
}

.modal {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 40px;
    margin: auto;
}

.modal-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #10171E;
    margin-bottom: 20px;
}

.modal-body {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #10171E;
    margin-bottom: 40px;
}

.modal-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>