<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import List from "../components/List.vue";
import Button from "../components/Button.vue";

const tasks = [
  {
    "_id": "1",
    "name": "Task 1",
    "ends": "05.06.2017",
    "status": "Не активный",
  },
  {
    "_id": "2",
    "name": "Task 2",
    "ends": "05.06.2017",
    "status": "Не активный",
  },
  {
    "_id": "3",
    "name": "Task 3",
    "ends": "05.06.2017",
    "status": "Не активный",
  },
  {
    "_id": "4",
    "name": "Task 4",
    "ends": "05.06.2017",
    "status": "Не активный",
  },
  {
    "_id": "5",
    "name": "Task 5",
    "ends": "05.06.2017",
    "status": "Не активный",
  }
];

</script>

<template>
  <section class="header">
    <RouterLink to="/task">
      <Button class="plus btn-blue" caption="Новое задание"/>
    </RouterLink>
  </section>
  <section class="body">
    <List :items="tasks"/>
  </section>
</template>

<style>
.body {
  margin-top: 25px;
}
</style>
