<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle, checkWriteUser } from "@/api/board";
import { writeComment, listComment, deleteComment, checkCommentWriteUser } from "@/api/comment";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import BKakaoMap from "./item/BKakaoMap.vue";
import { adminGetUser } from "@/api/user";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});

onMounted(() => {
  getArticle();
});

// 글쓴이에 대한 정보를 가져옴
const user = ref({});
const getUserInfo = (userId) => {
  adminGetUser(
    userId,
    ({ data }) => {
      console.log("프로필 -> ", data);
      user.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

// articleno에 대한 글에 대한 정보를 가져옴
const getArticle = () => {
  // const { articleno } = route.params;
  console.log(articleno + "번글 얻으러 가자!!!");
  detailArticle(
    articleno,
    ({ data }) => {
      article.value = data;
      getUserInfo(article.value.userId);
      getComment();
    },
    (error) => {
      console.log(error);
    }
  );
};

// articleno에 대한 댓글 list를 가져옴
const comments = ref([]);
const getComment = () => {
  listComment(
    articleno,
    ({ data }) => {
      // console.log("comment ", data);
      comments.value = data;
      comment.value.content = "";
    },
    (error) => {
      console.log(error);
    }
  );
};

// 글목록 버튼
function moveList() {
  router.push({ name: "article-list" });
}

// 글수정 버튼
function moveModify() {
  router.push({ name: "article-modify", params: { articleno } });
}

// 글삭제 버튼을 눌렀을 때 실행되는 함수
function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + "번글 삭제하러 가자!!!");
  let msg = "작성자가 아닙니다";
  checkWriteUser(
    articleno,
    ({ data }) => {
      if (data === userInfo.value.userId) {
        deleteArticle(
          articleno,
          (response) => {
            if (response.status == 200) moveList();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        alert(msg);
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

// write comment 객체
const comment = ref({
  articleNo: articleno,
  userId: userInfo.value.userId,
  content: "",
});

// 댓글을 작성했을 때 실행되는 함수
const addComment = () => {
  writeComment(
    comment.value,
    (response) => {
      // console.log(response);
      getArticle();
    },
    (error) => {
      console.log(error);
    }
  );
};

// 댓글을 삭제할 때 실행되는 함수
const delComment = (target) => {
  let msg = "작성자가 아닙니다";
  checkCommentWriteUser(
    target,
    ({ data }) => {
      // console.log("check data :", data);
      if (data === userInfo.value.userId) {
        deleteComment(
          target,
          (response) => {
            // console.log(response);
            getArticle();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        alert(msg);
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

const url = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/profile/${saveFolder}/${saveFile}`;
</script>

<template>
  <div class="container" style="margin-bottom: 70px">
    <div class="row justify-content-center">
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="px-5 mt-10" style="font-weight: bolder">
            {{ article.subject }}
          </h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                :src="url(user)"
                class="avatar me-2 float-md-start bg-light p-2"
                width="60"
                height="60"
                onerror="javascript:this.src='/src/assets/profile.jpg'"
              />
              <p>
                <span class="fw-bold">{{ article.userId }}</span> <br />
                <span class="fw-light">
                  {{ article.date }} &nbsp; 조회 :
                  {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : {{ article.comment }}</div>
          <div class="divider mb-3"></div>
          <div>
            <BKakaoMap :article="article" />
          </div>
          <div class="mt-10">
            <pre style="font-family: 'Pretendard-Regular'">
              {{ article.content }}
            </pre>
          </div>
          <div class="d-flex justify-content-end mb-3">
            <v-btn variant="tonal" @click="moveList" style="color: #96a5ff">글목록</v-btn>
            &nbsp;
            <v-btn variant="tonal" @click="moveModify" style="color: #5ad18f">글수정</v-btn>
            &nbsp;
            <v-btn variant="tonal" @click="onDeleteArticle" style="color: #eb4646">글삭제</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-10 text-start">
        <div class="jb-division-line"></div>
        <v-layout row wrap v-for="comment in comments" :key="comment.commentNo">
          <v-text-field
            :label="comment.userId"
            prepend-inner-icon="mdi-comment-multiple-outline"
            v-model="comment.content"
            readonly="true"
          ></v-text-field>
          &nbsp; &nbsp;
          <v-btn variant="tonal" @click="delComment(comment.commentNo)" style="color: #aaaaaa"
            >삭제</v-btn
          ></v-layout
        >
        <form>
          <v-layout row wrap>
            <v-text-field
              label="write comment"
              prepend-inner-icon="mdi-keyboard"
              style="width: 800px"
              v-model="comment.content"
            ></v-text-field>
            &nbsp; &nbsp;
            <v-btn variant="tonal" @click="addComment" style="color: #aaaaaa">등록</v-btn></v-layout
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jb-division-line {
  border-top: 1px solid #bebebe;
  margin: 30px 0px;
}
</style>
