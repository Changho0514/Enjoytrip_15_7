<!-- WeatherViewTemp.vue -->
<script setup>
import { ref, watch } from "vue";

const targetArea = ref("");

const speArea = ref([
  { name: "서울", code: "1168064000" },
  { name: "광주", code: "2915573000" },
  { name: "대전", code: "3020052600" },
  { name: "부산", code: "2611057000" },
  { name: "강원", code: "4277025300" },
  { name: "울산", code: "3111064000" },
  { name: "인천", code: "2811054000" },
  { name: "여수", code: "4613079000" },
]);

const weathers = ref([]);

watch(targetArea, (newValue, oldValue) => {
  weathers.value = [];
  getWeather(newValue);
});

const getWeather = (area) => {
  fetch(`http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=${area}`)
    .then((response) => response.text())
    .then((data) => makeList(data));
};

const makeList = (data) => {
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
    weathers.value.push(obj);
  });
};
</script>

<template>
  <div id="current-weather-div" style="margin-top: 30px">
    <h2 id="current-weather"><b>지역별 날씨</b></h2>
    <label for="area"> </label>
    <select id="area" v-model="targetArea">
      <option value="" disabled>지역 선택</option>
      <option
        v-for="(ssafy, index) in speArea"
        :key="ssafy.code"
        :value="ssafy.code"
      >
        <h2>{{ ssafy.name }}</h2>
      </option>
    </select>
  </div>
  <div v-if="weathers.length !== 0">
    <table>
      <td v-for="(weather, wIndex) in weathers" :key="wIndex">
        <div v-if="weather.hour === '24'">
          {{ "밤 12시" }}
        </div>
        <div v-else>
          {{
            weather.hour < 12
              ? "오전 " + weather.hour + "시"
              : "오후 " + (weather.hour % 12) + "시"
          }}
        </div>

        <div>
          <img
            class="w-img"
            :src="`./src/assets/${weather.icon.replace('/', '_')}.png`"
            alt=""
          />
        </div>
        <div>{{ weather.temp }}°C</div>
        <div>
          {{ weather.wfKor }}
        </div>
        <div>{{ weather.reh }}%</div>
      </td>
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
div {
  margin: 20px;
  overflow-x: auto;
}

h2 {
  display: inline;
  margin-right: 10px;
  font-size: 30px;
}

/* Style for the select dropdown */
#area {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Style for the options */
#area option {
  text-align: center;
  background-color: #fff; /* Background color of options */
  color: #333; /* Text color of options */
  padding: 8px;
  font-size: 14px; /* Adjust the font size as needed */
}

/* Style for the selected option */
#area option:checked {
  background-color: #007bff; /* Background color of selected option */
  color: #fff; /* Text color of selected option */
}

/* Style for the table */
table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
}

/* Style for table headers */
th {
  border-bottom: 2px solid darkgray;
  padding: 10px;
  text-align: center;
  font-size: 18px; /* Adjust the font size as needed */
}

/* Style for table cells */
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  font-size: 16px; /* Adjust the font size as needed */
}

/* Style for the weather image */
.w-img {
  width: 70px; /* Adjust the image size as needed */
}

#current-weather {
  width: 83%; /* Adjust the width as needed (100% - 1/6) */
  margin-right: 20px; /* Center the title within the available width */
}
#current-weather-div {
  width: 83%; /* Adjust the width as needed (100% - 1/6) */
  margin: 10px; /* Center the title within the available width */
}
</style>
