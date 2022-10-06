<script setup>
import { onMounted, ref } from "vue";
import Button from "../Button.vue";
import List from "../List.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const dropFiles = ref([]);
const file = ref();

const fileInputHandler = () => {
  file.value.click();
};

const changeFileHandler = () => {
  [...file.value.files].forEach((currentFile) => {
    const { lastModified, name } = currentFile;
    props.task.files.push(JSON.stringify([lastModified, name]));
  });
};

const deleteFileHandler = (id) => {
  const temp = props.task.files.map((f) => JSON.parse(f));
  const filtered = temp.filter((f) => f[0] !== id);

  props.task.files = filtered.map((f) => JSON.stringify(f));
};

onMounted(() => {});
</script>
<template>
  <div class="documents">
    <div class="new-files">
      <div class="file-drop">
        <p class="file-drop-title">Загрузить файл</p>
        <p class="file-drop-subtitle">
          Выберите или перетащите один или несколько файлов
        </p>
      </div>
      <div class="input-item">
        <input
          type="file"
          class="input-file-hidden"
          ref="file"
          @change="changeFileHandler"
          multiple
        />
        <input
          type="text"
          class="input input-file"
          placeholder="Выберете файл..."
        />
        <Button caption="Выбрать" class="btn-blue" @click="fileInputHandler" />
      </div>
    </div>
    <div class="current-files">
      <List
        :head="['Название']"
        :items="task.files.map((f) => JSON.parse(f))"
        @onDelete="deleteFileHandler"
        :actions="['delete']"
      />
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
  background: #f6f6f6;
  border: 2px dashed #dfe3e7;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  font-weight: 500;
  color: #82898f;
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
