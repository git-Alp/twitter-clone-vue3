<script setup lang="ts">
import { ref } from 'vue'

const pseudoData = ref({
  trending: [
    {top: 'Trending in Turkey', title: '#Deprem', bottom: '13.2K Tweets'},
    {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
    {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
    {top: 'Trending in US', title: 'Denim Day', bottom: '40k tweets'},
    {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets'},
  ],
  friends: [
    {src: '/img/elon.jpg', name: 'Elon Musk', handle: '@teslaBoy'},
    {src: '/img/kevin.jpg', name: 'Kevin Hart', handle: '@miniRock'},
    {src: '/img/polat.jpeg', name: 'Polat Alemdar', handle: '@pusu'}
  ]
});

</script>
<template>
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
</template>