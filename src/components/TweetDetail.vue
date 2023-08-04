<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDataStore, handleDateFormat, Post } from '../stores/posts';
import TweetComment from './TweetComment.vue';
import firebaseConfig from "../firebase/firebaseConfig";

const route = useRoute()
const dataStore = useDataStore();
const {id} = route.params
let post = ref({} as Post)

function handleLikePost(val: string) {
  post.value.isLiked ? post.value.like -- : post.value.like ++;
  post.value.isLiked = !post.value.isLiked
  dataStore.likeItem(val)

}

function getItem(id:any) {
  firebaseConfig.getPost(id)
    .then(response => {
      if (response) post.value = response
    })
    .catch(error => console.log(error))
}

onMounted(() => getItem(id))
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="p-3 border-b border-lighter flex items-center justify-start">
      <RouterLink to="/home" class="fa fa-arrow-left flex justify-center items-center w-8 h-8 rounded-full hover:bg-lighter" aria-hidden="true"></RouterLink>
      <span class="text-xl font-bold ml-8">Tweet</span>
    </div>
    <div v-if="post" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="post.src" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="max-w-full w-full">
          <div class="flex items-center max-w-full">
            <p class="truncate font-semibold max-w-[120px] md:max-w-[110px] xl:max-w-[310px]"> {{post.fullname}} </p>
            <p class="truncate text-sm text-dark ml-2 max-w-[80px] xl:max-w-[100px]"> {{post.username}} </p>
            <p v-if="post.time" class="truncate text-sm text-dark mx-2"> {{ handleDateFormat(post.time) }} </p>
            <i class="truncate fa fa-ellipsis-h text-dark ml-auto mr-2"></i>
          </div>
          <p class="py-2"> {{ post.content }} </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="far fa-comment mr-3"></i>
              <p> {{post.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{post.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer" @click="handleLikePost(post.id)">
              <i class="fa-heart mr-3" :class="post.isLiked ? 'fa text-red-600' : 'fas'"></i>
              <p> {{post.like}} </p>
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