<script setup>
import { ref, onMounted, watch } from "vue";
import {
  getMytripMax,
  getMytrip,
  getMytripInfo,
  deleteMytripAll,
  deleteMytripInfo,
} from "@/api/mytrip";
import { getAttration } from "@/api/attraction";
import PageNavigation from "@/components/common/PageNavigation.vue";
import MKakaoMap from "@/components/mytrip/MKakaoMap.vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const currentPage = ref(1);
const totalPage = ref(1);

// pageNavigation을 위한 함수
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  attractions.value = [];
  // param.value.pgno = val;
  // getArticleList();
};

// 유저가 등록한 여행계획의 개수를 가져옴
const getMyNum = () => {
  console.log("서버에서 유저가 등록한 여행계획 중 가장 큰 번호를 가져오자!!");
  getMytripMax(
    userInfo.value.userId,
    ({ data }) => {
      // console.log("then => ", data);
      totalPage.value = data;
      onPageChange(1);
    },
    (error) => {
      console.log(error);
    }
  );
};

// 번호에 해당하는 계획 가져오기
const mytrips = ref([]);
const getMytripList = () => {
  getMytrip(
    userInfo.value.userId,
    currentPage.value,
    ({ data }) => {
      // console.log(data);
      mytrips.value = data;
      getMytripAttraction(); // 관광지 가져오기
    },
    (error) => {
      console.log(error);
    }
  );
};

// 여행 계획에 대한 정보(날짜, 메모) 가져오기
const info = ref([]);
const getInfo = () => {
  getMytripInfo(
    userInfo.value.userId,
    currentPage.value,
    ({ data }) => {
      info.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

// mytrip에 있는 contentId에 맞는 관광지 가져오기
const attractions = ref([]);
const attraction = ref({});
const getMytripAttraction = () => {
  for (const key in mytrips.value) {
    console.log("mytrip에서 가져온 contentId : ", mytrips.value[key].contentId);
    // contentId에 맞는 관광지 정보 가져오기
    getAttration(
      mytrips.value[key].contentId,
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
};

// 페이지가 뜨자마자 유저가 작성한 계획의 개수를 가져옴
onMounted(() => {
  getMyNum();
});

// 페이지가 이동하면 작동
watch(
  () => currentPage.value,
  async () => {
    await getMytripList(); // 관광지 정보 가져옴
    await getInfo(); // 여행 계획 가져옴
  },
  { immediate: true } // 맨 처음부터
);

// ?번 계획 삭제
const removePlan = () => {
  deleteMytripInfo(userInfo.value.userId, currentPage.value, (response) => {
    console.log(response);
    if (response.status == 200) {
      deleteMytripAll(
        userInfo.value.userId,
        currentPage.value,
        (response) => {
          console.log(response);
          if (response.status == 200) {
            let msg = "계획 삭제에 성공했습니다";
            // alert(msg);
            info.value = [];
            getMyNum();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });
};
</script>

<template>
  <div style="background-color: #fff0f0">
    <div class="container" style="margin-bottom: 50px">
      <div class="row" v-if="attractions.length === 0">
        <h2 style="margin-top: 35px">
          <b style="color: #d7567f">삭제된 일정입니다</b>
        </h2>
      </div>
      <div class="row" v-else>
        <div class="row">
          <h2 style="margin-top: 35px">
            <b style="color: #d7567f"> {{ info.content }}</b>
          </h2>
          <div>
            <i class="bi bi-calendar-check"></i>&nbsp;&nbsp;{{
              info.startDay
            }}
            ~ {{ info.endDay }} 일정입니다
          </div>
        </div>
      </div>
      <v-btn
        variant="tonal"
        @click="removePlan"
        style="color: #d7567f"
        class="mt-6 mb-3"
        v-if="attractions.length != 0"
        >계획 삭제</v-btn
      >
      <MKakaoMap :attractions="attractions" />
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
      <!-- <PageNavigation @pageChange="onPageChange"></PageNavigation> -->
      <div class="row justify-content-center">
        <h1
          class="row justify-content-center"
          style="font-weight: bold; color: #d7567f"
          v-if="attractions.length != 0"
        >
          TimeLine
        </h1>
        <v-timeline>
          <v-timeline-item
            dot-color="purple-lighten-4"
            v-for="attraction in attractions"
            :key="attraction.contentId"
          >
            <v-card>
              <v-card-title class="bg-purple-lighten-5">
                <v-icon
                  size="small"
                  class="me-4"
                  icon="mdi-heart-multiple-outline"
                  style="color: brown"
                ></v-icon>
                <h5 class="font-weight-bold" style="color: #d7567f">
                  {{ attraction.title }}
                </h5>
              </v-card-title>
              <v-img
                :src="attraction.firstImage"
                width="256"
                heigth="256"
                style="margin: auto"
              ></v-img>
              <v-card-text
                ><p class="text-md-center">{{ attraction.addr1 }}</p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
