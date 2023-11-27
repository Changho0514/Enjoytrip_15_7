<script setup>
import { ref, onMounted } from "vue";
import { userDelete, findPwd, adminGetUser } from "@/api/user";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { userlistRecommend } from "@/api/hotplace";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const { userLogout, getUserInfo } = memberStore;

const router = useRouter();

// 페이지 오자마자 pinia에 있는 프로필 사진을 가져오고, 유저의 정보를 가져오기 위함
onMounted(() => {
  let token = sessionStorage.getItem("accessToken");
  getUserInfo(token);
  detailUser(userInfo.value.userId);
});

const modify = () => {
  router.push({ name: "user-modify" });
};

// 비밀번호 찾기 버튼을 누르면 실행되는 함수
const findPassword = () => {
  findPwd(
    userInfo.value.userId,
    (response) => {
      let password;
      if (response.status == 200) {
        password = response.data;
        alert(password);
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

// 비밀번호 변경 버튼을 누르면 실행되는 함수
const changePwd = () => {
  router.push({ name: "user-changePwd" });
};

// 탈퇴하기 버튼을 누르면 실행되는 함수
const deleteUser = () => {
  let checkmsg = "정말 탈퇴하시겠습니까?";
  let isGo = confirm(checkmsg);
  if (isGo) {
    userDelete(
      userInfo.value.userId,
      async (response) => {
        let msg = "회원탈퇴에 실패했습니다";
        if (response.status == 200) {
          msg = "회원탈퇴에 성공했습니다";
          alert(msg);
          await userLogout(userInfo.value.userId);
          await goMainPage();
        } else {
          alert(msg);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

const goMainPage = () => {
  router.push({ name: "main" });
};

// 유저에 정보와 핫플레이스 좋아요 리스트 가져오기
const user = ref({});
const userRecommendList = ref([]);
const detailUser = async (userId) => {
  await userlistRecommend(
    userId,
    ({ data }) => {
      console.log(data);
      userRecommendList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
  await adminGetUser(
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

const urls = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/upload/${saveFolder}/${saveFile}`;

const url = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/profile/${saveFolder}/${saveFile}`;
</script>

<template>
  <div class="vh-100 justify-content-center" id="back">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card mt-10 m-auto" style="max-width: 700px">
          <h1 style="text-align: center" class="mt-3"><b>My Page</b></h1>
          <div class="row g-0">
            <div class="col ml-4">
              <img
                :src="url(userInfo)"
                class="img-fluid rounded-start"
                onerror="javascript:this.src='/src/assets/profile.jpg'"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body text-start">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">아이디 : {{ userInfo.userId }}</li>
                  <li class="list-group-item">이름 : {{ userInfo.userName }}</li>
                  <li class="list-group-item">
                    이메일 : {{ userInfo.emailId }}@{{ userInfo.emailDomain }}
                  </li>
                  <li class="list-group-item">가입일 : {{ userInfo.joinDate }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="justify-content-center; mt-3 mb-3" style="margin-left: 100px">
            <v-btn flat style="background-color: #efaccf; color: white" @click="modify">
              정보 수정하기
            </v-btn>
            &nbsp;
            <v-btn flat style="background-color: #87c6c8; color: white" @click="findPassword">
              비밀번호 찾기
            </v-btn>
            &nbsp;
            <v-btn flat style="background-color: #efaccf; color: white" @click="changePwd">
              비밀번호 변경
            </v-btn>
            &nbsp;
            <v-btn flat style="background-color: #87c6c8; color: white" @click="deleteUser">
              탈퇴하기
            </v-btn>
          </div>
        </div>
      </div>
      <h3 style="text-align: center; color: #8282ff" class="mt-8">
        <b>좋아요를 누른 핫플레이스</b>
      </h3>
    </div>
    <div class="card-container mt-3">
      <div class="card2" v-for="hotplace in userRecommendList" :key="hotplace.hotplaceNo">
        <div class="card-image" style="text-align: center">
          <img
            :src="urls(hotplace)"
            class="img-fluid"
            style="aspect-ratio: 1; object-fit: cover; width: 300px; border-radius: 30px"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ hotplace.title }}</h5>
          <p class="card-text">{{ hotplace.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#back {
  background-image: url("@/assets/mypage.png");
}
#back img {
  width: 100%;
  height: 100%;
}
.card-container {
  display: flex; /* 요소를 가로로 배치 */
  overflow-x: auto; /* x축으로 넘칠 경우 스크롤 표시 */
  width: 100%; /* 부모 요소에 맞게 너비 조정 */
}

/* 카드 스타일 */
.card2 {
  flex: 0 0 auto; /* 가로로 정렬된 카드의 크기 유지 */
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px; /* 카드 사이 간격 조정 */
  min-width: 300px; /* 카드의 최소 너비 설정 */
}
</style>
