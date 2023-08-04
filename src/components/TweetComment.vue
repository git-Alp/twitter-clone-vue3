<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useDataStore, Post, handleDateFormat } from '../stores/posts';
import { User, useUserStore } from '../stores/user';
import { useRoute, RouterLink } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import _ from "lodash";
import firebaseConfig from "../firebase/firebaseConfig";

const dataStore = useDataStore();
const userStore = useUserStore();
const route = useRoute()
const {id} = route.params

let post = ref({} as Post)
let newCommentContent = ref('');
let userInfo = reactive({} as User);

function addNewComment () {
  let newComment = {
    id: uuidv4(),
    src: userInfo.photo,
    username: userInfo.email,
    fullname: userInfo.username,
    time: new Date().toString(),
    content: newCommentContent.value,
    comments: 0,
    retweets: 0,
    like: 0,
    isLiked: false,
    isOnTimeLine: false,
    commentList: []
  };

  post.value.commentList.push(newComment)
  post.value.comments++
  
  dataStore.createItem(newComment)
  dataStore.addItem(id, newComment)
  newCommentContent.value = ''
}

function getItem(id: any) {
  firebaseConfig.getPost(id)
    .then(response => {
      if (response) post.value = response
    })
    .catch(error => console.log(error))
}

function handleLikePost(val: string) {
  const commentIndex = post.value.commentList.findIndex(item => {
    return item.id === val
  })
  const findComment = post.value.commentList[commentIndex]
  if (findComment) {
    findComment.isLiked ? findComment.like -- : findComment.like ++;
    findComment.isLiked = !findComment.isLiked
  }
  dataStore.likeItem(val)
  dataStore.likeSubItem(id, val)
}

onMounted(() => {
  userInfo = userStore.user
  getItem(id)
})
</script>

<template>
  <div>
    <div class="px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <img :src="userInfo.photo" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
      </div>
      <form @submit.prevent = "addNewComment" class="w-full px-4 relative">
        <textarea v-model="newCommentContent" placeholder="Tweet your reply!" maxlength="500" class="mt-3 pb-3 w-full focus:outline-none"/>
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
      <div v-for="tweet in post.commentList" :key="tweet.id" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="tweet.src" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="max-w-full w-full">
          <RouterLink :to="`/tweet/${tweet.id}`" class="w-full">
            <div class="flex items-center max-w-full">
              <p class="truncate font-semibold max-w-[120px] md:max-w-[110px] xl:max-w-[310px]"> {{tweet.fullname}} </p>
              <p class="truncate text-sm text-dark ml-2 max-w-[80px] xl:max-w-[100px]"> {{tweet.username}} </p>
              <p v-if="tweet.time" class="truncate text-sm text-dark mx-2"> {{ handleDateFormat(tweet.time) }} </p>
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
    </div>
  </div>
</template>