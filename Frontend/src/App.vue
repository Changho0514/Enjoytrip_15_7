<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import TheFooterNavbar from "@/components/layout/TheFooterNavbar.vue"
</script>

<template>
  <div>
    <TheHeadingNavbar></TheHeadingNavbar>
    <router-view></router-view>
    <TheFooterNavbar></TheFooterNavbar>
  </div>
</template>

<style scoped></style>
