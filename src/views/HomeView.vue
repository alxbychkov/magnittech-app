<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";
import { onMounted, toRef } from "vue";
import { useTaskStore } from "../stores/TaskStore";

const taskStore = useTaskStore();
const tasks = toRef(taskStore, "tasks");

onMounted(() => {
  console.log(tasks.value);
});
</script>

<template>
  <section class="header">
    <RouterLink to="/task">
      <Button class="plus btn-blue" caption="Новое задание" />
    </RouterLink>
  </section>
  <section class="body">
    <List :items="tasks" />
  </section>
</template>

<style>
.body {
  margin-top: 25px;
}
</style>
