import { defineStore } from 'pinia';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_API_URL;

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    productDetails: null,
    errors: null,
    loading: false,
  }),

  actions: {
    async fetchProduct() {
      this.loading = true;
      this.errors = null;

      try {
        const response = await axios.get(`${URL}/products`);
        this.products = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    //Fetch Product Details
    async fetchProductDetails(id) {
      this.loading = true;
      this.error = null;
      this.productDetails = null;

      try {
        const localProduct = this.products.find(
          (p) => String(p.id) === String(id)
        );

        if (localProduct) {
          this.productDetails = localProduct;
        } else {
          const response = await axios.get(`${URL}/products/${id}`);
          this.productDetails = response.data;
        }
      } catch (err) {
        this.errors = 'Failed to load product details';
      } finally {
        this.loading = false;
      }
    },

    //Add New Product
    async addProduct(newProduct) {
      this.loading = false;
      this.errors = null;

      const productPayload = {
        ...newProduct,
        rating: { rate: 0, count: 0 },
      };

      try {
        const response = await axios.post(`${URL}/products`, productPayload);
        const productWithId = response.data;
        this.products.push(productWithId);
      } catch (err) {
        this.errors = 'Failed to add product.';
      } finally {
        this.loading = false;
      }
    },

    //Edit Existing Product:
    async editProduct(updatedProduct) {
      this.loading = true;
      this.errors = null;

      try {
        const response = await axios.patch(
          `${URL}/products/${updatedProduct.id}`,
          updatedProduct
        );

        const savedProduct = response.data;

        const index = this.products.findIndex((p) => p.id === savedProduct.id);

        if (index !== -1) {
          this.products[index] = savedProduct;
        }
      } catch (err) {
        this.errors = err.message;
      } finally {
        this.loading = false;
      }
    },

    //deleteProducts
    async deleteProduct(id) {
      this.loading = true;
      this.errors = null;

      try {
        await axios.delete(`${URL}/products/${id}`);

        this.products = this.products.filter((item) => item.id !== id);
      } catch (err) {
        this.errors = 'Failed to delete product.';
      } finally {
        this.loading = false;
      }
    },
  },
});
