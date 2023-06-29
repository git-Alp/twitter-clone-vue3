<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute, RouterLink} from 'vue-router'
import { useDataStore } from '../stores/posts';
import { useMovieStore } from '../stores/movieService'
import TweetComment from './TweetComment.vue';

const dataStore = useDataStore();
const movieStore = useMovieStore();
let oldTweet = ref({
  id: null,
  backdrop_path: null,
  title: null,
  user: null,
  overview: null,
  release_date: null,
  popularity: null,
  vote_average: null,
  vote_count: null,
})
let newTweet = ref({
  id: '',
  src: '',
  name: '',
  handle: '',
  time: '',
  content: '',
  comments: null,
  retweets: null,
  like: null,
})
const route = useRoute()
const {id} = route.params
console.log("id", id);

onMounted(() => {
  oldTweet.value = movieStore.movies.find(i => i.id === id)
  newTweet.value = dataStore.items.find(i => i.id === id) 
})
</script>

<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="p-3 border-b border-lighter flex items-center justify-start">
      <RouterLink to="/" class="fa fa-arrow-left flex justify-center items-center w-8 h-8 rounded-full hover:bg-lighter" aria-hidden="true"></RouterLink>
      <span class="text-xl font-bold ml-8">Tweet</span>
    </div>
    <div v-if="oldTweet" class="w-full p-4 border-b hover:bg-lighter flex">
      <div class="flex-none mr-4">
        <img :src="`https://image.tmdb.org/t/p/w500/${oldTweet.backdrop_path}`" class="h-12 w-12 rounded-full flex-none"/>
      </div>
      <div class="w-full">
        <div class="flex items-center w-full">
          <p class="font-semibold"> {{ oldTweet.title}} </p>
          <p class="text-sm text-dark ml-2"> {{ oldTweet.user }} </p>
          <p class="text-sm text-dark ml-2"> {{ oldTweet.release_date }} </p>
          <i class="fa fa-ellipsis-h text-dark ml-auto"></i>
        </div>
        <p class="py-2">
          {{ oldTweet.overview }}
        </p>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center text-sm text-dark">
            <i class="far fa-comment mr-3"></i>
            <p> {{ oldTweet.popularity }} </p>
          </div>
          <div class="flex items-center text-sm text-dark">
            <i class="fas fa-retweet mr-3"></i>
            <p> {{ oldTweet.vote_average }} </p>
          </div>
          <div class="flex items-center text-sm text-dark">
            <i class="fas fa-heart mr-3"></i>
            <p> {{ oldTweet.vote_count }} </p>
          </div>
          <div class="flex items-center text-sm text-dark">
            <i class="fas fa-share-square mr-3"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-if="newTweet" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${newTweet.src}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{newTweet.name}} </p>
            <p class="text-sm text-dark ml-2"> {{newTweet.handle}} </p>
            <p class="text-sm text-dark ml-2"> {{newTweet.time}} </p>
            <i class="fa fa-ellipsis-h text-dark ml-auto"></i>
          </div>
          <p class="py-2"> {{ newTweet.content }} </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p> {{newTweet.comments}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{newTweet.retweets}} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p> {{newTweet.like}} </p>
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