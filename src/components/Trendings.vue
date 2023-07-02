<script setup lang="ts">
import { ref } from 'vue'
import data from '../data.json'

const trendingData = ref(data)
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
      <button v-for="(trend, index) in trendingData.trending" :key="index" class="w-full flex justify-between hover:bg-lighter p-3">
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
      <button v-for="(friend, index) in trendingData.friends" :key="index" class="w-full flex hover:bg-lighter p-3">
        <img :src="`${ friend.src }`" class="w-12 h-12 rounded-full border border-lighter object-cover" />
        <div class="hidden lg:block ml-4 text-start">
          <p class="text-sm font-bold leading-tight"> {{ friend.name }} </p>
          <p class="text-sm leading-tight"> {{ friend.username }} </p>
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
      <div class="flex flex-wrap">
        <a v-for="(item, index) in trendingData.footer" :key="index" :href="item.url" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> 
          {{item.title}} 
          <i v-if="item.icon" :class="`${ item.icon }`"></i>
        </a>
      </div>
      <span class="text-sm text-left text-dark m-1 mt-0">© 2023 X Corp.</span>
    </div>
  </div>
</template>