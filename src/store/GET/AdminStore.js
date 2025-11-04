import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '../AuthStore';

const URL = import.meta.env.VITE_LOCAL_API_URL;

const generateAdminUsername = (name) => {
  const parts = name
    .toLowerCase()
    .split(' ')
    .filter((p) => p.length > 0);
  const usernameBase = parts.slice(0, 2).join('');
  return usernameBase.length > 0 ? `${usernameBase}88` : 'newadmin88';
};

const createNewAdminPayload = (credentials, tempPassword) => ({
  name: credentials.name,
  email: credentials.email,

  username: generateAdminUsername(credentials.name),
  createdOn: new Date().toISOString(),
  phone: credentials.phone || 'yet to be set',

  password: tempPassword,
  mustChangePassword: true,
});

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
      this.loading = true;
      this.error = null;

      const tempPassword = 'temp12345';

      const payload = createNewAdminPayload(credentials, tempPassword);

      try {
        const response = await axios.post(`${URL}/admin`, payload);
        if (response.status === 201) {
          this.fetchAllAdmins();
          return {
            success: true,
            tempPassword: tempPassword,
          };
        } else {
          throw new Error(`Server returned status: ${response.status}.`);
        }
      } catch (err) {
        this.error =
          err.response?.data?.message || 'Failed to create new administrator.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
