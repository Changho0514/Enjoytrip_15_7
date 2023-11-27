<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        color: "#648CFF",
        // icon: "mdi-information",
        content: "광주 예술의거리",
      },
      {
        id: 2,
        color: "#C8386B",
        // icon: "mdi-alert-circle",
        content: "광주 양동시장",
      },
      {
        id: 3,
        color: "#73B2B4",
        // icon: "mdi-alert-circle",
        content: "전평제",
      },
      {
        id: 4,
        color: "#B4845F",
        // icon: "mdi-alert-circle",
        content: "시리단길",
      },
      {
        id: 5,
        color: "#FFB900",
        // icon: "mdi-alert-circle",
        content: "광주 송정동 떡갈비 골목",
      },
    ],
  }),
};
</script>

<template>
  <v-timeline side="end">
    <v-timeline-item v-for="item in items" :key="item.id" :dot-color="item.color" size="small">
      <v-alert :value="true" :color="item.color" :icon="item.icon" :content="item.content">
        {{ item.content }}
      </v-alert>
    </v-timeline-item>
  </v-timeline>
</template>

<style>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
element.style {
  --v-timeline-line-thickness: 2px;
  left: 0px;
}
.v-timeline--vertical.v-timeline--align-center {
  align-items: left;
}
.v-timeline--vertical.v-timeline--justify-auto {
  grid-template-columns: auto min-content auto;
}

.v-timeline--vertical.v-timeline {
  row-gap: 0px;
  height: 100%;
}
</style>
