<script setup>
import { userModify, uploadProfile } from "@/api/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo, getUserInfo } = storeToRefs(memberStore);

const router = useRouter();

// 유저 객체
const user = ref({
  userId: userInfo.value.userId,
  userName: userInfo.value.userName,
  emailId: userInfo.value.emailId,
  emailDomain: userInfo.value.emailDomain,
});

// 수정하기 버튼을 누르면 실행되는 함수
const modify = async () => {
  await userModify(
    user.value,
    (response) => {
      let msg = "회원정보 수정에 실패했습니다";
      if (response.status == 200) {
        msg = "회원정보 수정에 성공했습니다";
      }
      alert(msg);
      goMyPage();
    },
    (error) => {
      console.log(error);
    }
  );
  // 프로필 사진
  const formData = new FormData();
  formData.append("upfile", image.file);
  formData.append("userId", userInfo.value.userId);
  await uploadProfile(
    formData,
    (response) => {
      console.log("formData : ", response);
      let token = sessionStorage.getItem("accessToken");
      getUserInfo(token);
    },
    (error) => {
      console.log(error);
    }
  );
  goMyPage();
  // goMainPage();
};

const goMyPage = () => {
  router.push({ name: "user-mypage" });
};
const goMainPage = () => {
  router.push({ name: "main" });
};

// 파일을 위한 객체
const image = ref({
  file: null,
});

const onInputImg = (e) => {
  console.log("이미지 upload ", e.target.files[0]);
  image.file = e.target.files[0];
};
</script>

<template>
  <v-app id="back" class="mt-10">
    <v-main>
      <v-container style="max-width: 500px" id="container">
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h1 style="text-align: center; font-weight: bold" class="mb-10">
                Edit Information
              </h1>
              <form>
                <v-text-field
                  label="ID"
                  prepend-inner-icon="mdi-account"
                  v-model="user.userId"
                  readonly="true"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="Name"
                  v-model="user.userName"
                >
                </v-text-field>
                <v-layout row wrap>
                  <v-text-field
                    prepend-inner-icon="mdi-email-open-outline"
                    type="email"
                    label="EmailId"
                    v-model="user.emailId"
                    style="width: 100px"
                  ></v-text-field>
                  &nbsp;&nbsp;&nbsp;
                  <v-text-field
                    prepend-inner-icon="mdi-email-outline"
                    type="email"
                    label="EmailDomain"
                    v-model="user.emailDomain"
                    style="width: 150px"
                  >
                  </v-text-field>
                </v-layout>
                <input
                  id="write-file"
                  class="file-input mb-3"
                  ref="file"
                  type="file"
                  @change="onInputImg"
                  placeholder="첨부된 파일이 없습니다."
                />
                <div class="justify-center">
                  <v-btn variant="tonal" style="color: #cd4275" @click="modify">
                    저장
                  </v-btn>
                </div>
              </form>
            </div>
          </v-card>
        </v-flex>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
#back {
  background-image: url("@/assets/mypage.png");
}
</style>
