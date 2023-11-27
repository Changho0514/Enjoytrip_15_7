import { localAxios } from "@/util/http-commons";

const local = localAxios();

function sidoList(success, fail) {
  console.log("sidolist ");
  local.get(`/attraction/sido`).then(success).catch(fail);
}

function gugunList(selectedSido, success, fail) {
  console.log("gugunlist in ", selectedSido);
  local.get(`/attraction/gugun/${selectedSido}`).then(success).catch(fail);
}

function attractionList(attraction, success, fail) {
  console.log("attraction list param :", attraction);
  local
    .post(`/attraction/list`, JSON.stringify(attraction))
    .then(success)
    .catch(fail);
}

function getAttration(contentId, success, fail) {
  console.log("getAttraction in ", contentId);
  local.get(`/attraction/getAttraction/${contentId}`).then(success).catch(fail);
}

function getOverview(contentId, success, fail) {
  local.get(`/attraction/getOverview/${contentId}`).then(success).catch(fail);
}

export { sidoList, gugunList, attractionList, getAttration, getOverview };
