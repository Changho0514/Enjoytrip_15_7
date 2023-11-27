import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getMytripMax(userId, success, fail) {
  console.log("getMytripMax's userId : ", userId);
  local.get(`/mytrip/getMytripMax/${userId}`).then(success).catch(fail);
}

function addMytripAll(param, success, fail) {
  console.log("나의 여행계획 모두 추가 : ", param);
  local
    .post(`/mytrip/addMytripAll`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

function getMytrip(userId, userMytripNo, success, fail) {
  console.log("유저가 등록한 해당 계획 가져오기");
  local
    .get(`/mytrip/getMytrip/${userId}/${userMytripNo}`)
    .then(success)
    .catch(fail);
}

function addMytripInfo(info, success, fail) {
  console.log("여행 계획 추가 정보 ", info);
  local
    .post(`/mytrip/addMytripInfo`, JSON.stringify(info))
    .then(success)
    .catch(fail);
}

function getMytripInfo(userId, userMytripNo, success, fail) {
  console.log("여행 정보 가져오기");
  local
    .get(`/mytrip/getMytripInfo/${userId}/${userMytripNo}`)
    .then(success)
    .catch(fail);
}

function deleteMytripAll(userId, userMytripNo, success, fail) {
  console.log("여행 계획 삭제", userId, userMytripNo);
  local
    .delete(`/mytrip/deleteMytripAll/${userId}/${userMytripNo}`)
    .then(success)
    .catch(fail);
}

function deleteMytripInfo(userId, userMytripNo, success, fail) {
  console.log("여행 계획 정보 삭제", userId, userMytripNo);
  local
    .delete(`/mytrip/deleteMytripInfo/${userId}/${userMytripNo}`)
    .then(success)
    .catch(fail);
}

export {
  getMytripMax,
  addMytripAll,
  getMytrip,
  addMytripInfo,
  getMytripInfo,
  deleteMytripAll,
  deleteMytripInfo,
};
