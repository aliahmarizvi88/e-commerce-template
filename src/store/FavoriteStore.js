import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorite: [],
  }),

  actions: {
    addToFavorites(items) {
      const exists = this.favorite.some((fav) => fav.id === items.id);
      if (!exists) {
        this.favorite.push(items);
      }
    },
    removeFromFavorites(id) {
      this.favorite = this.favorite.filter((item) => item.id !== id);
    },
    isFavorite(id) {
      return this.favorite.some((item) => item.id === id);
    },
  },
  getters: {
    favoriteCount: (state) => state.favorite.length,
  },
});
