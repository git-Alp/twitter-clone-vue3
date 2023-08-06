<script setup lang="ts">
import { ref, reactive, onBeforeMount, computed } from 'vue'
import { useDataStore, handleDateFormat, Post } from '../stores/posts';
import { useUserStore, User } from '../stores/user';
import { RouterLink } from 'vue-router'
import {v4 as uuidv4} from 'uuid'

const dataStore = useDataStore();
const userStore = useUserStore();

let newTweetContent = ref('');
let userInfo = reactive({} as User);

function addNewTweet () {
  let newTweet = {
    id: uuidv4(),
    src: userInfo.photo,
    username: userInfo.email,
    fullname: userInfo.username,
    time: new Date().toString(),
    content: newTweetContent.value,
    comments: 0,
    retweets: 0,
    like: 0,
    isLiked: false,
    isOnTimeLine: true,
    commentList: []
  };

  if (newTweetContent.value.trim() != '') {
    dataStore.createItem(newTweet)
    newTweetContent.value = ''
  }
}

function likePost(val: string) {
  dataStore.likeItem(val)
}

const showTweets = computed(() => {
  return dataStore.items
    .filter(i => i.isOnTimeLine)
    .sort((objA: Post, objB: Post) => new Date(objA.time).valueOf() - new Date(objB.time).valueOf())
})

onBeforeMount(() => {
  dataStore.getItems()
  userInfo = userStore.user  
})
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
      <h1 class="text-xl font-bold">Home</h1>
    </div>
    <div class="px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <img :src="userInfo.photo" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
      </div>
      <form @submit.prevent = "addNewTweet" class="w-full px-4 relative">
        <textarea v-model="newTweetContent" placeholder="What is happening?!" maxlength="500" class="mt-3 pb-3 w-full focus:outline-none"/>
        <div class="flex items-center">
          <i class="text-lg text-blue mr-4 far fa-image"></i>
          <i class="text-lg text-blue mr-4 fas fa-film"></i>
          <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
          <i class="text-lg text-blue mr-4 far fa-smile"></i>
          <i class="text-lg text-blue mr-4 fa fa-calendar"></i>
          <i class="text-lg text-blue mr-4 fa fa-map-marker"></i>
        </div>
        <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
          Tweet
        </button>
      </form>
    </div>
    <div class="flex flex-col-reverse">
      <div v-for="tweet in showTweets" :key="tweet.id" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="tweet.src" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="max-w-full w-full">
          <RouterLink :to="`/tweet/${tweet.id}`" class="w-full">
            <div class="flex items-center max-w-full">
              <p class="truncate font-semibold max-w-[120px] md:max-w-[110px] xl:max-w-[310px]"> {{tweet.fullname}} </p>
              <p class="truncate text-sm text-dark ml-2 max-w-[80px] xl:max-w-[100px]"> {{tweet.username}} </p>
              <p v-if="tweet.time" class="truncate text-sm text-dark mx-2">{{ handleDateFormat(tweet.time) }}</p>
              <i class="truncate fa fa-ellipsis-h text-dark ml-auto mr-2"></i>
            </div>
            <p class="py-2"> {{ tweet.content }} </p>
          </RouterLink>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="far fa-comment mr-3"></i>
              <p> {{tweet.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{tweet.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer" @click="likePost(tweet.id)">
              <i class="fa-heart mr-3" :class="tweet.isLiked ? 'fa text-red-600' : 'fas'"></i>
              <p> {{tweet.like}} </p>
            </div>
            <div class="flex items-center text-sm text-dark hover:cursor-pointer">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>