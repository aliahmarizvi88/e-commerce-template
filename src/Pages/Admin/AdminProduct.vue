<script setup>
import { ref, onMounted } from 'vue';

import { useProductStore } from '../../store/GET/ProductStore';
import { useCategoryStore } from '../../store/GET/CategoryStore';

import Uni_table from '../../components/Admin/Uni_table.vue';
import UniDailogue from '../../components/UniDailogue.vue';

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const showDailogue = ref(false);
const isEditing = ref(false);
const selectProduct = ref(null);

const form = ref({
  title: '',
  category: '',
  price: '',
  image: '',
  description: '',
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'price', label: 'Price' },
  { key: 'category', label: 'Category' },
  { key: 'image', label: 'Image' },
];

const handleAdd = () => {
  isEditing.value = false;
  form.value = {
    title: '',
    category: '',
    price: '',
    image: '',
    description: '',
  };
  showDailogue.value = true;
};

const handleEdit = (row) => {
  isEditing.value = true;
  selectProduct.value = row;
  form.value = { ...row };
  showDailogue.value = true;
};

const handleDelete = (row) => {
  productStore.deleteProduct(row.id);
  console.log('Deleted');
};

const handleConfirm = () => {
  if (
    !form.value.title ||
    !form.value.category ||
    !form.value.price ||
    !form.value.image ||
    !form.value.description
  ) {
    console.log('Something is missing please Add that please.');
    return;
  }
  if (isEditing.value) {
    productStore.editProduct(form.value);
  } else {
    productStore.addProduct(form.value);
  }
  showDailogue.value = false;
};

onMounted(() => {
  productStore.fetchProduct();
  categoryStore.fetchCategory();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Product Management</h1>

    <div v-if="productStore.error" class="text-red-500">
      {{ productStore.error }}
    </div>

    <Uni_table
      :columns="columns"
      :rows="productStore.products"
      show-actions
      show-button
      label-button="Add Product"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #image="{ value }">
        <img
          v-if="value"
          :src="value"
          alt="Product Image"
          class="w-12 h-12 rounded-lg object-cover"
        />
        <div
          v-else
          class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"
        >
          N/A
        </div>
      </template>

      <template #price="{ value }">
        <span class="text-green-600 font-semibold">$ {{ value }}</span>
      </template>
    </Uni_table>

    <!-- Universal Dailogue -->
    <UniDailogue
      v-model="showDailogue"
      :title="isEditing ? 'Update Product' : 'Add Product'"
      width="420px"
      @confirm="handleConfirm"
      @cancel="showDailogue = false"
    >
      <div class="flex flex-col gap-3">
        <input
          type="text"
          v-model="form.title"
          class="border py-2 px-3 rounded-lg"
          placeholder="Product Name"
        />
        <!-- <input
          type="text"
          v-model="form.category"
          class="border py-2 px-3 rounded-lg"
          placeholder="Product Category"
        /> -->
        <select class="border py-2 px-3 rounded-lg" v-model="form.category">
          <option default disabled>Select Category</option>
          <option
            v-for="(cat, index) in categoryStore.category"
            :key="index"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
        <input
          type="number"
          v-model="form.price"
          class="border py-2 px-3 rounded-lg"
          placeholder="Product Price"
        />
        <input
          type="text"
          v-model="form.image"
          class="border py-2 px-3 rounded-lg"
          placeholder="Image URL"
        />
        <textarea
          type="text"
          v-model="form.description"
          class="border py-2 px-3 rounded-lg"
          placeholder="Product Description"
        />
      </div>
    </UniDailogue>
  </div>
</template>
