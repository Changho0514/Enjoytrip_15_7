<script setup>
const handleHotPlaceClick = () => {
  // 요소를 찾아서 해당 요소로 스크롤 이동
  const hotPlaceView = document.getElementById("hotplaceview");

  if (hotPlaceView) {
    // 클릭 시 즉시 이동
    hotPlaceView.scrollIntoView();

    // 0.8초 후에 한 번 더 이동
    setTimeout(() => {
      hotPlaceView.scrollIntoView();
    }, 800);
  }
};
</script>

<template>
  <section id="featured-services" class="featured-services">
    <div class="container">
      <div class="row gy-4">
        <!-- 이 달의 추천 여행지 -->
        <div class="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi-geo-fill"></i></div>
            <h4>
              <a href="#recommandview" class="stretched-link"
                >이 달의 추천 여행지</a
              >
            </h4>
            <p>여행은 가고 싶은데 어디로 가야할지 모르겠나요?</p>
            <p><b>EnjoyTrip</b>이 추천하는 이 달의 여행지로 떠나보세요</p>
          </div>
        </div>
        <!-- End Service Item -->

        <!-- 테마 별 추천 여행지 -->
        <div
          class="col-xl-3 col-md-3 d-flex"
          data-aos="zoom-out"
          data-aos-delay="200"
        >
          <div class="service-item position-relative">
            <div class="icon"><i class="bi-phone-vibrate-fill"></i></div>
            <h4>
              <a href="#accompanyview" class="stretched-link">동행 구하기</a>
            </h4>

            <p>혼자 떠나는 여행은 심심하신가요?</p>
            <p>맛집이 2인이상부터라구요?</p>
            <p>동행을 구해보세요!</p>
          </div>
        </div>
        <!-- End Service Item -->

        <!-- 여행 계획 짜기 -->
        <div class="col-md-3 d-flex" data-aos="zoom-out" data-aos-delay="400">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi-calendar2-week"></i></div>
            <h4>
              <a href="#planview" class="stretched-link"> 여행 계획</a>
            </h4>
            <p>여행 계획을 기획 중이신가요?</p>
            <p>본인만의 여행 계획을 짜고, 공유해보세요</p>
          </div>
        </div>
        <!-- End Service Item -->

        <!-- 핫 플레이스 공유 -->
        <div class="col-md-3 d-flex" data-aos="zoom-out" data-aos-delay="600">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi-star-fill"></i>></div>
            <h4>
              <a
                href="#hotplaceview"
                class="stretched-link"
                @click="handleHotPlaceClick"
                >핫 플레이스 공유</a
              >
            </h4>
            <p>지금 떠오르는 핫 플레이스는?</p>
            <p><b>EnjoyTrip</b>에서 확인해보세요</p>
          </div>
        </div>
        <!-- End Service Item -->
      </div>
    </div>
  </section>
</template>

<style>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
.featured-services .service-item {
  padding: 30px;
  transition: all ease-in-out 0.4s;
  background: var(--color-white);
  height: 100%;
  width: 100%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}
.featured-services .service-item .icon {
  margin-bottom: 10px;
  color: var(--color-primary);
  font-size: 36px;
  transition: 0.3s;
}
.featured-services .service-item h4 {
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 24px;
}
.featured-services .service-item h4 a {
  color: var(--color-secondary);
  transition: ease-in-out 0.3s;
}
.featured-services .service-item p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}
.featured-services .service-item:hover {
  transform: translateY(-10px);
  /* box-shadow: 0px 20px 60px 5px rgba(var(--color-secondary-rgb), 0.2); */
  /* box-shadow: 0px 10px 35px rgba(0, 0, 0, 0.5); */
  border: 1px solid (0, 0, 0, 0.5);
}
.featured-services .service-item::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0px 10px 35px rgba(0, 0, 0, 0.3);

  opacity: 0;
  transition: ease-in-out 0.5s;
}
.featured-services .service-item:hover::after {
  opacity: 1;
}
.featured-services .service-item:hover h4 a {
  color: var(--color-primary);
}

.stretched-link {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
