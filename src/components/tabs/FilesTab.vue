<script setup>
import { ref } from "vue";
import Button from "../Button.vue";
import List from "../List.vue";
import DropArea from "../DropArea.vue";
import Modal from "../Modal.vue";
import { MODAL_TYPES } from "../../config/default";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const file = ref();
const isShowModal = ref(false);
const selectedItems = ref([]);

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

const deleteFileHandler = (ids) => {
  isShowModal.value = true;
  selectedItems.value = [...ids];
};

const closeModalHandler = () => {
  isShowModal.value = false;
  selectedItems.value = [];
}

const agreeModalHandler = () => {
  const temp = props.task.files.map((f) => JSON.parse(f));
  const filtered = temp.filter((f) => !selectedItems.value.includes(f[0]));

  props.task.files = filtered.map((f) => JSON.stringify(f));
  isShowModal.value = false;
  selectedItems.value = [];
}
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
    <div v-if="task.files.length" class="current-files">
      <List
        :head="['Название']"
        :items="task.files.map((f) => JSON.parse(f))"
        @onDelete="deleteFileHandler"
        :actions="['delete']"
      />
    </div>
    <div v-else class="current-files">
      <p class="no-data">Файлы к заданию отсутствуют 🙄</p>
    </div>
  </div>
  <Modal v-if="isShowModal" :title="MODAL_TYPES['delete'].title" :buttons="MODAL_TYPES['delete'].buttons" @close="closeModalHandler"
    @agree="agreeModalHandler">
    <p>{{ MODAL_TYPES['delete'].slot[0] }}</p><br>
    <p><b>{{ MODAL_TYPES['delete'].slot[1] }}</b> <span style="color: #106EDC">{{ selectedItems.length }}</span></p>
  </Modal>
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
