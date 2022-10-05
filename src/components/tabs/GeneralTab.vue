<script setup>
defineProps({
    task: Object
});
</script>
<template>
    <div class="general">
        <div class="input-item col-2">
            <span class="input-label">Название задания:</span>
            <input type="text" class="input input-name" placeholder="Название" v-model="task.name">
        </div>
        <div class="input-item">
            <span class="input-label">Дата завершения:</span>
            <input type="date" class="input input-date" v-model="task.ends">
        </div>
        <div class="input-item col-3">
            <span class="input-label">Описание задания:</span>
            <textarea class="input" cols="30" rows="10" placeholder="Описание" v-model="task.description"></textarea>
        </div>
        <div class="line col-3"></div>
        <div class="input-item">
            <span class="input-label">Статус задания:</span>
            <select class="input input-select" v-model="task.status">
                <option value="Создан">Создан</option>
                <option value="Не активный">Не активный</option>
                <option value="Просрочен">Просрочен</option>
                <option value="Завершен">Завершен</option>
            </select>
        </div>
    </div>
</template>
<style scoped>
.input-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.input-label {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #10171E;
}



.line {
    width: 100%;
    height: 1px;
    background: #DFE3E7;
}

.input-select,
.input-date {
    max-width: 300px;
}

.input-date {}

.input-select {
    padding: 10px 16px;
}

.input-name {
    max-width: 600px;
}

.general {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 920px;
    row-gap: 30px;
    column-gap: 20px;
}

.col-2 {
    grid-column-start: 1;
    grid-column-end: 3;
}

.col-3 {
    grid-column-start: 1;
    grid-column-end: 4;
}
</style>