<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listHotplace, changeRecommend, getMyRecommend } from "@/api/hotplace.js";
import VSelect from "@/components/common/VSelect.vue";
import HotplaceListItem from "@/components/hotplace/HotplaceListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
const router = useRouter();

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const hotplaces = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

const selectOption = ref([
  { text: "검색어", value: "" },
  { text: "제목", value: "title" },
  { text: "작성자", value: "user_id" },
  { text: "주소", value: "address" },
]);

// VSelect emit 함수
const changeKey = (val) => {
  console.log("HotPlaceList에서 선택한 조건 : " + val);
  param.value.key = val;
};

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

const urls = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/upload/${saveFolder}/${saveFile}`;

onMounted(() => {
  getHotplaceList();
  getLikelist();
});

// 핫플레이스List가져오기
const getHotplaceList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listHotplace(
    param.value,
    ({ data }) => {
      console.log("then => ", data.hotplaces);
      hotplaces.value = data.hotplaces;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

// Page Navigation에서 사용하는 함수이므로 현재는 사용X
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getHotplaceList();
};

// 글쓰기 버튼을 누르면 실행되는 함수
const moveWrite = () => {
  console.log("글쓰기 버튼 눌렀니?");
  router.push({ name: "hotplace-write" });
};

// 좋아요를 누르면 함수를 실행한다
const recommend = (index) => {
  changeRecommend(
    index,
    userInfo.value.userId,
    (response) => {
      if (response.status == 200) {
        getLikelist();
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

// 유저가 좋아요를 누른 list를 가져온다
const likeList = ref([]);
const getLikelist = () => {
  getMyRecommend(
    userInfo.value.userId,
    ({ data }) => {
      console.log("then => ", data);
      likeList.value = data;
      getHotplaceList();
    },
    (error) => {
      console.log(error);
    }
  );
};

// 유저의 좋아요 상태에 따라 icon의 상태를 표시한다
const getIcon = (hotplaceNo) => {
  console.log("getIcon");
  return likeList.value.includes(hotplaceNo) ? "mdi mdi-heart" : "mdi mdi-heart-outline";
};
</script>

<template>
  <div style="margin-bottom: 50px">
    <div class="col">
      <div class="row align-self-center mb-2">
        <div class="col-md-2 text-start" style="margin-top: 20px; margin-bottom: 20px">
          <v-btn variant="tonal" @click="moveWrite" color="#0A82FF">핫플 등록</v-btn>
        </div>
        <div class="col-md-5 offset-5">
          <form class="d-flex" style="margin-top: 20px; margin-left: 150px">
            <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
            <div class="input-group input-group-sm">
              <input
                type="text"
                class="form-control"
                v-model="param.word"
                placeholder="검색어..."
              />
              &nbsp;
              <v-btn variant="tonal" style="color: #0a82ff" @click="getHotplaceList">검색</v-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="(hotplace, index) in hotplaces" :key="hotplace.hotplaceNo" class="col-md-4 mb-5">
        <div class="bg-grey-lighten" style="position: relative">
          <img
            :src="urls(hotplace)"
            class="img-fluid"
            style="width: 420px; aspect-ratio: 1; object-fit: cover"
            id="img"
            height="100px"
            @click="recommend(hotplace.hotplaceNo)"
          />
          <div style="position: absolute; top: 7.5%; left: 78%; color: white">
            <h4>
              <b>{{ hotplace.recommendation }}</b>
            </h4>
          </div>
          <div style="position: absolute; top: 5%; left: 85%">
            <span
              :class="getIcon(hotplace.hotplaceNo)"
              style="font-size: 30px; color: #ff5a5a"
            ></span>
          </div>
          <h3
            class="font-weight-bold text-center pt-3"
            style="color: white; position: absolute; top: 20%; left: 50% transform: translate(-10%, -50%); font-family: 'Pretendard-Regular';"
          >
            {{ hotplace.title }}
          </h3>
          <h6
            style="color: #78EAFF; position: absolute; top: 60%; left: 50% transform: translate(-10%, -50%); font-family: 'Pretendard-Regular';"
          >
            &nbsp;{{ hotplace.content }}
          </h6>
          <h6
            style="color: #AADBFF; position: absolute; top: 70%; left: 50% transform: translate(-30%, -50%); font-family: 'Pretendard-Regular';"
          >
            &nbsp;{{ hotplace.address }}
          </h6>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container" style="margin-top: 35px; margin-bottom: 100px">
    <div class="row">
      <h3 style="font-weight: bolder">어디가 핫플이니~~?</h3>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <v-btn variant="tonal" @click="moveWrite">핫플 작성</v-btn>
          </div>
        </div>
        <HotplaceListItem
          v-for="hotplace in hotplaces"
          :key="hotplace.hotplaceNo"
          :hotplace="hotplace"
        ></HotplaceListItem>
      </div>
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div> -->
</template>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
#img {
  filter: brightness(0.8);
  border-radius: 15%;
}
#img:hover {
  filter: brightness(1);
  transform: scale(1.05);
  transition: 0.7s;
  border-radius: 0%;
}
</style>
