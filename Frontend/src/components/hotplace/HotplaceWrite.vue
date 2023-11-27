<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { writeHotplace, writeFileHotplace } from "@/api/hotplace.js";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const router = useRouter();

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

// 핫플 객체
const hotplace = ref({
  userId: userInfo.value.userId,
  title: "",
  content: "",
  address: "",
});
const hotplaceNo = ref(0);

// 이미지 객체
const image = ref({
  file: null,
  preview: null,
});

// 파일을 첨부하면 실행되는 함수
const onInputImg = (e) => {
  image.file = e.target.files[0];
  image.value.preview = URL.createObjectURL(e.target.files[0]);
};

// 등록하기 버튼을 누르면 실행되는 함수
const write = async () => {
  console.log("작성할 핫플 글 -> ", hotplace);
  await writeHotplace(
    hotplace.value,
    ({ data }) => {
      console.log("write한 핫플 번호 ->", data);
      hotplaceNo.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
  // 파일 이미지
  const formData = new FormData();
  formData.append("upfile", image.file);
  formData.append("hotplaceNo", hotplaceNo.value);
  await writeFileHotplace(
    formData,
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
  moveList();
};

// HotplaceList.vue로 이동
const moveList = () => {
  router.push("/hotplace");
};
</script>

<template>
  <div class="container" style="margin-left: 10px; margin-top: 50px; margin-bottom: 85px">
    <div class="row">
      <div class="col-9">
        <h3 style="font-weight: bolder; margin-bottom: 30px">핫플을 올리자</h3>
        <div class="col-lg-10 text-start">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="subject" class="form-label">장소 : </label>
              <input
                type="text"
                class="form-control"
                v-model="hotplace.title"
                placeholder="장소..."
              />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">후기 : </label>
              <textarea class="form-control" v-model="hotplace.content" rows="10"></textarea>
            </div>
            <div class="mb-3">
              <label for="subject" class="form-label">주소 : </label>
              <input
                type="text"
                class="form-control"
                v-model="hotplace.address"
                placeholder="주소..."
              />
            </div>
            <div class="file-section input-line">
              <div class="file-top"></div>
              <input
                id="write-file"
                class="file-input"
                ref="file"
                type="file"
                @change="onInputImg"
                placeholder="첨부된 파일이 없습니다."
              />
            </div>
            <div class="col-auto text-center">
              <v-btn variant="tonal" @click="write" color="#0A82FF">등록하기</v-btn>
              &nbsp;&nbsp;<v-btn variant="tonal" @click="moveList" color="#FF607F	">뒤로가기</v-btn>
            </div>
          </form>
        </div>
      </div>
      <div class="col-3" style="flex-direction: column; margin-top: 25px; margin-left: -100px">
        <h3 style="font-weight: bolder; margin-bottom: 40px">사진 미리보기</h3>
        <v-card v-if="image.preview" class="mx-auto">
          <v-img
            :src="image.preview"
            height="350px"
            style="aspect-ratio: 1; object-fit: cover; border: 2px solid #dcdcdc; padding: 10px"
            cover
          ></v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
