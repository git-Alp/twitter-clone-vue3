import { defineStore } from "pinia";

export type Comment = {
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
export const useCommentStore = defineStore('comment', {
  state: () => ({
    items: [] as Comment[]
  }),
  actions: {
    addNewComment(item: Comment) {
      this.items.push(item)
    }
  }
})