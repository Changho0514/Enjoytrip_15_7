<script setup></script>

<template>
  <div
    class="container my-5"
    id="recommandview"
    style="font-family: 'Pretendard-Regular', sans-serif"
  >
    <div
      class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg"
    >
      <div class="col-lg-12 p-3 p-lg-5 pt-lg-3">
        <h1
          class="display-4 fw-bold lh-1 text-body-emphasis"
          style="margin-top: 20px; margin-bottom: 50px"
        >
          이 달의 추천 여행지
        </h1>
        <div class="flex-container">
          <div
            class="flex-item content h-100 p-5 bg-body-tertiary border rounded-3"
          >
            <h2><b>설악산 국립공원</b></h2>
            <p>
              11월에는 단풍이 아직 남아 있는 지역에서 아름다운 풍경을
              감상하세요!
            </p>
            <img
              class="rounded-lg-3"
              src="src/assets/설악산국립공원.png"
              alt=""
              width="100%"
            />
            <button class="btn btn-outline-secondary" type="button">
              자세히 보기
            </button>
          </div>

          <div
            class="flex-item content h-100 p-5 bg-body-tertiary border rounded-3"
          >
            <h2><b>상주 은모래 비치</b></h2>
            <p>낭만적인 풍경을 원한다면 남해의 해안 선상 따라 다녀볼까요?</p>
            <img
              class="rounded-lg-3"
              src="src/assets/상주은모래.png"
              alt=""
              width="100%"
            />
            <button class="btn btn-outline-secondary" type="button">
              자세히 보기
            </button>
          </div>

          <div
            class="flex-item content h-100 p-5 bg-body-tertiary border rounded-3"
          >
            <h2><b>전주 한옥마을</b></h2>
            <p>
              전주의 한옥마을에서 전통 음식과 문화를 즐기면서 한국의 전통을
              체험해보는건 어떠세요?
            </p>
            <img
              class="rounded-lg-3"
              src="src/assets/전주한옥마을.png"
              alt=""
              width="100%"
            />
            <button class="btn btn-outline-secondary" type="button">
              자세히 보기
            </button>
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
.flex-container {
  display: flex;
}

.flex-item {
  flex: 1;
  margin-right: 10px; /* 각 div 사이의 간격을 조절할 수 있습니다. */
}

.flex-item:hover {
  padding: 50px;
  border: 4px;
  flex: 2;
  transition: 1s;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

img {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
}

.btn-outline-secondary {
  margin-top: 10px;
}
</style>
