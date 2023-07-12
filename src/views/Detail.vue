<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
import TweetDetail from '../components/TweetDetail.vue'
import Trendings from '../components/Trendings.vue'
</script>

<template>
  <div id="detail" class="flex container h-screen w-full">
    <SideNav />
    <TweetDetail />
    <Trendings />
  </div>
</template>