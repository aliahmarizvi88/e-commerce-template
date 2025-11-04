<script setup>
import { Pencil, Trash, Ban } from 'lucide-vue-next';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    require: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  adminMode: {
    type: Boolean,
    default: false,
  },
  showButton: {
    type: Boolean,
    default: false,
  },
  labelButton: {
    type: String,
  },
});

const emits = defineEmits(['edit', 'delete', 'add', 'ban', 'click']);

// const hasData = computed(() => props.rows && props.rows.length > 0);
</script>

<template>
  <div class="overflow-x-hidden rounded-2xl text-white shadow-sm bg-white">
    <div v-if="showButton" class="flex justify-end p-4">
      <button
        @click="$emit('add')"
        class="bg-black hover:scale-105 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        {{ labelButton || 'Add New' }}
      </button>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <!-- Table Head -->
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            {{ col.label }}
          </th>
          <th
            v-if="showActions"
            class="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="divide-y divide-gray-100">
        <!-- <tr v-if="!hasData">
          <td
            :colspan="columns.length + (showActions ? 1 : 0)"
            class="text-center py-6 text-gray-400"
          >
            No data available
          </td>
        </tr> -->

        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="hover:bg-gray-50 transition-colors duration-150"
          @click="$emit('click', row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
          >
            <slot
              v-if="$slots[col.key]"
              :name="col.key"
              :row="row"
              :value="row[col.key]"
            ></slot>

            <span v-else>
              {{ row[col.key] }}
            </span>
          </td>

          <!-- Action Buttons -->
          <td v-if="showActions" class="px-6 py-4 text-right whitespace-nowrap">
            <button
              v-if="!adminMode"
              class="text-blue-600 hover:text-blue-800 font-medium mr-3 cursor-pointer"
              @click="$emit('edit', row)"
            >
              <Pencil />
            </button>
            <button
              v-if="adminMode"
              class="text-yellow-400 hover:text-yellow-500 font-medium mr-3 cursor-pointer"
              @click="$emit('ban', row)"
            >
              <Ban />
            </button>
            <button
              class="text-red-600 hover:text-red-800 font-medium cursor-pointer"
              @click="$emit('delete', row)"
            >
              <Trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
