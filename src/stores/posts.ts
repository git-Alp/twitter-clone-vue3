import { defineStore } from "pinia";

export type Post = {
  src: string;
  name: string;
  handle: string;
  time: string;
  content: string;
  comments: number;
  retweets: number;
  like: number;
}
export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as Post[]
  }),
  getters: {
    itemsCount(): Object {
      return this.items
    }
  },
  actions: {
    addItem(item: Post) {
      this.items.push(item)
    }
  }
})