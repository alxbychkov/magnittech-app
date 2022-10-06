<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";
import { onBeforeUnmount, onMounted, onUpdated, ref, toRef } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { toDate } from "../utils/functions";

const taskStore = useTaskStore();
const tasks = toRef(taskStore, "tasks");

const deleteTaskHandler = (ids) => {
  taskStore.delete({ _id: ids });
}
</script>

<template>
  <section class="header">
    <RouterLink to="/task#general">
      <Button class="plus btn-blue" caption="Новое задание" />
    </RouterLink>
  </section>
  <section v-if="tasks.length" class="body">
    <List :head="['Название','Дата','Статус']" :items="tasks.map(t => [t._id, t.name, toDate(t.ends), t.status])" @onDelete="deleteTaskHandler"
      :actions="['edit', 'delete']" />
  </section>
  <div v-else class="body">
    <p class="no-data">В данный момент задания отсутствуют 🤡</p>
  </div>
</template>

<style>
.body {
  margin-top: 25px;
}
</style>
