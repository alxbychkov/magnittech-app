<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const dropArea = ref();
const active = ref(false);

const highlight = () => {
  active.value = true;
};
const unhighlight = () => {
  active.value = false;
};

const handleDrop = (e) => {
  const files = e.dataTransfer.files;
  dropFilesHandler(files);
};

const handlerFunction = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const emit = defineEmits(["onDropFiles"]);

const dropFilesHandler = (files) => {
  emit("onDropFiles", files);
};

onMounted(() => {
  dropArea.value.addEventListener("dragenter", handlerFunction, false);
  dropArea.value.addEventListener("dragleave", handlerFunction, false);
  dropArea.value.addEventListener("dragover", handlerFunction, false);
  dropArea.value.addEventListener("drop", handlerFunction, false);

  dropArea.value.addEventListener("dragenter", highlight, false);
  dropArea.value.addEventListener("dragover", highlight, false);

  dropArea.value.addEventListener("dragleave", unhighlight, false);
  dropArea.value.addEventListener("drop", unhighlight, false);

  dropArea.value.addEventListener("drop", handleDrop, false);
});

onBeforeUnmount(() => {
  dropArea.value.removeEventListener("dragenter", handlerFunction, false);
  dropArea.value.removeEventListener("dragleave", handlerFunction, false);
  dropArea.value.removeEventListener("dragover", handlerFunction, false);
  dropArea.value.removeEventListener("drop", handlerFunction, false);

  dropArea.value.removeEventListener("dragenter", highlight, false);
  dropArea.value.removeEventListener("dragover", highlight, false);

  dropArea.value.removeEventListener("dragleave", unhighlight, false);
  dropArea.value.removeEventListener("drop", unhighlight, false);

  dropArea.value.removeEventListener("drop", handleDrop, false);
});
</script>
<template>
  <div class="file-drop" :class="{ highlight: active }" ref="dropArea">
    <p class="file-drop-title">Загрузить файл</p>
    <p class="file-drop-subtitle">
      Выберите или перетащите один или несколько файлов
    </p>
  </div>
</template>
<style scoped>
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

.file-drop.highlight {
  opacity: 0.5;
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
</style>
