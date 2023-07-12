<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
import TimeLine from '../components/TimeLine.vue'
import Trendings from '../components/Trendings.vue'
</script>

<template>
  <div id="home" class="flex container h-screen w-full">
    <SideNav />
    <TimeLine />
    <Trendings />
  </div>
</template>