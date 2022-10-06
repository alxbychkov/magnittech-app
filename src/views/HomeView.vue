<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";
import { onBeforeUnmount, onMounted, onUpdated, ref, toRef } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { toDate } from "../utils/functions";
import Modal from "../components/Modal.vue";
import { MODAL_TYPES } from "../config/default.js";

const taskStore = useTaskStore();
const tasks = toRef(taskStore, "tasks");
const isShowModal = ref(false);
const selectedItems = ref([]);

const deleteTaskHandler = (ids) => {
  selectedItems.value = [...ids];
  isShowModal.value = true;
}

const closeModalHandler = () => {
  isShowModal.value = false;
  selectedItems.value = [];
}

const agreeModalHandler = () => {
    taskStore.delete({ _id: selectedItems.value });
    isShowModal.value = false;
    selectedItems.value = [];
}

</script>

<template>
  <section class="header">
    <RouterLink to="/task#general">
      <Button class="plus btn-blue" caption="Новое задание" />
    </RouterLink>
  </section>
  <section v-if="tasks.length" class="body">
    <List :head="['Название','Дата','Статус']" :items="tasks.map(t => [t._id, t.name, toDate(t.ends), t.status])"
      @onDelete="deleteTaskHandler" :actions="['edit', 'delete']" />
  </section>
  <div v-else class="body">
    <p class="no-data">В данный момент задания отсутствуют 🤡</p>
  </div>
  <Modal v-if="isShowModal" :title="MODAL_TYPES['delete'].title" :buttons="MODAL_TYPES['delete'].buttons" @close="closeModalHandler"
    @agree="agreeModalHandler">
    <p>{{ MODAL_TYPES['delete'].slot[0] }}</p><br>
    <p><b>{{ MODAL_TYPES['delete'].slot[1] }}</b> <span style="color: #106EDC">{{ selectedItems.length }}</span></p>
  </Modal>
</template>

<style>
.body {
  margin-top: 25px;
}
</style>
