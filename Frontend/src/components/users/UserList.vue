<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userList, adminDelete } from "@/api/user";
import { userlistArticle } from "@/api/board";
import { userlistComment } from "@/api/comment";

// 유저 list
const users = ref([]);

// 유저 list을 가져오는 함수
const getUserList = () => {
  userList(
    ({ data }) => {
      // console.log("then => ", data);
      users.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getUserList();
});

// 강제탈퇴 버튼을 누르면 실행되는 함수
const deleteUser = (userId) => {
  adminDelete(
    userId,
    (response) => {
      getUserList();
    },
    (error) => {
      console.log(error);
    }
  );
};

// 회원정보보기 버튼을 누르면 실행되는 함수
const userBoardList = ref([]);
const userCommentList = ref([]);
const detailUser = async (userId) => {
  // 유저가 작성한 게시글 가져오기
  await userlistArticle(
    userId,
    ({ data }) => {
      userBoardList.value = data;
    },
    (error) => console.log(error)
  );
  // 유저가 작성한 댓글 가져오기
  await userlistComment(
    userId,
    ({ data }) => {
      userCommentList.value = data;
    },
    (error) => console.log(error)
  );
};
</script>

<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 style="text-align: center; color: #ffaf00" class="mt-3">
          <b>회원 목록</b>
        </h1>
      </div>
      <div class="col-lg-10">
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">회원 아이디</th>
              <th scope="col">회원 이름</th>
              <th scope="col">이메일</th>
              <th scope="col">가입일</th>
              <th scope="col">정보 보기</th>
              <th scope="col">강제 탈퇴</th>
            </tr>
          </thead>
          <tbody
            class="text-center"
            style="padding-top: 20px"
            v-for="user in users"
            :key="user.userId"
          >
            <td>{{ user.userId }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.emailId }}@{{ user.emailDomain }}</td>
            <td>{{ user.joinDate }}</td>
            <td>
              <v-dialog>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    @click="detailUser(user.userId)"
                    style="background-color: #ffaf00; color: white"
                    >회원정보보기</v-btn
                  >
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card title="회원정보">
                    <v-card-text> 작성한 게시글 </v-card-text>
                    <v-card-text v-for="list in userBoardList" :key="list.articleNo">
                      {{ list.articleNo }}번 글의 "{{ list.subject }}"</v-card-text
                    >
                    <v-card-text> 작성한 댓글 </v-card-text>
                    <v-card-text v-for="list in userCommentList" :key="list.commentNo">
                      {{ list.articleNo }}번 글의 {{ list.commentNo }} : "{{
                        list.content
                      }}"</v-card-text
                    >

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </td>
            <td>
              <v-btn
                style="background-color: #ffaf00; color: white"
                @click="deleteUser(user.userId)"
                >강제 탈퇴</v-btn
              >
            </td>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
thead th {
  padding: 10px;
  background-color: #ffd732;
}
th,
td {
  padding: 5px;
  border-bottom: 1px solid #dcdcdc;
}
</style>
