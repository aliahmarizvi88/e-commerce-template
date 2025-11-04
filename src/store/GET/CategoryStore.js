import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const useCategoryStore = defineStore('CategoryStore', {
  state: () => ({
    category: [],
    productByCategory: [],
    errors: null,
    loading: false,
  }),

  actions: {
    async fetchCategory() {
      this.loading = true;
      this.errors = null;

      try {
        const response = await axios.get(`${URL}/products/categories`);
        this.category = response.data;
      } catch (err) {
        this.errors = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductByCategory(endpoint) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${URL}/products/category/${endpoint}`
        );
        this.productByCategory = response.data;
      } catch (err) {
        this.errors = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
