import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";
import TheAttractionView from "@/views/TheAttractionView.vue";
import TheMytripView from "@/views/TheMytripView.vue";
import TheHotplaceView from "@/views/TheHotplaceView.vue";
import TheBoardView from "../views/TheBoardView.vue";

import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  let token = sessionStorage.getItem("accessToken");
  console.log("로그인 처리 전================================", memberStore.userInfo, token);

  if (memberStore.userInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await memberStore.getUserInfo(token);
  }
  if (!memberStore.isValidToken || memberStore.userInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "user-login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/TheUserView.vue"),
      children: [
        {
          path: "login",
          name: "user-login",
          component: () => import("@/components/users/UserLogin.vue"),
        },
        {
          path: "join",
          name: "user-join",
          component: () => import("@/components/users/UserRegister.vue"),
        },
        {
          path: "mypage",
          name: "user-mypage",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/users/UserMyPage.vue"),
        },
        {
          path: "change",
          name: "user-changePwd",
          component: () => import("@/components/users/UserPwdModify.vue"),
        },
        {
          path: "modify",
          name: "user-modify",
          component: () => import("@/components/users/UserModify.vue"),
        },
        {
          path: "list",
          name: "user-list",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/users/UserList.vue"),
        },
      ],
    },
    {
      path: "/attraction",
      name: "attraction",
      beforeEnter: onlyAuthUser,
      component: TheAttractionView,
    },
    {
      path: "/mytrip",
      name: "mytrip",
      beforeEnter: onlyAuthUser,
      component: TheMytripView,
    },
    {
      path: "/hotplace",
      name: "hotplace",
      beforeEnter: onlyAuthUser,
      component: TheHotplaceView,
      redirect: { name: "hotplace-list" },
      children: [
        {
          path: "list",
          name: "hotplace-list",
          component: () => import("@/components/hotplace/HotplaceList.vue"),
        },
        {
          path: "write",
          name: "hotplace-write",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/hotplace/HotplaceWrite.vue"),
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: TheBoardView,
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
  ],
});

export default router;
