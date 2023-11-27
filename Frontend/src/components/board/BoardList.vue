<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";

import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

const router = useRouter();

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "article_no" },
  { text: "제목", value: "subject" },
  { text: "작성자아이디", value: "user_id" },
]);

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  getArticleList();
});

// VSelect emit 함수
const changeKey = (val) => {
  console.log("BoardList에서 선택한 조건 : " + val);
  param.value.key = val;
};

// 글 목록 가져오기
const getArticleList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listArticle(
    param.value,
    ({ data }) => {
      console.log("then => ", data);
      articles.value = data.articles;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

// PageNavigation
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};

// 글쓰기 버튼을 누르면 실행되는 함수
const moveWrite = () => {
  router.push({ name: "article-write" });
};
</script>

<template>
  <div style="margin-left: 200px; margin-top: 50px; margin-bottom: 50px">
    <div class="row">
      <h2 style="font-weight: bolder; color: #389561; margin-bottom: 25px">
        <i class="bi bi-people-fill"></i> 동행 게시판
      </h2>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start" style="margin-bottom: 10px">
            <v-btn variant="tonal" style="color: #4ca975" @click="moveWrite">글쓰기</v-btn>
          </div>
          <div class="col-md-5 offset-5">
            <form class="d-flex">
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="param.word"
                  placeholder="검색어..."
                />
                &nbsp;
                <v-btn variant="tonal" style="color: #4ca975" @click="getArticleList">검색</v-btn>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">댓글수</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody class="text-center" v-for="(article, index) in articles" :key="article.articleNo">
            <tr :class="{ 'table-bg': article.isnotice === 1 }">
              <td scope="row">{{ article.articleNo }}</td>
              <th class="text-center">
                <router-link
                  :to="{
                    name: 'article-view',
                    params: { articleno: article.articleNo },
                  }"
                  class="article-title link-dark"
                >
                  {{ article.subject }}
                </router-link>
              </th>
              <td>{{ article.userId }}</td>
              <td>{{ article.hit }}</td>
              <td>{{ article.comment }}</td>
              <td>{{ article.date.substr(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<!-- <BoardListItem
v-for="(article, index) in articles"
:key="article.articleNo"
:article="article"
></BoardListItem> -->

<style scoped>
a {
  text-decoration: none;
}
thead th {
  padding: 10px;
  background-color: #74d19d;
}
.table-bg {
  --bs-table-bg: #f2f2f2;
}
.table-bg td,
.table-bg th a {
  color: #ff6a89 !important;
  font-weight: bold;
}
</style>
