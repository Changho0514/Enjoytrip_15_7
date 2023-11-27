<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, getModifyArticle, modifyArticle } from "@/api/board";
import BKakaoMap from "./BKakaoMap.vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

// 글 하나에 대한 객체
const article = ref({
  articleNo: 0,
  comment: 0,
  content: "",
  date: "",
  hit: 0,
  isnotice: 0,
  recommendation: 0,
  subject: "",
  userId: userInfo.value.userId,
  latitude: "",
  longitude: "",
});

// modify일때 form에 글에 대한 정보를 미리 뿌려두기 위해 글을 가져옴
if (props.type === "modify") {
  let { articleno } = route.params;
  console.log(articleno + "번글 얻어와서 수정할거야");
  getModifyArticle(
    articleno,
    ({ data }) => {
      article.value = data;
      isUseId.value = true;
    },
    (error) => {
      console.log(error);
    }
  );
  isUseId.value = true;
}

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.subject,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 100) {
      subjectErrMsg.value = "제목을 확인해 주세요!!!";
    } else subjectErrMsg.value = "";
  },
  { immediate: true }
);
watch(
  () => article.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 10000) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

// 등록하기 버튼을 누를 때 에러발생여부와 글쓰기, 글수정에 따라 다르게 실행
function onSubmit() {
  // event.preventDefault();

  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

// 글쓰기모드 일 때
function writeArticle() {
  console.log("글등록하자!!", article.value);
  registArticle(
    article.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

// 글수정모드 일 때
function updateArticle() {
  console.log(article.value.articleNo + "번글 수정하자!!", article.value);
  modifyArticle(
    article.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      alert(msg);
      moveArticle();
    },
    (error) => console.log(error)
  );
}

// 글목록 버튼
function moveList() {
  router.push({ name: "article-list" });
}

// 해당 글에 detail로 이동
function moveArticle() {
  router.push({
    name: "article-view",
    param: { articleno: article.articleNo },
  });
}

// 카카오 지도를 위해 위도, 경도를 가져옴
const sendPosition = (lat, lng) => {
  console.log("위치가 부모로 잘 왔니?");
  article.value.latitude = lat;
  article.value.longitude = lng;
};
</script>

<template>
  <div class="row">
    <div class="col-6">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="userid" class="form-label">작성자 ID : </label>
          <input
            type="text"
            class="form-control"
            v-model="article.userId"
            :disabled="isUseId"
            placeholder="작성자ID..."
            readonly
          />
        </div>
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input type="text" class="form-control" v-model="article.subject" placeholder="제목..." />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <textarea class="form-control" v-model="article.content" rows="10"></textarea>
        </div>
        <div class="col-auto text-center mb-3">
          <v-btn v-if="type === 'regist'" type="submit" variant="tonal" style="color: #5ad18f"
            >글작성</v-btn
          >
          <v-btn v-else variant="tonal" type="submit" style="color: #5ad18f">글수정</v-btn>
          &nbsp;
          <v-btn variant="tonal" @click="moveList" style="color: #96a5ff">글목록</v-btn>
        </div>
      </form>
    </div>
    <div class="col-6">
      <BKakaoMap @sendPosition="sendPosition" :article="article" />
    </div>
  </div>
</template>

<style scoped></style>
