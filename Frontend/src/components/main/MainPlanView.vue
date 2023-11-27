<script setup>
import MainPlanExampl1 from "@/components/main/MainPlanExampl1.vue";
import MainPlanExampl2 from "@/components/main/MainPlanExampl2.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const goAttraction = () => {
  router.push({ name: "attraction" });
};
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <div class="container my-5" id="planview">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-12 p-3 p-lg-5 pt-lg-3">
        <h1
          class="display-4 fw-bold lh-1 text-body-emphasis text-middle"
          style="margin-top: 20px; margin-bottom: 30px"
        >
          여행 계획
        </h1>
        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card">
                  <div class="card-bg" style="background-image: url('src/assets/kyungpo.png')">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style="color: #fdf5e6">
                      강릉 여행
                    </h3>
                  </div>

                  <div class="card-body">
                    <MainPlanExampl2 />
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card">
                  <div class="card-bg" style="background-image: url('src/assets/gwangju.png')">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style="color: #fdf5e6">
                      추석 광주 여행
                    </h3>
                    <div class="innerInfo"></div>
                  </div>
                  <div class="card-body">
                    <MainPlanExampl1 />
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card" @click="goAttraction">
                  <div class="card-body2">
                    <div class="svg-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        opacity="0.40"
                        color="black"
                        fill="currentColor"
                        class="bi bi-patch-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
                        />
                        <path
                          d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
img {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}
.card-body {
  width: 250px;
  height: auto;
}
.card-body2 {
  width: 373px;
  height: 650px;
}

.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 215px;
  margin-left: 0px;
  /* SVG와 텍스트 사이의 간격을 조절할 수 있습니다. 필요에 따라 조정해주세요. */
}

.text-body-secondary {
  align-items: right-section;
}
.bi-patch-plus {
  width: 100px;
  height: 100px;
}

.card-bg {
  background-size: cover; /* 배경 이미지를 컨테이너에 맞게 조절합니다. */
  background-position: center; /* 배경 이미지를 가운데 정렬합니다. */
  height: 300px; /* 원하는 높이로 조절합니다. */
  margin: 0;
}

h3 {
  margin-left: 10px;
  color: white;
  text-shadow: -0.5px -0.5px 0 (64, 64, 64), 0.5px -0.5px 0 (64, 64, 64),
    -0.5px 0.5px 0 (64, 64, 64), 0.5px 0.5px 0 (64, 64, 64);
}
.card-bg h3 {
  position: absolute;
  bottom: 20px;
  left: 10px;
}
.card-bg {
  position: relative;
}

.svg-container {
  position: relative;
  cursor: pointer;
}

.svg-container:hover svg {
  border: 2px;
}

.col:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
