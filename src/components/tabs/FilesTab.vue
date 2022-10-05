<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '../../stores/TaskStore';
import Button from "../Button.vue";
import List from '../List.vue';

const props = defineProps({
    files: {
        type: Array,
        default: []
    },
    task: {
        type: Object
    }
});

const taskStore = useTaskStore();

const dropFiles = ref([]);
const file = ref();

const fileInputHandler = () => {
    file.value.click()
}

const changeFileHandler = () => {
    const { lastModified, name } = file.value.files[0];
    dropFiles.value.push([lastModified, name]);
    props.task.files = dropFiles.value.map(f => JSON.stringify(f));
    console.log(props.task.files);
}

const deleteFileHandler = (id) => {
    dropFiles.value = dropFiles.value.filter(f => f[0] !== id);
    props.task.files = dropFiles.value.map(f => JSON.stringify(f));
}

onMounted(() => {
    dropFiles.value = props.task.files.map(f => JSON.parse(f));
    console.log(taskStore.tasks);
});
</script>
<template>
    <div class="documents">
        <div class="new-files">
            <div class="file-drop">
                <p class="file-drop-title">Загрузить файл</p>
                <p class="file-drop-subtitle">Выберите или перетащите один или несколько файлов</p>
            </div>
            <div class="input-item">
                <input type="file" class="input-file-hidden" ref="file" @change="changeFileHandler">
                <input type="text" class="input input-file" placeholder="Выберете файл...">
                <Button caption="Выбрать" class="btn-blue" @click="fileInputHandler" />
            </div>
        </div>
        <div class="current-files">
            <List :head="['Название']" :items="dropFiles" @onDelete="deleteFileHandler" :actions="['delete']" />
        </div>
    </div>
</template>
<style scoped>
.documents {
    display: flex;
    justify-content: space-between;
}

.new-files {
    width: 55%;
}

.current-files {
    width: 40%;
}

.file-drop {
    background: #F6F6F6;
    border: 2px dashed #DFE3E7;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 200px;
    font-weight: 500;
    color: #82898F;
    margin-bottom: 10px;
}

.file-drop-title {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
}

.file-drop-subtitle {
    font-size: 10px;
    line-height: 13px;
}

.input-item {
    display: flex;
    gap: 4px;
    position: relative;
}

.input-file-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    z-index: -1;
}
</style>