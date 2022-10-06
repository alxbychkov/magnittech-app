<script setup>
import { ref } from "vue";
import Button from "../Button.vue";
import List from "../List.vue";
import DropArea from "../DropArea.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const file = ref();

const fileInputHandler = () => {
  file.value.click();
};

const changeFileHandler = (value) => {
  let files;
  if (value instanceof Event) {
    files = [...file.value.files];
  } else {
    files = [...value];
  }
  files.forEach((currentFile) => {
    const { lastModified, name } = currentFile;
    props.task.files.push(JSON.stringify([lastModified, name]));
  });
};

const deleteFileHandler = (id) => {
  const temp = props.task.files.map((f) => JSON.parse(f));
  const filtered = temp.filter((f) => f[0] !== id);

  props.task.files = filtered.map((f) => JSON.stringify(f));
};
</script>
<template>
  <div class="documents">
    <div class="new-files">
      <DropArea @onDropFiles="changeFileHandler" />
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
