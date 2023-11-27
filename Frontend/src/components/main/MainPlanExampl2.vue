<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        color: "#FFB1BC",
        // icon: "mdi-information",
        content: "강릉 초두부",
      },
      {
        id: 2,
        color: "#B7A4EE",
        // icon: "mdi-alert-circle",
        content: "짬뽕집",
      },
      {
        id: 3,
        color: "#719E71",
        // icon: "mdi-alert-circle",
        content: "아바이 순대",
      },
      {
        id: 4,
        color: "#CD4275",
        // icon: "mdi-alert-circle",
        content: "경포해변",
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
