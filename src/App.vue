<script setup lang="ts">

</script>

<template>
  <div class="app p-4">
    <div class="flex align-content-center w-full justify-content-start gap-3">
      <h1 
        class="nav-btn text-100 font-bold mb-4 text-white-alpha-90 w-max pr-4 cursor-pointer"
        :class="$route.name === 'life-spheres' ? 'bg-black-alpha-90' : 'bg-black-alpha-40'"
        @click="$router.push({ name: 'life-spheres' })"
      >Life Spheres_</h1>
      <h1 
        class="nav-btn text-100 font-bold mb-4 text-white-alpha-90 w-max pr-4 cursor-pointer"
        :class="$route.name === 'mood-tracker' ? 'bg-black-alpha-90' : 'bg-black-alpha-40'"
        @click="$router.push({ name: 'mood-tracker' })"
      >Mood Tracker_</h1>
    </div>
    <RouterView />
  </div>
</template>

<style>
.app {
  position: relative;
  width: 100%;
  background-color: white !important;
}
.nav-btn {
  transition: all 0.4s ease;
}
</style>
