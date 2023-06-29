import { defineStore } from "pinia";

export type Post = {
  id: string;
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
  actions: {
    addItem(item: Post) {
      this.items.push(item)
    }
  }
})