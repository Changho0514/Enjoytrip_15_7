<script setup>
import { ref, onMounted, watch } from "vue";
import { getMytripMax, addMytripAll, addMytripInfo } from "@/api/mytrip";
import { getAttration, getOverview } from "@/api/attraction";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const num = ref(0);

// 유저가 작성한 계획의 개수를 가져오는 함수
const getMyNum = () => {
  console.log(userInfo.value.userId, "의 가장 큰 번호");
  getMytripMax(
    userInfo.value.userId,
    ({ data }) => {
      console.log("then => ", data);
      num.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getMyNum();
});

const mytrips = ref([]);
const attractions = ref([]);
const attraction = ref({});

// 카카오지도에서 클릭한 마커에 해당하는 contentId가 부모에 emit되고 props되어 넘어온다
const props = defineProps({
  contentId: Number,
});

// 카카오 지도에서 클릭한 마커가 변하자마자
watch(
  () => props.contentId,
  (newValue, oldValue) => {
    // 여행 계획에 추가
    let mytrip = {};
    mytrip.userMytripNo = num.value + 1;
    mytrip.contentId = props.contentId;
    mytrip.userId = userInfo.value.userId;
    mytrips.value.push(mytrip);
    // contentId에 맞는 관광지 정보 가져오기
    getAttration(
      newValue,
      ({ data }) => {
        // console.log("then => ", data);
        attraction.value = data;
        attractions.value.push(attraction.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }
);

// 초기화 버튼을 누르면 실행되는 함수
const removePlanList = () => {
  mytrips.value = [];
  attractions.value = [];
  info.value = [];
};

// 여행 정보(날짜, 메모)
const info = ref({
  startDay: "",
  endDay: "",
  content: "",
});

// 여행 계획 추가 버튼을 누르면 실행되는 함수
const addPlanList = () => {
  addMytripAll(
    mytrips.value,
    (response) => {
      // console.log("then => ", response);
      let msg = "여행 계획 등록에 문제 발생했습니다.";
      if (response.status == 200) {
        addInfo(); // 여행 정보(날짜, 메모)를 추가
      } else {
        alert(msg);
      }
      getMyNum();
    },
    (error) => {
      console.log(error);
    }
  );
  attractions.value = [];
  mytrips.value = [];
};

// 여행 정보(날짜, 메모)를 추가하는 함수
const addInfo = () => {
  let tripinfo = {};
  tripinfo.userMytripNo = num.value + 1;
  tripinfo.userId = userInfo.value.userId;
  tripinfo.startDay = info.value.startDay;
  tripinfo.endDay = info.value.endDay;
  tripinfo.content = info.value.content;
  addMytripInfo(
    tripinfo,
    (response) => {
      let msg = "여행 계획 등록에 문제 발생했습니다.";
      if (response.status == 200) {
        msg = "여행 계획 등록에 성공했습니다";
      }
      alert(msg);
    },
    (error) => {
      console.log(error);
    }
  );
  info.value = [];
};

// 자세히 버튼을 누르면 실행되는 함수
const overview = ref("");
const showDetail = (target) => {
  // console.log("overview 가지러 갔니?");
  getOverview(
    target,
    ({ data }) => {
      overview.value = data.overview;
    },
    (error) => {
      console.log(error);
    }
  );
};

// 길찾기 버튼을 누르면 실행되는 함수
const goRoad = (lat, lng) => {
  let url = "https://map.kakao.com/link/map/" + lat + "," + lng;
  window.location.href = url;
};
</script>

<template>
  <div class="place">
    <h4 class="title mt-3">
      <b>{{ num + 1 }}번 여행 계획</b>
    </h4>
    <div class="title mb-3">
      <b class="title">원하는 장소를 추가하세요</b>
    </div>
    <div class="mb-3">
      <label for="subject">시작일 : &nbsp&nbsp</label>
      <input type="date" v-model="info.startDay" />
    </div>
    <div class="mb-3">
      <label for="subject">종료일 : &nbsp&nbsp</label>
      <input type="date" v-model="info.endDay" />
    </div>
    <div class="mb-3">
      <label for="content">메모 : </label>
      <textarea class="form-control" v-model="info.content" rows="2"></textarea>
    </div>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <v-btn variant="tonal" @click="addPlanList" style="color: #8282ff">여행 계획 추가</v-btn>
    &nbsp; &nbsp;
    <v-btn variant="tonal" @click="removePlanList" style="color: #8282ff">초기화</v-btn>
    <div
      class="row col-12 mt-2 ms-4 card-table"
      v-for="attraction in attractions"
      :key="attraction.contentId"
    >
      <div
        class="card col-lg-6 mb-2 mx-8"
        style="cursor: pointer; width: 200px; background-color: #fdf5e6"
      >
        <img
          class="card-img-top mt-2 rounded"
          :src="attraction.firstImage"
          onerror="javascript:this.src='./src/assets/no_image.jpg'"
          height="100"
        />
        <div class="card-body">
          <h5 class="card-title">
            <b>{{ attraction.title }}</b>
          </h5>
          <p style="font-size: 13px; color: #a0a0a0">{{ attraction.addr1 }}</p>
          <!-- 관광지 overview-->
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                style="background-color: #a0a0ff; color: white; width: 20px"
                @click="showDetail(attraction.contentId)"
                >자세히</v-btn
              >
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="정보">
                <v-card-text>
                  {{ overview }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          &nbsp;
          <v-btn
            style="background-color: #a0a0ff; color: white; width: 20px"
            @click="goRoad(attraction.latitude, attraction.longitude)"
            >길찾기</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place {
  border: 1px solid #dee2e6 !important;
  padding: 10px;
  background-color: white;
}
.title {
  text-align: center;
  justify-content: center;
}
</style>
