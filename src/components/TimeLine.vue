<script setup lang="ts">
import { ref, reactive, onBeforeMount, computed } from 'vue'
import data from '../data.json'
import { useDataStore, handleDateFormat } from '../stores/posts';
import { RouterLink } from 'vue-router'
import {v4 as uuidv4} from 'uuid'
import _ from "lodash";

const timeLineData = ref(data)
const dataStore = useDataStore();

const newTweet = reactive({
  id: "",
  src: '/img/avatar.png',
  username: '@HayatiBey',
  fullname: 'Hayati Tehlike',
  time: "",
  content: '',
  comments: 0,
  retweets: 0,
  like: 0,
  isOnTimeLine: true,
  commentList: []
});

function addNewTweet () {
  newTweet.id = uuidv4();
  newTweet.time = new Date().toString();
  dataStore.addItem({ ...newTweet});
  newTweet.content = ''
}

const showTweets = computed(() => _.filter(dataStore.items, function(item) {
  return item.isOnTimeLine;
}))

onBeforeMount(() => {
  dataStore.getItems()
  dataStore.sortItems()
  })
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
      <h1 class="text-xl font-bold">Home</h1>
    </div>
    <div class="px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <img :src="`${timeLineData.userinfo.src}`" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
      </div>
      <form v-on:submit.prevent = "addNewTweet" class="w-full px-4 relative">
        <textarea v-model="newTweet.content" placeholder="What is happening?!" class="mt-3 pb-3 w-full focus:outline-none"/>
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
      <RouterLink :to="`/tweet/${tweet.id}`" v-for="tweet in showTweets" :key="tweet.id" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${tweet.src}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{tweet.fullname}} </p>
            <p class="text-sm text-dark ml-2"> {{tweet.username}} </p>
            <p class="text-sm text-dark ml-2">{{ handleDateFormat(tweet.time) }}</p>
            <i class="fa fa-ellipsis-h text-dark ml-auto"></i>
          </div>
          <p class="py-2"> {{ tweet.content }} </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p> {{tweet.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{tweet.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p> {{tweet.like}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>