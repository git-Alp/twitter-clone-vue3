import { defineStore } from "pinia";
import data from '../data.json';
import { formatDistanceStrict } from "date-fns";
import _ from "lodash";

export type Post = {
  id: string;
  src: string;
  username: string;
  fullname: string;
  time: string;
  content: string;
  comments: number;
  retweets: number;
  like: number;
  isOnTimeLine: boolean;
  commentList: Post[];
}

export function handleDateFormat (val: string) {  
  const date = new Date()
  const dataDate = new Date(val)
  return formatDistanceStrict(dataDate, date)
}

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as Post[]
  }),
  actions: {
    getItems() {
      this.items = data.following
    },
    addItem(item: Post) {
      this.items.push(item)
    },
    addComment(item: Post, id: any) {
      const findItem = _.find(this.items, function(item) {
        return item.id === id;
      });
      if (findItem) {
        findItem.comments ++;
        findItem.commentList.push(item);
      }
    },
    sortItems() {      
      this.items.sort((objA: Post, objB: Post) => new Date(objA.time).valueOf() - new Date(objB.time).valueOf())
    }
  },
})