import { localAxios } from "@/util/http-commons";

const local = localAxios();

function writeComment(comment, success, fail) {
  local.post(`/comment/write`, JSON.stringify(comment)).then(success).catch(fail);
}

function listComment(articleNo, success, fail) {
  local.get(`/comment/list/${articleNo}`).then(success).catch(fail);
}

function deleteComment(commentNo, success, fail) {
  local.delete(`/comment/delete/${commentNo}`).then(success).catch(fail);
}

function userlistComment(userId, success, fail) {
  local.get(`/comment/userlist/${userId}`).then(success).catch(fail);
}

function checkCommentWriteUser(commentNo, success, fail) {
  local.get(`/comment/check/${commentNo}`).then(success).catch(fail);
}

export { writeComment, listComment, deleteComment, userlistComment, checkCommentWriteUser };
