<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();

const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;

// 유저 객체
const loginUser = ref({
  userId: "",
  userPwd: "",
});

// 로그인 버튼을 누르면 실행되는 함수
const login = async () => {
  console.log("login ing!!!! !!!------------------------------------------");
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  console.log("111. ", token);
  console.log("isLogin: ", isLogin);
  if (isLogin) {
    console.log("로그인 성공아닌가???");
    getUserInfo(token);
  }
  router.push("/");
};

// 회원가입 버튼
const goRegist = () => {
  router.push({ name: "user-join" });
};
</script>

<template>
  <v-app id="back" class="darken-background">
    <v-main>
      <v-container style="max-width: 500px" id="container">
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h1 style="text-align: center; font-weight: bold" class="mb-10">Login</h1>
              <form>
                <v-text-field
                  label="ID"
                  prepend-inner-icon="mdi-account"
                  v-model="loginUser.userId"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  label="Password"
                  v-model="loginUser.userPwd"
                >
                </v-text-field>
                <v-btn flat color="#CD4275" @click="login"> 로그인 </v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                계정이 없으신가요? &nbsp;
                <v-btn flat style="background-color: #dcdcdc" @click="goRegist"> 회원가입 </v-btn>
              </form>
            </div>
          </v-card>
        </v-flex>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
#container {
  margin-top: 200px;
}
#back {
  background-image: url("@/assets/login.jpg");
}
</style>
