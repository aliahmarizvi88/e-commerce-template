<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '400px',
  },
  type: {
    type: String,
    default: 'form',
    validator: (value) => ['form', 'confrim', 'alert'],
  },
  message: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const closeDialog = () => emit('update:modelValue', false);
const confirmDialog = () => {
  emit('confirm');
  if (props.type === 'alert' || props.type === 'confirm') {
    closeDialog();
  }
};
const cancelDialog = () => {
  emit('cancel');
  closeDialog();
};
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl shadow-lg p-6 relative" :style="{ width }">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>

        <button
          @click="closeDialog"
          class="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      <div class="space-y-3">
        <p v-if="type !== 'form' && message" class="text-gray-600">
          {{ message }}
        </p>
        <slot v-else />
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <slot name="footer">
          <template v-if="type === 'form'">
            <button
              @click="cancelDialog"
              class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              @click="confirmDialog"
              class="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-700 cursor-pointer"
            >
              Confirm
            </button>
          </template>

          <template v-else-if="type === 'confirm'">
            <button
              @click="cancelDialog"
              class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              No
            </button>
            <button
              @click="confirmDialog"
              class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              Yes, proceed
            </button>
          </template>

          <template v-else-if="type === 'alert'">
            <button
              @click="confirmDialog"
              class="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-700 cursor-pointer"
            >
              OK
            </button>
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>
