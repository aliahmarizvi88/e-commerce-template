import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '../AuthStore';

const URL = import.meta.env.VITE_LOCAL_API_URL;

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admins: [],
    loading: false,
    error: null,
  }),

  actions: {
    async adminUser(credentials) {
      this.error = null;
      this.loading = true;

      try {
        const response = await axios.get(
          `${URL}/admin?email=${credentials.email}&password=${credentials.password}`
        );

        if (response.data.length === 1) {
          const foundAdmin = response.data[0];

          const authStore = useAuthStore();
          authStore._handleSuccessfulLogin(foundAdmin, 'admin');

          return foundAdmin;
        } else {
          throw new Error('Invalid administrator credentials.');
        }
      } catch (err) {
        this.error = err.message || 'Admin login failed.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchAllAdmins() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${URL}/admin`);
        this.admins = response.data || [];
      } catch (err) {
        this.error = 'Failed to fetch administrator list.';
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async addNewAdmin(credentials) {
      const password = 'temp12345';
      try {
        const response = axios.post(
          `${URL}/admin?name=${credentials.name}&email=${credentials.email}&password=${password}`
        );
      } catch (error) {}
    },
  },
});
