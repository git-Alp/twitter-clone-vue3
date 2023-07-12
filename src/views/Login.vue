<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user';
import data from '../data.json'

const trendingData = ref(data)
const userStore = useUserStore();
</script>

<template>
<div id="login" class='flex flex-col h-screen w-full overflow-y-scroll'>
  <div class='flex flex-col-reverse lg:flex-row w-full lg:h-[93%] min-h-[700px] overflow-hidden'>
    <div class="flex items-center justify-center w-full min-h-[220px] bg-[url('@/../public/img/twitter-banner.webp')] bg-cover">
      <i class='flex items-center justify-center w-full max-h-96'>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="max-h-96"><path fill="#FFF" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>
      </i>
    </div>
    <div class="flex w-full items-center justify-center">
      <div class='flex flex-col w-96 items-start justify-start gap-6 p-8 lg:justify-center lg:w-[640px]'>
        <i class='mb-0 lg:mb-10'>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="50" height="50"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>
        </i>
        <div class='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1 class='text-3xl lg:text-6xl font-extrabold tracking-wide scale-y-90'>Happening now</h1>
          <h2 class='text-xl lg:block lg:text-3xl font-extrabold tracking-wide scale-y-90'>
            Join Twitter today.
          </h2>
        </div>
        <div class='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div class='grid gap-3'>
            <button
              class='flex justify-center items-center gap-2 border border-lighter text-light-primary transition
                    hover:bg-lighter focus-visible:bg-lighter active:bg-silver rounded-full'
              @click='userStore.login'
            >
              <div class="w-4 h-4">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> 
              </div>
              <div>
                Sign up with Google
              </div>
            </button>
            <button
              class='flex flex-row items-center cursor-not-allowed justify-center gap-2 border border-lighter font-bold 
                    transition hover:bg-lighter focus-visible:bg-lighter active:bg-silver rounded-full'
            >

              <div class="w-5 h-5">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-z80fyv r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03" style="color: rgb(15, 20, 25);"><g><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path></g></svg>
              </div>
              <div>
                Sign up with Apple
              </div>
            </button>
            <div class='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
              <div class='border-b border-silver'></div>
              <p>or</p>
              <div class='border-b border-silver'></div>
            </div>
            <button
              class='cursor-not-allowed bg-blue text-white transition hover:brightness-90
                    focus-visible:!ring-blue/80 focus-visible:brightness-90 active:brightness-75 font-bold rounded-full'
            >
              Create account
            </button>
            <p class='inner:custom-underline inner:custom-underline text-xs text-light-secondary inner:text-blue dark:text-dark-secondary'
            >
              By signing up, you agree to the
              <a
                href='https://twitter.com/tos'
                target='_blank'
                rel='noreferrer'
                class="text-blue"
              >
                Terms of Service
              </a>
              and
              <a
                href='https://twitter.com/privacy'
                target='_blank'
                rel='noreferrer'
                class="text-blue"
              >
                Privacy Policy
              </a>
              , including
              <a
                href='https://help.twitter.com/rules-and-policies/twitter-cookies'
                target='_blank'
                rel='noreferrer'
                class="text-blue"
              >
                Cookie Use
              </a>
              .
            </p>
          </div>
          <div class='flex flex-col gap-3 mt-4'>
            <p class='font-bold'>Already have an account? </p>
            <button
              class='rounded-full border border-lighter font-bold text-blue hover:bg-blue/10
                    focus-visible:bg-blue/10 focus-visible:!ring-blue/80 active:bg-blue/20'
              @click='userStore.login'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class='flex justify-center p-4 text-sm text-light-secondary dark:text-dark-secondary lg:h-[7%]'>
    <nav class='flex flex-wrap justify-center gap-4 gap-y-2'>
      <a v-for="(item, index) in trendingData.footer" :key="index" :href="item.url" class="text-sm text-left text-dark m-1 mt-0 hover:underline"> 
            {{item.title}} 
            <i v-if="item.icon" :class="`${ item.icon }`"></i>
          </a>
    </nav>
  </footer>
</div>
</template>