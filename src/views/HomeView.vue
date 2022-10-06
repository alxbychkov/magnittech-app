<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";
import { onBeforeUnmount, onMounted, onUpdated, ref, toRef } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { toDate } from "../utils/functions";
import Modal from "../components/Modal.vue";

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
}

const agreeModalHandler = () => {
    taskStore.delete({ _id: selectedItems.value });
    isShowModal.value = false;
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
  <Modal v-if="isShowModal" title="Удалить выбранное ?" :buttons="['Отмена','Удалить']" @close="closeModalHandler"
    @agree="agreeModalHandler">
    <p>Выбранные вами объекты удалятся без возможности восстановления.</p><br>
    <p><b>Выбрано объектов: </b> <span style="color: #106EDC">{{ selectedItems.length }}</span></p>
  </Modal>
</template>

<style>
.body {
  margin-top: 25px;
}
</style>
