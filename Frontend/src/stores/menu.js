import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "회원가입", show: false, routeName: "user-join" },
    { name: "로그인", show: false, routeName: "user-login" },
    { name: "로그아웃", show: true, routeName: "user-logout" },
    { name: "마이페이지", show: true, routeName: "user-mypage" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
