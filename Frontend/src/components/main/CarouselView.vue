<script setup>
import { ref } from "vue";
const iconList = ref([
  "bi-airplane-engines",
  "bi-chat-right-heart",
  "bi-bus-front",
  "bi-chat-heart-fill",
  "bi-car-front",
]);

const name = "carousel";
const colors = ["indigo", "warning", "pink darken-2", "red lighten-1", "deep-purple accent-4"];
const backgrounds = ["rgb(252, 241, 215)", "#D2E1FF", "#D2D2FF", "#c98cc9", "#D7F1FA"];
const title = [
  "봉서사 여행 코스",
  "겨울 바다 낚시 체험",
  "한강에서 남산 전망대까지! ",
  "동궁과 월지",
  "경복궁 야간 관람",
];
const texts = [
  "가을 바람 산들거리는 갈대밭을 지나",
  "선상에서만 느낄 수 있는 쾌감!",
  "야경투어 화려한 도시의 조명과 도로가 어우러져 창 위로 그려지는 별",
  "신라 조경예술의 극치",
  "달 밝은 밤 도심 속 궁궐 야경 이색체험을 통해 우리 궁궐의 역사 문화적 가치와 아름다움을 감상",
];
const imgs = [
  "src/assets/main1.png",
  "src/assets/main2.png",
  "src/assets/main3.png",
  "src/assets/main4.png",
  "src/assets/main5.png",
];
const slides = ["First", "Second", "Third", "Fourth", "Fifth"];
const firstCarouselIndex = ref(0);
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <div>
    <v-carousel v-model="firstCarouselIndex" height="800" :show-arrows="false" hide-delimiters>
      <v-carousel-item v-for="(slide, index) in slides" :key="index">
        <v-sheet :color="backgrounds[firstCarouselIndex]" height="100%">
          <div class="explain-carousel">
            <v-carousel
              class="inner-carousel"
              v-model="firstCarouselIndex"
              :show-arrows="false"
              hide-delimiters
            >
              <v-carousel-item v-for="(slide, index) in slides" :key="index">
                <v-sheet color="transparent" height="30%">
                  <div class="tit_wrap" style="font-family: 'Pretendard-Regular', sans-serif">
                    <!-- <i :class="`bi ${iconList[index]}`" style="font-size: 50px"></i> -->
                    <div>
                      <i :class="`bi ${iconList[index]}`" style="font-size: 50px"></i>
                      <div style="display: inline-block">
                        <p style="margin: 0">&nbsp;&nbsp;지구는 너뿐 아니야,</p>
                        <p style="margin: 0">&nbsp;&nbsp;너와 함께하는 여정</p>
                      </div>
                    </div>
                    <div>
                      <h1>
                        <b>{{ title[index] }}</b>
                      </h1>
                    </div>
                    <h4>
                      {{ texts[index] }}
                    </h4>
                  </div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
          <div class="carousel-child-div">
            <v-carousel
              cycle
              height="719"
              class="inner-carousel"
              v-model="firstCarouselIndex"
              :show-arrows="false"
              hide-delimiter-background
              delimiter-icon="mdi-square"
            >
              <v-carousel-item v-for="(slide, index) in slides" :key="index">
                <img :src="imgs[index]" class="right-aligned-img" />
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style scoped>
.carousel-child-div {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 90%;
}

.right-aligned-img {
  position: absolute;
  right: 10;
  bottom: 10;
  width: 100%;
  height: 110%;
}
.explain-carousel {
  position: absolute;
  left: 10%;
  bottom: 100px;
  margin-left: 50px;
  margin-right: 10px;
  width: 30%;
  height: 40%;
}

@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

/* .v-carousel {
  font-family: "Pretendard-Regular, sans-serif";
} */
/* .main_mo .main_showcase .tit_wrap em {
    padding: 0 8px;
    height: 20px;
    line-height: 22px;
    border-radius: 10px 10px 10px 0;
    font-size: 11px;
  } */
/* div {
  --bs-font-sans-serif: "Pretendard-Regular";
} */
</style>
