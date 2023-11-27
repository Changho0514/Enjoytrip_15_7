<script setup>
import { top3 } from "@/api/hotplace";
import { ref, onMounted, watch } from "vue";

onMounted(() => {
  getTop3List();
});

const top3list = ref([]);
const getTop3List = () => {
  top3(
    ({ data }) => {
      console.log("then => ", data);
      top3list.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
const delayShow = (hotplace, index) => {
  setTimeout(() => {
    // 각 핫 플레이스 항목을 보여주는 로직을 추가
    hotplace.show = true;
  }, index * 300); // 0.3초 간격으로 보여주기
};

const showHotplacesSequentially = () => {
  // 각 핫 플레이스 항목을 순차적으로 보여주기 시작
  top3list.value.forEach((hotplace, index) => {
    delayShow(hotplace, index);
  });
};
const unshowHotplacesSequentially = () => {
  // 각 핫 플레이스 항목을 없애기
  top3list.value.forEach((hotplace, index) => {
    delayUnShow(hotplace, index);
  });
};

const delayUnShow = (hotplace, index) => {
  setTimeout(() => {
    // 각 핫 플레이스 항목을 차례로 없애는 로직을 추가
    hotplace.show = false;
  }, index * 300); // 0.3초 간격
};

const props = defineProps(["scrollY"]);

watch(
  () => props.scrollY,
  (newValue) => {
    console.log("hotplace scrollY!", newValue);
    if (newValue > 3000) {
      showHotplacesSequentially();
    }
    if (newValue < 3000) {
      unshowHotplacesSequentially();
    }
  }
);

const urls = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/upload/${saveFolder}/${saveFile}`;
</script>

<template>
  <div class="container px-4 py-5 mb-10 margin-bottom: 50px" id="hotplaceview">
    <h1
      class="pb-2 border-bottom"
      style="font-family: 'Pretendard-Regular, sans-serif'"
    >
      <b>
        핫 플레이스 TOP3
        <span
          class="mdi mdi-heart"
          style="font-size: 45px; color: #ff5a5a"
        ></span
      ></b>
    </h1>

    <div class="row row-cols-lg-3 g-4 py-5">
      <div class="col" v-for="hotplace in top3list" :key="hotplace.hotplaceNo">
        <transition name="slide-fade">
          <div
            v-if="hotplace.show"
            class="col card h-100 text-bg-dark shadow-lg"
            :style="{ 'background-image': `url(${urls(hotplace)})` }"
          >
            <div class="h-100 p-5 pb-3 text-white text-shadow-1">
              <p class="mt-5 display-6 custom-font-size fw-bold">
                {{ hotplace.title }}
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* template {
  font-family: "Pretendard-Regular, sans-serif";
} */

@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
.card {
  /* width: 350px; */
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center;
  padding-top: 40%;
  position: relative;
}

.custom-font-size {
  font-size: 20px;
}
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 1s ease-out;
} */

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-150px);
  opacity: 0;
}
</style>
