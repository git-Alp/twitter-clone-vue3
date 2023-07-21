import { defineStore } from "pinia";
import data from '../data.json';
import { formatDistanceStrict } from "date-fns";
import _ from "lodash";
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
    // getItems() {
    //   const q = query(collection(db, "posts"));
    //   console.log("q", q);
      
    //   onSnapshot(q, (snapshot) => {
    //     console.log("snapshot", snapshot);
    //     console.log("snapshot.docChanges()", snapshot.docChanges());
        
    //     snapshot.docChanges().forEach((change) => {
    //       let changeData: any = change.doc.data()
    //       if (change.type === "added") {
    //         console.log("New post: ", changeData);
    //         this.items = changeData;
    //       }
    //       if (change.type === "modified") {
    //         console.log("Modified post: ", changeData);
    //       }
    //       if (change.type === "removed") {
    //         console.log("Removed post: ", changeData);
    //       }
    //     });
    //   });
      // this.items = data.following
    //   console.log("posts this.items", this.items);
      
    // },
    getItems() {
      firebaseConfig.getPosts()
        .then(response => {
          this.items = response;
          console.log("this.items", this.items);
          
        })
        .catch(error => {
          console.log(error)
        })
    },

    getItem(id: any) {
      firebaseConfig.getPost(id)
      .then(response => {
        console.log("response", response);
        return response;
        
      })
      .catch(error => {
        console.log(error)
      })
      // const existingEvent = this.items.find(event => event.id === id)
      // if (existingEvent) {
      //   console.log("existingEvent", existingEvent);
        
      //   return existingEvent
      // } 
    },

    createItem(item: Post) {
      console.log("item", item);
      firebaseConfig.addPost(item);
      this.items.push(item)
    },

    // addItem(item: Post) {
    //   this.items.push(item)
    // },
    // addComment(item: Post, id: any) {
    //   const findItem = _.find(this.items, function(item) {
    //     return item.id === id;
    //   });
    //   if (findItem) {
    //     findItem.comments ++;
    //     findItem.commentList.push(item);
    //   }
    // },

    likePost(id: string) {
      const findItem = _.find(this.items, function(item) {
        return item.id === id;
      });
      if (findItem) {
        findItem.isLiked = !findItem.isLiked
        findItem.isLiked ? findItem.like ++ : findItem.like --;
      }
    },
    // sortItems() {      
    //   this.items.sort((objA: Post, objB: Post) => new Date(objA.time).valueOf() - new Date(objB.time).valueOf())
    // }
  },
})