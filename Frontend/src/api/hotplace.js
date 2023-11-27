import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listHotplace(param, success, fail) {
  console.log("Hotplace list param :", param);
  local.post(`/hotplace/list`, JSON.stringify(param)).then(success).catch(fail);
}

function detailHotplace(hotplaceno, success, fail) {
  local.get(`/hotplace/detail/${hotplaceno}`).then(success).catch(fail);
}

async function writeHotplace(hotplace, success, fail) {
  console.log("hotplace write ", hotplace);
  await local
    .post(`/hotplace/write`, JSON.stringify(hotplace))
    .then(success)
    .catch(fail);
}

async function writeFileHotplace(formData, success, fail) {
  console.log("hotplace write file", formData);
  await local
    .post(`/hotplace/write/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function modifyHotplace(article, success, fail) {
  local
    .put(`/hotplace/modify`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteHotplace(hotplaceno, success, fail) {
  local.delete(`/hotplace/delete/${hotplaceno}`).then(success).catch(fail);
}

function changeRecommend(hotplaceno, userId, success, fail) {
  local
    .get(`/hotplace/recommend/${hotplaceno}/${userId}`)
    .then(success)
    .catch(fail);
}

function getMyRecommend(userId, success, fail) {
  local.get(`/hotplace/myRecommend/${userId}`).then(success).catch(fail);
}

function userlistRecommend(userId, success, fail) {
  local.get(`/hotplace/myRecommendList/${userId}`).then(success).catch(fail);
}

function top3(success, fail) {
  local.get(`/hotplace/top3`).then(success).catch(fail);
}

export {
  listHotplace,
  detailHotplace,
  writeHotplace,
  writeFileHotplace,
  modifyHotplace,
  deleteHotplace,
  changeRecommend,
  getMyRecommend,
  userlistRecommend,
  top3,
};
