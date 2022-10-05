<script setup>
import EditIcon from "./icons/EditIcon.vue";
import BasketIcon from "./icons/BasketIcon.vue";
import { toDate } from "../utils/functions";
defineProps({
  items: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <ul class="list">
    <li class="list-item list-item-head">
      <div class="list-name list-title">Название</div>
      <div class="list-date list-title">Дата</div>
      <div class="list-status list-title">Статус</div>
      <div class="list-actions"></div>
    </li>

    <li v-for="item in items" class="list-item" :key="item._id">
      <div class="list-name list-title">{{ item.name }}</div>
      <div class="list-date list-title">{{ toDate(item.ends) }}</div>
      <div class="list-status list-title">{{ item.status }}</div>
      <div class="list-actions">
        <button class="btn-action">
          <RouterLink :to="`task/${item._id}`" class="list-link">
            <EditIcon />
          </RouterLink>
        </button>
        <button class="btn-action">
          <BasketIcon />
        </button>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.list {
  list-style: none;
}

.list-item {
  background: #f6f6f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 12px 25px 33px;
}
.list-item:not(:last-child) {
  margin-bottom: 6px;
}

.list-item.list-item-head {
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 12px 25px 33px;
}

.list-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #10171e;
}

.list-item-head .list-title {
  font-weight: 500;
  margin-left: 15px;
}

.list-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-action {
  border: none;
  margin: 0 20px;
  cursor: pointer;
}

.list-name {
  width: 30%;
}

.list-status,
.list-date {
  width: 15%;
}

.list-actions {
  width: 120px;
}
</style>
