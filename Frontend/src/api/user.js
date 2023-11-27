import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
  console.log("param", param);
  await local.post(`/user/login`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function userRegist(user, success, fail) {
  await local.post(`/user/regist`, user).then(success).catch(fail);
}

async function userDelete(userId, success, fail) {
  await local.delete(`/user/delete/${userId}`).then(success).catch(fail);
}

async function findPwd(userId, success, fail) {
  await local.get(`user/find/${userId}`).then(success).catch(fail);
}

async function userModify(user, success, fail) {
  await local.put(`/user/modify`, user).then(success).catch(fail);
}

async function userList(success, fail) {
  await local.get(`/admin/list`).then(success).catch(fail);
}

async function idCheck(userId, success, fail) {
  await local.get(`/user/idcheck/${userId}`).then(success).catch(fail);
}

async function changePwd(user, success, fail) {
  await local.put(`/user/change`, JSON.stringify(user)).then(success).catch(fail);
}

async function adminDelete(userId, success, fail) {
  console.log("관리자가 회원을 삭제한다", userId);
  await local.delete(`/admin/delete/${userId}`).then(success).catch(fail);
}

async function adminGetUser(userId, success, fail) {
  await local.get(`/admin/list/${userId}`).then(success).catch(fail);
}

async function uploadProfile(formData, success, fail) {
  console.log("upload profile", formData);
  await local
    .post(`/user/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

export {
  userConfirm,
  findById,
  tokenRegeneration,
  logout,
  userRegist,
  userDelete,
  findPwd,
  userModify,
  userList,
  idCheck,
  changePwd,
  adminDelete,
  adminGetUser,
  uploadProfile,
};
