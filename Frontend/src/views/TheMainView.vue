<script setup>
import WeatherView from "@/components/main/WeatherView.vue";
import CarouselView from "@/components/main/CarouselView.vue";
import MainTabView from "@/components/main/MainTabView.vue";
import WeatherDetailView from "@/components/main/WeatherDetailView.vue";
import MainRecommendView from "@/components/main/MainRecommendView.vue";
import MainAccompanyView from "@/components/main/MainAccompanyView.vue";
import MainPlanView from "@/components/main/MainPlanView.vue";
import MainHotPlaceView from "@/components/main/MainHotPlaceView.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";
const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <CarouselView />
  <div class="container">
    <div style="margin-top: 75px"></div>
    <WeatherView />
    <WeatherDetailView />
    <div style="margin-top: 100px; margin-bottom: 100px"></div>
    <MainTabView />
    <div style="margin-top: 100px"></div>
    <MainRecommendView />
    <div style="margin-top: 100px"></div>
    <MainAccompanyView />
    <div style="margin-top: 100px"></div>
    <MainPlanView />
    <div style="margin-top: 100px"></div>
    <MainHotPlaceView :scrollY="scrollY" />
  </div>
</template>

<style>
.layout-container {
  display: flex;
}

.left-section {
  flex: 1;
}

.right-section {
  flex: 9;
  padding: 20px;
}
.inner-section {
  flex: 4;
}
.inner-padding {
  flex: 10;
  margin-right: 20px;
  padding-right: 20px;
}
div {
  margin: 0;
}

@keyframes slide {
  from {
    left: -100px;
    opacity: 0;
  }
  to {
    left: 400px;
    opacity: 1;
  }
}

@keyframes disappear {
  /* Add your 'disappear' animation styles here */
}
</style>
