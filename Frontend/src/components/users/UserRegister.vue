<script setup>
import { userRegist, idCheck, uploadProfile } from "@/api/user.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 유저 정보를 담는 객체 (v-model)
const user = ref({
  userId: "",
  userName: "",
  userPwd: "",
  emailId: "",
  emailDomain: "",
});

// 비밀번호 check를 위한 변수
const pwdcheck = ref("");

// 회원가입
const regist = async () => {
  await userRegist(
    user.value,
    (response) => {
      let msg = "회원가입에 실패했습니다";
      if (response.status == 200) msg = "회원가입에 성공했습니다";
      alert(msg);
      goMainPage();
    },
    (error) => {
      console.log(error);
    }
  );
  // 프로필 업로드
  const formData = new FormData();
  formData.append("upfile", image.file);
  formData.append("userId", user.value.userId);
  await uploadProfile(
    formData,
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
};

const goMainPage = () => {
  router.push({ name: "main" });
};

const idcheck_msg = ref("사용할 수 있는 아이디입니다");
// 아이디를 입력하는 동안
watch(
  () => user.value.userId,
  (newValue, oldValue) => {
    idCheck(
      user.value.userId,
      ({ data }) => {
        if (data === 1) {
          idcheck_msg.value = "사용할 수 없는 아이디입니다";
        } else {
          idcheck_msg.value = "사용할 수 있는 아이디입니다";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
);

// 비밀번호 확인란을 입력하는 동안
const pwdcheck_msg = ref("비밀번호가 틀립니다");
watch(
  () => pwdcheck.value,
  (newValue, oldValue) => {
    console.log(pwdcheck, " ", user.value.userPwd);
    if (pwdcheck.value === user.value.userPwd) {
      pwdcheck_msg.value = "비밀번호가 일치합니다";
    } else {
      pwdcheck_msg.value = "비밀번호가 틀립니다";
    }
  }
);

// watch하는 message에 따라 색깔을 다르게 적용
watch(
  () => idcheck_msg.value,
  (newValue, oldValue) => {
    changeColor(newValue);
  }
);

watch(
  () => pwdcheck_msg.value,
  (newValue, oldValue) => {
    changeColor(newValue);
  }
);

// 메세지에 따라 색을 다르게 처리하기 위함
const textColor1 = ref("#8CBDED");
const textColor2 = ref("#f57878");
const changeColor = (message) => {
  if (message === "사용할 수 있는 아이디입니다") {
    textColor1.value = "#8CBDED";
  }
  if (message === "사용할 수 없는 아이디입니다") {
    textColor1.value = "#f57878";
  }
  if (message === "비밀번호가 일치합니다") {
    textColor2.value = "#8CBDED";
  } else {
    textColor2.value = "#f57878";
  }
};

// 이미지 업로드를 위한 변수
const image = ref({
  file: null,
});

const onInputImg = (e) => {
  console.log("이미지 upload ", e.target.files[0]);
  image.file = e.target.files[0];
};
</script>

<template>
  <v-app id="back">
    <v-main>
      <!-- Login Component -->
      <v-container style="max-width: 500px" id="container">
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h1 style="text-align: center; font-weight: bold" class="mb-10">Regist</h1>
              <form>
                <v-text-field
                  label="ID"
                  prepend-inner-icon="mdi-account"
                  v-model="user.userId"
                ></v-text-field>
                <p
                  id="msg"
                  :style="{
                    color: textColor1,
                  }"
                >
                  {{ idcheck_msg }}
                </p>
                <v-text-field
                  label="Name"
                  prepend-inner-icon="mdi-account-box"
                  v-model="user.userName"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  label="Password"
                  v-model="user.userPwd"
                >
                </v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  label="Password Check"
                  v-model="pwdcheck"
                >
                </v-text-field>
                <p
                  id="msg"
                  :style="{
                    color: textColor2,
                  }"
                >
                  {{ pwdcheck_msg }}
                </p>
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
                <v-btn flat color="#CD4275" @click="regist"> 회원가입 </v-btn>
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
  margin-top: 100px;
}
#back {
  background-image: url("@/assets/login.jpg");
}
#msg {
  text-align: left;
}
</style>
