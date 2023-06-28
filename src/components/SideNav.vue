<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useDataStore } from '../stores/posts';
import { useMovieStore } from '../stores/movieService';

const dataStore = useDataStore();
const movieStore = useMovieStore();

const pseudoData = ref({
  id: 'home',
  dropdown: false,
  tabs: [
    {icon: 'fas fa-home', title: 'Home', id:'home'},
    {icon: 'fas fa-search', title: 'Explore', id: 'explore'},
    {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
    {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
    {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
    {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
    {icon: 'far fa-user', title: 'Profile', id: 'profile'},
    {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
  ],
  trending: [
    {top: 'Trending in TX', title: 'Gigi', bottom: 'Trending with: Rip Gigi'},
    {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
    {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
    {top: 'Trending in US', title: 'Denim Day', bottom: '40k tweets'},
    {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets'},
  ],
  friends: [
    {src: '/img/elon.jpg', name: 'Elon Musk', handle: '@teslaBoy'},
    {src: '/img/kevin.jpg', name: 'Kevin Hart', handle: '@miniRock'},
    {src: '/img/polat.jpeg', name: 'Polat Alemdar', handle: '@pusu'}
  ],
  tweets: [
    {content: 'It is so nice outside!'}
  ],
  tweet: {content: ''}   
});

const newTweet = reactive({
  src: '/img/avatar.png',
  name: 'Alperen Aslan',
  handle: '@alperen.aslan',
  time: '20 min',
  content: '',
  comments: 1,
  retweets: 2,
  like: 3,
})

function addNewTweet () {
  dataStore.addItem({ ...newTweet})
  console.log("{ ...newTweet}", { ...newTweet});
  newTweet.content = ''
}

onMounted(() => {
  movieStore.getTopRatedMovies()
})
</script>

<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side nav -->
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 ml-2 hover:bg-lightblue text-3xl rounded-full text-blue">
          <i class="fab fa-twitter"></i>
        </button>
        <div>
          <button v-for="tab in pseudoData.tabs" @click="pseudoData.id = tab.id" :class="`focus:outline-none flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ pseudoData.id === tab.id ? 'font-semibold' : ''}`">
            <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
            <p class="text-lg text-left hidden lg:block"> {{ tab.title }} </p>
          </button>
        </div>
        <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
      <div class="lg:w-full relative">
        <button @click="pseudoData.dropdown = true" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
          <img src="/img/avatar.png" class="w-10 h-10 rounded-full border border-lighter" />
          <div class="hidden lg:block mx-2 text-start w-20 xl:w-24 xl:mx-4">
            <p class="text-sm font-bold leading-tight truncate"> Vecihi Hürkuş </p>
            <p class="text-sm leading-tight truncate"> @VecihiBey </p>
          </div>
          <i class="hidden lg:block fa fa-ellipsis-h ml-auto text-lg"></i>
        </button>
        <div v-if="pseudoData.dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
          <button @click="pseudoData.dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest focus:outline-none">
            <img src="/img/avatar.png" class="w-10 h-10 rounded-full border border-lighter" />
            <div class="ml-4">
              <p class="text-sm font-bold leading-tight"> Vecihi Hürkuş </p>
              <p class="text-sm leading-tight"> @VecihiBey </p>
            </div>
            <i class="fas fa-check ml-auto test-blue"></i>
          </button>
          <button @click="pseudoData.dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
            Add an existing account
          </button>
          <button @click="pseudoData.dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
            Log out @VecihiBey
          </button>
        </div>
      </div>
    </div>
    <!-- tweets -->
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Home</h1>
      </div>
      <div class="px-5 py-3 border-b border-lighter flex">
        <div class="flex-none">
          <img src="/img/avatar.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
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
        <div v-for="tweet in dataStore.items" class="w-full p-4 border-b hover:bg-lighter flex">
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
      <div v-for="item in movieStore.movies" class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`" class="h-12 w-12 rounded-full flex-none"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold"> {{ item.title}} </p>
            <p class="text-sm text-dark ml-2"> {{ item.user }} </p>
            <p class="text-sm text-dark ml-2"> {{ item.release_date }} </p>
            <i class="fa fa-ellipsis-h text-dark ml-auto"></i>
          </div>
          <p class="py-2">
            {{ item.overview }}
          </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p> {{ item.popularity }} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p> {{ item.vote_average }} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p> {{ item.vote_count }} </p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- trending -->
    <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
      <input class="p-2 pl-12 rounded-full w-full  bg-lighter text-sm mb-4" placeholder="Search Twitter" />
      <i class="fas fa-search absolute left-0 top-0 mt-4 ml-10 text-sm text-light"></i>
      <div class="w-full rounded-lg bg-lightest my-4 flex flex-col p-3">
        <p class="text-lg font-bold">Get Verified</p>
        <p class="font-semibold text-sm leading-tight my-2"> Subscribe to unlock new features </p>
        <button class="mr-auto text-sm text-white bg-black py-1 px-4 rounded-full border-2 border-black font-semibold">
          Get Verified
        </button>
      </div>
      <div class="w-full rounded-lg bg-lightest my-4">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
        </div>
        <button v-for="trend in pseudoData.trending" class="w-full flex justify-between hover:bg-lighter p-3">
          <div>
            <p class="text-xs text-left leading-tight text-dark"> {{ trend.top}} </p>
            <p class="font-semibold text-sm text-left leading-tight"> {{ trend.title}} </p>
            <p class="text-left text-sm leading-tight text-dark"> {{ trend.bottom}} </p>
          </div>
          <i class="fa fa-ellipsis-h text-lg text-dark"></i>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue">
          Show more
        </button>
      </div>
      <div class="w-full rounded-lg bg-lightest my-4">
        <div class=" p-3">
          <p class="text-lg font-bold">Who to Follow</p>
        </div>
        <button v-for="friend in pseudoData.friends" class="w-full flex hover:bg-lighter p-3">
          <img :src="`${ friend.src }`" class="w-12 h-12 rounded-full border border-lighter object-cover" />
          <div class="hidden lg:block ml-4 text-start">
            <p class="text-sm font-bold leading-tight"> {{ friend.name }} </p>
            <p class="text-sm leading-tight"> {{ friend.handle }} </p>
          </div>
          <button class="ml-auto text-sm text-white bg-black py-1 px-4 rounded-full border-2 border-black font-semibold">
            Follow
          </button>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue">
          Show more
        </button>
      </div>
      <div class="w-full rounded-lg my-4 px-2">
        <div flex flex-wrap>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Terms of Service </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Privacy Policy </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Cookie Policy </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Imprint </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Accessibility </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> Ads info </a>
          <a href="#" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> 
            More 
            <i class="fas fa-ellipsis-h"></i>
          </a>
        </div>
        <span class="text-sm text-left text-dark m-1 mt-0">© 2023 X Corp.</span>
      </div>
    </div>
  </div>
</template>../stores/posts