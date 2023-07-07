<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDataStore, handleDateFormat } from '../stores/posts';
import TweetComment from './TweetComment.vue';
import _ from "lodash";

const route = useRoute()
const dataStore = useDataStore();
const {id} = route.params

function handleLikePost(val: string) {
  dataStore.likePost(val)
}

const tweet = computed(() => _.find(dataStore.items, function(item) {
  return item.id === id;
}))
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="p-3 border-b border-lighter flex items-center justify-start">
      <RouterLink to="/" class="fa fa-arrow-left flex justify-center items-center w-8 h-8 rounded-full hover:bg-lighter" aria-hidden="true"></RouterLink>
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