<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";
</script>

<template>
  <div class="container" style="margin-top: 35px; margin-bottom: 100px">
    <div class="row">
      <h3 style="font-weight: bolder; margin-bottom: 25px">글 수정하기</h3>
      <div class="col-lg-10 text-start">
        <BoardFormItem type="modify" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
