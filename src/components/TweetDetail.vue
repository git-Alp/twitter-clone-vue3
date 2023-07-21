<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDataStore, handleDateFormat, Post } from '../stores/posts';
import TweetComment from './TweetComment.vue';
import _ from "lodash";
import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";

const route = useRoute()
// const dataStore = useDataStore();
const {id} = route.params
let posts = ref([] as Post[])

// function getItems() {
//   const q = query(collection(db, "posts"));
  
//   onSnapshot(q, (snapshot) => {    
//     snapshot.docChanges().forEach((change) => {
//       let changeData: any = change.doc.data()
//       if (change.type === "added") {
//         console.log("New post: ", changeData);
//         posts.value.push(changeData);
//       }
//       if (change.type === "modified") {
//         console.log("Modified post: ", changeData);
//       }
//       if (change.type === "removed") {
//         console.log("Removed post: ", changeData);
//       }
//     });
//   });
// }

function handleLikePost(id: string) {
  const findItem = _.find(posts.value, function(item) {
    return item.id === id;
  });
  if (findItem) {
    findItem.isLiked = !findItem.isLiked
    findItem.isLiked ? findItem.like ++ : findItem.like --;
  }
}

const tweet = computed(() => _.find(posts.value, function(item) {
  return item.id === id;
}))

// onMounted(() => getItems())
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="p-3 border-b border-lighter flex items-center justify-start">
      <RouterLink to="/home" class="fa fa-arrow-left flex justify-center items-center w-8 h-8 rounded-full hover:bg-lighter" aria-hidden="true"></RouterLink>
      <span class="text-xl font-bold ml-8">Tweet</span>
    </div>
    <div v-if="tweet" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${tweet.src}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="max-w-full w-full">
          <div class="flex items-center max-w-full">
            <p class="truncate font-semibold max-w-[120px] md:max-w-[110px] xl:max-w-[310px]"> {{tweet.fullname}} </p>
            <p class="truncate text-sm text-dark ml-2 max-w-[80px] xl:max-w-[100px]"> {{tweet.username}} </p>
            <p class="truncate text-sm text-dark mx-2"> {{handleDateFormat(tweet.time)}} </p>
            <i class="truncate fa fa-ellipsis-h text-dark ml-auto mr-2"></i>
          </div>
          <p class="py-2"> {{ tweet.content }} </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="far fa-comment mr-3"></i>
              <p> {{tweet.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{tweet.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer" @click="handleLikePost(tweet.id)">
              <i class="fa-heart mr-3" :class="tweet.isLiked ? 'fa text-red-600' : 'fas'"></i>
              <p> {{tweet.like}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
    </div>

    <TweetComment />
  </div>
</template>