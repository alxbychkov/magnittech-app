<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "../components/Button.vue";

const STEPS = ['general', 'documents', 'comments'];

const route = useRoute();
const step = ref(STEPS[0]);

onBeforeMount(() => {
  if (route.hash && STEPS.includes(route.hash.slice(1)))
    step.value = route.hash.slice(1);

  console.log(step.value);
});
</script>
<template>
  <h1 class="h1-title">Создание нового задания: {{ $route.params.id }}</h1>
  <section class="tabs">
    <ul class="tabs-list">
      <li class="tab-item" :class="{active: step === 'general', visited: STEPS.indexOf(step) > 0}">
        <RouterLink to="#general" class="tab-link">Основные настройки</RouterLink>
      </li>
      <li class="tab-item" :class="{active: step === 'documents', visited: STEPS.indexOf(step) > 1}">
        <RouterLink to="#documents" class="tab-link">Документы</RouterLink>
      </li>
      <li class="tab-item" :class="{active: step === 'comments', visited: STEPS.indexOf(step) > 2}">
        <RouterLink to="#comments" class="tab-link">Комментарии</RouterLink>
      </li>
    </ul>
  </section>
  <section class="navigation">
    <Button caption="Назад" class="btn-white prev" />
    <Button caption="Далее" class="btn-white next" />
    <div class="separator"></div>
    <Button caption="Сохранить" class="btn-white save" />
    <Button caption="Отмена" class="btn-white cancel" />
  </section>
</template>

<style scoped>
.tabs {
  margin-bottom: 30px;
}

.h1-title {
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #10171E;
  margin-bottom: 24px;
}

.tabs-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0;
}

.tab-item {
  background: #F2F6F9;
  border-radius: 10px 0px 0px 0px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  counter-increment: li;
  width: 100%;
  max-width: 300px;
}

.tab-link {
  display: block;
  padding: 18px 24px;
  color: #10151B;
}

.tab-link::before {
  content: counter(li) ".";
  margin-right: 5px;
}

.tab-item.active {
  background: #0C2747;
}

.tab-item.active .tab-link {
  color: #fff;
}

.tab-item.visited {
  background: #304E71;
}

.tab-item.visited .tab-link {
  color: #fff;
}

.tab-item:not(:last-child) {
  margin-right: 10px;
}

.navigation {
  background: #F6F6F6;
  padding: 21px 30px;
  opacity: 0.6;
  border-top: 1px dashed #82898F;
  border-bottom: 1px dashed #82898F;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.navigation .button:not(:last-child) {
  margin-right: 10px;
}

.separator {
  width: 1px;
  height: 40px;
  margin: 0 30px 0 20px;
  background: #BBC0C5;
}
</style>
