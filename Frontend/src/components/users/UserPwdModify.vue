<script setup>
import { changePwd } from "@/api/user.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const router = useRouter();

// 유저 정보 객체
const user = ref({
  userId: userInfo.value.userId,
  userPwd: "",
});

const pwdcheck = ref("");
const originPwd = ref("");
const pwdcheck_msg = ref("비밀번호가 틀립니다");

// 비밀번호 확인란을 입력하는 동안
watch(
  () => pwdcheck.value,
  (newValue, oldValue) => {
    if (user.value.userPwd === pwdcheck.value) {
      pwdcheck_msg.value = "비밀번호가 일치합니다";
    } else {
      pwdcheck_msg.value = "비밀번호가 틀립니다";
    }
  }
);

// 수정버튼을 누르면 비밀번호를 변경
const modify = () => {
  changePwd(
    user.value,
    (response) => {
      if (response.status == 200) {
        goMainPage();
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

const goMainPage = () => {
  router.push({ name: "main" });
};

// watch하는 message에 따라 색깔을 다르게 적용
watch(
  () => pwdcheck_msg.value,
  (newValue, oldValue) => {
    changeColor(newValue);
  }
);

// 메세지에 따라 색을 다르게 처리하기 위함
const textColor = ref("#f57878");
const changeColor = (message) => {
  if (message === "비밀번호가 일치합니다") {
    textColor.value = "#8CBDED";
  }
  if (message === "비밀번호가 틀립니다") {
    textColor.value = "#f57878";
  }
};
</script>

<template>
  <v-app id="back" class="mt-10">
    <v-main>
      <v-container style="max-width: 500px" id="container">
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h1 style="text-align: center; font-weight: bold" class="mb-10">Edit Password</h1>
              <form>
                <v-text-field
                  label="ID"
                  prepend-inner-icon="mdi-account"
                  v-model="user.userId"
                  readonly="true"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="현재 비밀번호 입력"
                  type="password"
                  v-model="originPwd"
                >
                </v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="새 비밀번호 입력"
                  type="password"
                  v-model="user.userPwd"
                >
                </v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="새 비밀번호 확인"
                  type="password"
                  v-model="pwdcheck"
                >
                </v-text-field>
                <p id="msg" :style="{ color: textColor }">
                  {{ pwdcheck_msg }}
                </p>
                <div class="justify-center">
                  <v-btn variant="tonal" style="color: #cd4275" @click="modify">
                    비밀번호 변경
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
