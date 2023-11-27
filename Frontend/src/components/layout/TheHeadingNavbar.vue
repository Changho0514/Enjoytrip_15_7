<script setup>
import { useMenuStore } from "@/stores/menu";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const menuStore = useMenuStore();

const { menuList } = storeToRefs(menuStore);

const memberStore = useMemberStore();
const { userInfo, isLogin } = storeToRefs(memberStore);
const { userLogout, getUserInfo } = memberStore;

const logout = () => {
  console.log("로그아웃!!!!");
  userLogout();
};

const url = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/profile/${saveFolder}/${saveFile}`;

// pinia에서 프로필사진이 변경되면 적용하기 위함
watch(
  () => userInfo.value,
  (newValue, oldValue) => {
    if (isLogin == true && newValue.originalFile != null) {
      console.log("watch originalFile");
      let token = sessionStorage.getItem("accessToken");
      getUserInfo(token);
    }
  }
);
// pinia에서 이름이 변경되면 적용하기 위함
watch(
  () => userInfo.value,
  (newValue, oldValue) => {
    if (isLogin == true && newValue.userName != null) {
      let token = sessionStorage.getItem("accessToken");
      getUserInfo(token);
    }
  }
);
// onMounted(() => {
//   let token = sessionStorage.getItem("accessToken");
//   getUserInfo(token);
// });
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link :to="{ name: 'main' }" class="navbar-brand text-primary fw-bold"
        ><img src="@/assets/logo.png" alt="" width="200"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse container" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'attraction' }" class="nav-link"
              ><i class="bi bi-map"></i> 지역별관광지</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'mytrip' }" class="nav-link"
              ><i class="bi bi-calendar-check"></i> 나의여행계획</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'hotplace' }" class="nav-link"
              ><i class="bi bi-camera-fill"></i> 핫플자랑하기</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link"
              ><i class="bi bi-people-fill"></i> 동행구하기</router-link
            >
          </li>
        </ul>
        <!-- 로그인 처리 -->
        <ul
          class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show === isLogin">
              <template v-if="menu.routeName === 'user-logout'">
                <li class="nav-item">
                  <router-link to="/" @click.prevent="logout" class="nav-link">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link :to="{ name: menu.routeName }" class="nav-link">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
            </template>
          </template>
          <li class="nav-item" v-if="isLogin && userInfo.roll === 1">
            <router-link :to="{ name: 'user-list' }" class="nav-link"> 회원목록</router-link>
          </li>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img
            :src="url(userInfo)"
            class="img-fluid rounded-start"
            onerror="javascript:this.src='/src/assets/profile.jpg'"
            style="width: 35px; height: 35px"
            v-if="isLogin"
          />
          <li class="nav-link" v-if="isLogin">{{ userInfo.userName }}({{ userInfo.userId }})님</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.welcome-text {
  text-align: center;
  font-size: 30px;
  margin: 100px 0px 10px;
}
.info-text {
  text-align: center;
  font-size: 15px;
  margin: 10px;
}
.search {
  margin: 20px;
}
#login_after {
  display: none;
}
</style>
