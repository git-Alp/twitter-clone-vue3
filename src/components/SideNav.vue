<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue'
import data from '../data.json'
import { useUserStore, User } from '../stores/user'
import { RouterLink } from 'vue-router'

const navData = ref(data)
const userStore = useUserStore();
let userInfo = reactive({} as User);

onBeforeMount(() => userInfo = userStore.user)
</script>

<template>
  <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 hidden sm:flex flex-col justify-between">
    <div>
      <RouterLink to="/home" class="h-12 w-12 ml-2 hover:bg-lightblue text-3xl rounded-full text-blue">
        <i class="fab fa-twitter"></i>
      </RouterLink>
      <div>
        <div v-for="tab in navData.tabs" @click="navData.id = tab.id" :class="`focus:outline-none flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ navData.id === tab.id ? 'font-semibold' : ''}`">
          <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
          <RouterLink :to="tab.url" class="text-lg text-left hidden lg:block"> {{ tab.title }} </RouterLink>
        </div>
      </div>
      <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
        <p class="hidden lg:block">Tweet</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </div>
    <div class="lg:w-full relative">
      <button @click="navData.dropdown = true" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
        <img :src="userInfo.photo" class="w-10 h-10 rounded-full border border-lighter" />
        <div class="hidden lg:block mx-2 text-start w-20 xl:w-24 xl:mx-4">
          <p class="text-sm font-bold leading-tight truncate"> {{userInfo.username}} </p>
          <p class="text-sm leading-tight truncate"> {{userInfo.email}} </p>
        </div>
        <i class="hidden lg:block fa fa-ellipsis-h ml-auto text-lg"></i>
      </button>
      <div v-if="navData.dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
        <button @click="navData.dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest focus:outline-none">
          <img :src="userInfo.photo" class="w-10 h-10 rounded-full border border-lighter" />
          <div class="ml-4">
            <p class="text-sm font-bold leading-tight"> {{userInfo.username}} </p>
            <p class="text-sm leading-tight"> {{userInfo.email}} </p>
          </div>
          <i class="fas fa-check ml-auto test-blue"></i>
        </button>
        <button @click="navData.dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
          Add an existing account
        </button>
        <button @click="userStore.logout" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
          Log out {{userInfo.email}}
        </button>
      </div>
    </div>
  </div>
</template>