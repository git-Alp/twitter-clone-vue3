<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDataStore, handleDateFormat } from '../stores/posts';
import TweetComment from './TweetComment.vue';
import _ from "lodash";

const route = useRoute()
const dataStore = useDataStore();
const {id} = route.params

const tweets = computed(() => _.find(dataStore.items, function(item) {
  return item.id === id;
}))

</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="p-3 border-b border-lighter flex items-center justify-start">
      <RouterLink to="/" class="fa fa-arrow-left flex justify-center items-center w-8 h-8 rounded-full hover:bg-lighter" aria-hidden="true"></RouterLink>
      <span class="text-xl font-bold ml-8">Tweet</span>
    </div>
    <div v-if="tweets" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${tweets.src}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{tweets.fullname}} </p>
            <p class="text-sm text-dark ml-2"> {{tweets.username}} </p>
            <p class="text-sm text-dark ml-2"> {{handleDateFormat(tweets.time)}} </p>
            <i class="fa fa-ellipsis-h text-dark ml-auto"></i>
          </div>
          <p class="py-2"> {{ tweets.content }} </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p> {{tweets.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{tweets.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p> {{tweets.like}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
    </div>

    <TweetComment />
  </div>
</template>