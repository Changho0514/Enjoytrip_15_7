<script setup>
import { ref, watch, onMounted } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);
const polylines = ref([]);
const overlays = ref([]);
var distance;

const props = defineProps({ attractions: Array });

watch(
  () => props.attractions,
  () => {
    positions.value = [];
    let points = [];
    props.attractions.forEach((attraction) => {
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
      obj.title = attraction.title;
      positions.value.push(obj);

      points.push(new kakao.maps.LatLng(attraction.latitude, attraction.longitude));
    });
    // 연결선 초기화
    deletePolylines();
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      map: map,
      path: points, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FFAE00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });
    distance = Math.round(polyline.getLength());
    // console.log("계산된 거리 :", distance);
    loadMarkers();
    // 지도에 선을 표시합니다
    polyline.setMap(map);
    polylines.value.push(polyline);
  },
  { deep: true }
);

const deletePolylines = () => {
  if (polylines.value.length > 0) {
    polylines.value.forEach((polyline) => polyline.setMap(null));
  }
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);

  // loadMarkers();
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();
  // 현재 표시되어있는 overlay들 삭제
  deleteOverlays();

  // 마커 이미지의 이미지 주소입니다
  const imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  // 마커 이미지의 이미지 크기 입니다
  const imgSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  overlays.value = [];
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);

    var content = getTimeHTML(distance);
    var overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: markers.value[0].getPosition(),
    });
    overlays.value.push(overlay);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

const deleteOverlays = () => {
  if (overlays.value.length > 0) {
    overlays.value.forEach((overlay) => overlay.setMap(null));
  }
};

// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {
  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  var walkkTime = (distance / 67) | 0;
  var walkHour = "",
    walkMin = "";

  // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
  if (walkkTime > 60) {
    walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
  }
  walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

  // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
  var bycicleTime = (distance / 227) | 0;
  var bycicleHour = "",
    bycicleMin = "";

  // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
  if (bycicleTime > 60) {
    bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + "</span>시간 ";
  }
  bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

  // 자동차의 평균 시속은 60km/h, 분속은 1000m/min
  var carTime = (distance / 1000) | 0;
  var carHour = "",
    carMin = "";

  if (carTime > 60) {
    carHour = '<span class="number">' + Math.floor(carTime / 60) + "</span>시간 ";
  }
  carMin = '<span class="number">' + (carTime % 60) + "</span>분";

  // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
  var content = '<ul class="dotOverlay distanceInfo">';
  content += "    <li>";
  content +=
    '        <span class="label">총거리</span><span class="number">' +
    distance / 1000 +
    "</span>km";
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">도보</span>' + walkHour + walkMin;
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">자동차</span>' + carHour + carMin;
  content += "    </li>";
  content += "</ul>";

  return content;
}
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 700px;
}

.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: "";
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png");
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
#map {
  width: 100%;
  height: 500px;
}
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
