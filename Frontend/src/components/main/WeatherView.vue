<!-- WeatherView.vue -->
<script setup>
import { ref, computed, onMounted } from "vue";

const selAreas = ref([
  { name: "서울", code: "1168064000", weathers: [] },
  { name: "광주", code: "2915573000", weathers: [] },
  { name: "대전", code: "3020052600", weathers: [] },
  { name: "부산", code: "2611057000", weathers: [] },
  { name: "강원", code: "4277025300", weathers: [] },
  { name: "울산", code: "3111064000", weathers: [] },
  { name: "인천", code: "2811054000", weathers: [] },
  { name: "여수", code: "4613079000", weathers: [] },
]);

onMounted(async () => {
  for (const area of selAreas.value) {
    await getWeather(area);
  }
});

const getWeather = async (area) => {
  const response = await fetch(
    `http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=${area.code}`
  );
  const data = await response.text();
  makeList(data, area);
};

const makeList = (data, area) => {
  let parser = new DOMParser();
  const xml = parser.parseFromString(data, "application/xml");
  let datas = xml.querySelectorAll("data");
  datas.forEach((weather) => {
    let obj = new Object();
    obj.hour = weather.querySelector("hour").textContent;
    obj.icon = weather.querySelector("wfEn").textContent;
    obj.temp = weather.querySelector("temp").textContent;
    obj.wfKor = weather.querySelector("wfKor").textContent;
    obj.reh = weather.querySelector("reh").textContent;
    area.weathers.push(obj);
  });
};

const filteredAreas = computed(() => {
  return selAreas.value.filter((area) => area.weathers.length > 0);
});
</script>

<template>
  <div id="current-weather-div">
    <h2 id="current-weather" class="weather-title"><b>현재 날씨</b></h2>
    <table id="current-weather-table">
      <tr style="font-family: 'Pretendard-Regular', sans-serif">
        <td v-for="(area, index) in filteredAreas" :key="index">
          <h2>{{ area.name }}</h2>
          <div>
            <img
              class="w-img"
              :src="`./src/assets/${area.weathers[0].icon.replace(
                '/',
                '_'
              )}.png`"
              alt=""
            />
          </div>
          <div>{{ area.weathers[0].temp }}°C</div>
          <div>{{ area.weathers[0].wfKor }}</div>
          <div>{{ area.weathers[0].reh }}%</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
template {
  font-family: "Pretendard-Regular, sans-serif";
}
.weather-title {
  /* margin-left: 10px; */
  margin-top: 30px;
}
template {
  font-family: "Pretendard-Regular", sans-serif;
}

#current-weather-table {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
}
tr,
td {
  text-align: center;
}
th {
  border-bottom: 2px solid darkgray;
}
.w-img {
  width: 80px;
}
#current-weather {
  width: 83%;
  margin-right: 10px;
}
#current-weather-div {
  width: 83%;
  margin: 10px;
}
</style>
