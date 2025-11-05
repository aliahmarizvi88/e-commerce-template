<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../store/UserStore';
import Uni_table from '../../components/Admin/Uni_table.vue';
import { showToast } from '../../utils/Toast';

const userStore = useUserStore();

const showDailogue = ref(false);
const takeAction = ref(null);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'city', label: 'City' },
];

const handleDelete = (row) => {
  takeAction.value = 'delete';
  showDailogue.value = true;
  userStore.deleteUser(row.id);
  showToast('User Deleted Successfully', 'success');
};

const handleBan = (row) => {
  console.log('User Banned', row.username);
};

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">User Management</h1>

    <div v-if="userStore.error" class="text-red-500">
      {{ userStore.error }}
    </div>

    <Uni_table
      :columns="columns"
      :rows="userStore.users"
      admin-mode
      show-actions
      @ban="handleBan"
      @delete="handleDelete"
    />
  </div>
</template>
