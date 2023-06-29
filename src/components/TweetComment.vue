<script setup lang="ts">
import { reactive } from 'vue';
import { useCommentStore } from '../stores/comments';
import {v4 as uuidv4} from 'uuid'

const commentStore = useCommentStore();

const NewComment = reactive({
  id: uuidv4(),
  src: '/img/avatar.png',
  name: 'Hayati Tehlike',
  handle: '@HayatiBey',
  time: '20 min',
  content: '',
  comments: 1,
  retweets: 2,
  like: 3,
})

function addNewComment () {
  commentStore.addNewComment({ ...NewComment})
  console.log("{ ...NewComment}", { ...NewComment});
  NewComment.content = ''
}
</script>

<template>
  <div>
    <div class="px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <img src="/img/avatar.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
      </div>
      <form v-on:submit.prevent = "addNewComment" class="w-full px-4 relative">
        <textarea v-model="NewComment.content" placeholder="What is happening?!" class="mt-3 pb-3 w-full focus:outline-none"/>
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
      <div v-for="tweet in commentStore.items" :key="tweet.id" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${tweet.src}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{tweet.name}} </p>
            <p class="text-sm text-dark ml-2"> {{tweet.handle}} </p>
            <p class="text-sm text-dark ml-2"> {{tweet.time}} </p>
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
      </div>
    </div>
  </div>
</template>