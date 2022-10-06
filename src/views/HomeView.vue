<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";
import { onMounted, toRef } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { toDate } from "../utils/functions";

const taskStore = useTaskStore();
const tasks = toRef(taskStore, "tasks");
const taskList = tasks.value.map(t => [t._id, t.name, toDate(t.ends), t.status]);

const deleteTaskHandler = (ids) => {
  console.log(ids);
  if (ids.length === 1)
    taskStore.delete({ _id: ids[0] });
  else
    taskStore.deleteAll({ _id: id });
}

onMounted(() => { });
</script>

<template>
  <section class="header">
    <RouterLink to="/task#general">
      <Button class="plus btn-blue" caption="Новое задание" />
    </RouterLink>
  </section>
  <section v-if="taskList.length" class="body">
    <List :head="['Название','Дата','Статус']" :items="taskList" @onDelete="deleteTaskHandler"
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
