<script setup>
import VKakaoMap from "@/components/attraction/VKakaoMap.vue";
import { sidoList, gugunList, attractionList } from "@/api/attraction.js";
import { ref, watch } from "vue";
import MytripAttractionView from "@/components/attraction/MytripAttractionView.vue";
import noImage from "@/assets/no_image.jpg";

// 관광지 1개 객체
const attraction = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  title: "",
});
// 관광지 list 객체
const attractions = ref([]);

// 시도선택을 클릭하면 시도를 가져오기
const sido = ref([]);
const getSido = () => {
  console.log("서버에서 시도목록 얻어오자!!!");
  sidoList(
    ({ data }) => {
      // console.log("then => ", data);
      sido.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
// 시도를 클릭하면 그에 해당하는 구군 가져오기
const gugun = ref([]);
watch(
  () => attraction.value.sidoCode,
  (newValue, oldValue) => {
    console.log(`newValue: ${newValue}, oldValue: ${oldValue}`);
    console.log("서버에서 구군목록 얻어오자!!!");
    gugunList(
      newValue,
      ({ data }) => {
        // console.log("then => ", data);
        gugun.value = data;
      },
      (error) => {
        console.log(error);
      }
    );
    attraction.value.gugunCode = 0;
  }
);

// 시도, 구군, 관광지 유형, 검색어의 검색
const searchAttraction = () => {
  console.log("서버에서 관광지목록 얻어오자!!!", attraction.value);
  attractionList(
    attraction.value,
    ({ data }) => {
      console.log("then => ", data);
      attractions.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

// watch(
//   () => attraction.value.gugunCode,
//   (newValue, oldValue) => {
//     searchAttraction();
//   }
// );

// 관광지 유형을 클릭하면 관광지 가져오기
watch(
  () => attraction.value.contentTypeId,
  (newValue, oldValue) => {
    searchAttraction();
  }
);

// card를 클릭하면 해당 위치로 지도를 옮기는 props 객체를 담음
const selectAttraction = ref({}); // 클릭한 지도 객체
const viewAttraction = (attraction) => {
  selectAttraction.value = attraction;
};

// 카카오 지도(자식 컴포넌트)에서 마커를 클릭하면 여행계획(자식 컴포넌트)로 contentId를 보냄
const contentId = ref(0);
const addPlan = function (markercontentId) {
  console.log("마커가 부모로 왔니??", markercontentId);
  contentId.value = markercontentId;
};
</script>

<template>
  <div style="background-color: #fdf5e6; height: 100vh; margin-bottom: 57px">
    <div class="container">
      <div class="row">
        <h3 style="font-weight: bolder; margin-top: 35px">
          대한민국 구석구석
          <i class="bi bi-pin-map-fill"></i>
        </h3>
      </div>
      <div class="row" style="font-weight: normal">
        <h5>어디까지 알고있니?</h5>
      </div>
      <div class="row">
        <div class="col-9">
          <!-- 관광지 검색 start -->
          <form id="form-search" action="" class="d-flex my-3" method="POST" role="search">
            <select
              id="search-area"
              v-model="attraction.sidoCode"
              name="search_area"
              class="form-select me-2"
              @click="getSido"
            >
              <option value="0">시도선택</option>
              <option v-for="si in sido" :key="si.sidoCode" :value="si.sidoCode">
                {{ si.sidoName }}
              </option>
            </select>
            <select
              id="search-sub-area"
              name="search_sub_area"
              class="form-select me-2"
              v-model="attraction.gugunCode"
            >
              <option value="0">구군선택</option>
              <option v-for="gu in gugun" :key="gu.gugunCode" :value="gu.gugunCode">
                {{ gu.gugunName }}
              </option>
            </select>
            <select
              id="search-content-id"
              name="search_content_id"
              class="form-select me-2"
              v-model="attraction.contentTypeId"
            >
              <option value="0">관광지 유형</option>
              <option value="12">관광지</option>
              <option value="14">문화시설</option>
              <option value="15">축제공연행사</option>
              <option value="25">여행코스</option>
              <option value="28">레포츠</option>
              <option value="32">숙박</option>
              <option value="38">쇼핑</option>
              <option value="39">음식점</option>
            </select>
            <input
              id="search-keyword"
              name="search_keyword"
              class="form-control me-2"
              type="search"
              placeholder="검색어"
              aria-label="검색어"
              v-model="attraction.title"
            />
            <v-btn variant="tonal" @click="searchAttraction" style="color: #8282ff">검색</v-btn>
          </form>
          <VKakaoMap
            :attractions="attractions"
            :selectAttraction="selectAttraction"
            @addPlan="addPlan"
          />
          <v-sheet
            class="padding: 0px 100px mx-auto;"
            elevation="1"
            max-width="1000"
            max-height="1000"
            v-if="attractions.length > 0"
          >
            <v-slide-group v-model="model" class="pa-5" selected-class="bg-success">
              <v-slide-group-item
                v-for="n in attractions.length"
                :key="n"
                v-slot="{ isSelected, toggle, selectedClass }"
              >
                <v-card
                  v-for="attraction in attractions"
                  :key="attraction.contentId"
                  class="mr-2 mb-1 mt-1"
                  max-width="200"
                  @click="viewAttraction(attraction)"
                  style="background-color: #fdf5e6"
                >
                  <v-img
                    :src="attraction.firstImage"
                    style="margin: 5px 10px"
                    :alt="noImage"
                    height="100"
                  ></v-img>
                  <v-card-title>{{ attraction.title }}</v-card-title>
                  <v-card-subtitle>{{ attraction.addr1 }}</v-card-subtitle>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </div>
        <div class="col-3">
          <MytripAttractionView :contentId="contentId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
