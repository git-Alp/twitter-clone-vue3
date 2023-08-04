import { defineStore } from "pinia";
import { formatDistanceStrict } from "date-fns";
import firebaseConfig from "../firebase/firebaseConfig";

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
  isLiked: boolean;
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
      firebaseConfig.getPosts()
        .then(response => {
          this.items = response;
        })
        .catch(error => {
          console.log(error)
        })
    },
    createItem(item: Post) {
      firebaseConfig.addPost(item);
      this.items.push(item)
    },
    addItem(id: any, item: Post) {
      firebaseConfig.addComment(id, item);
      const findItem = this.items.find(item => {
        return item.id === id;
      })
      if (findItem) {
        findItem.commentList.push(item)
        findItem.comments++
      }
    },
    likeItem(id: string) {
      const findItem = this.items.find(item => {
        return item.id === id;
      });
      if (findItem) {
        findItem.isLiked ? findItem.like -- : findItem.like ++;
        findItem.isLiked = !findItem.isLiked
      }
      firebaseConfig.likePost(id);
    },
    likeSubItem(postId: any, commentId: any) {
      const findItem = this.items.find(item => {
        return item.id === postId;
      });
      const findComment = findItem?.commentList.find(item => {
        return item.id === commentId;
      })
      if (findComment) {
        findComment.isLiked ? findComment.like -- : findComment.like ++;
        findComment.isLiked = !findComment.isLiked
      }
    }
  }
})