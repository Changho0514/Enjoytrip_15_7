import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listArticle(param, success, fail) {
  console.log("board list param :", param);
  local.post(`/board/list`, JSON.stringify(param)).then(success).catch(fail);
}

function detailArticle(articleno, success, fail) {
  local.get(`/board/detail/${articleno}`).then(success).catch(fail);
}

function registArticle(article, success, fail) {
  console.log("boardjs article", article);
  local.post(`/board/write`, JSON.stringify(article)).then(success).catch(fail);
}

function getModifyArticle(articleno, success, fail) {
  local.get(`/board/detail/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  local.put(`/board/modify`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  local.delete(`/board/delete/${articleno}`).then(success).catch(fail);
}

function userlistArticle(userId, success, fail) {
  local.get(`/board/userlist/${userId}`).then(success).catch(fail);
}

function checkWriteUser(articleno, success, fail) {
  local.get(`/board/check/${articleno}`).then(success).catch(fail);
}

export {
  listArticle,
  detailArticle,
  registArticle,
  getModifyArticle,
  modifyArticle,
  deleteArticle,
  userlistArticle,
  checkWriteUser,
};
