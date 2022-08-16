window.onload = function() {

let lunchVue;
let contentVue;
let mapVue;
let lastSelectedCategory = "";
let sumLon = 0;
let sumLat = 0;

//icon 추가
function addIcon(a, b, c) {
  restIconFeature = new ol.Feature({
    geometry: new ol.geom.Point([a, b]).transform("EPSG:4326", "EPSG:3857"),
  });

  let iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      scale: 0.18,
      src: `./img/${c}.png`,
    }),
    zindex: 10,
  });

  restIconFeature.setStyle(iconStyle);
  vectorSource.addFeature(restIconFeature);
}

let gaiaIconFeature = new ol.Feature({
  geometry: new ol.geom.Point([127.391055, 36.428902]).transform(
    "EPSG:4326",
    "EPSG:3857"
  ),
});

let iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    opacity: 1,
    scale: 0.5,
    src: "./img/gaia3d.png",
  }),
  zindex: 10,
});

gaiaIconFeature.setStyle(iconStyle);

let vectorSource = new ol.source.Vector({
  features: [gaiaIconFeature],
});

let vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  zindex: 999,
});

let rasterLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

//geoserver에서 불러옴
let wms = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8180/geoserver/seungminlunch/wms?service=WMS", //레이어 url
    params: {
      VERSION: "1.1.0", //버전
      LAYERS: "seungminlunch:rest", //작업공간: 레이어 명
      BBOX: [
        127.38111114501953, 36.413265228271484, 127.40605926513672,
        36.43330001831055,
      ],
      SRS: "EPSG:4326", //SRID
      FORMAT: "image/png",
    },
    serverType: "geoserver",
    title: "wms",
  }),
  visible: true,
  zindex: 1,
});

let map = new ol.Map({
  target: "map",
  layers: [rasterLayer, wms, vectorLayer],
  view: new ol.View({
    zoom: 17,
    center: ol.proj.fromLonLat([127.391055, 36.428902]),
  }),
});

//팝업창
let popupTable = document.createElement("table");
popupTable.classList.add("popupTable");

let popupCloser = document.createElement("a");
popupCloser.classList.add("popupTableCloser");
popupCloser.href = "#";

document.body.appendChild(popupTable);

let overlay = new ol.Overlay({
  element: popupTable,
});

function makePopup(a, b, c) {
  popupTable.innerHTML = "";

  popupTable.appendChild(popupCloser);

  let coordinate = new ol.geom.Point([a, b]).transform(
    "EPSG:4326",
    "EPSG:3857"
  );
  c.forEach((menu) => {
    let menuTr = document.createElement("tr");
    popupTable.appendChild(menuTr);

    let menuTd = document.createElement("td");
    menuTd.classList.add();
    menuTr.appendChild(menuTd);
    menuTd.innerHTML = menu.menu + menu.price;
  });

  map.addOverlay(overlay);
  overlay.setPosition(coordinate.flatCoordinates);
}

popupCloser.onclick = function () {
  overlay.setPosition(undefined);
  popupCloser.blur();
  return false;
};

//회사 중심
function zoomGaia() {
  map.getView().setZoom(17);
  map.getView().setCenter(ol.proj.fromLonLat([127.391055, 36.428902]));
}
//식당 중심
function zoomRest(x, y) {
  map.getView().setZoom(18);
  map.getView().setCenter(ol.proj.fromLonLat([x, y]));
}
//카테고리 중심
function zoomCenter(a, b) {
  map.getView().setZoom(17);
  map.getView().setCenter(ol.proj.fromLonLat([a, b]));
  sumLon = 0;
  sumLat = 0;
}

// geoserver wms on/off
function wmsLayerOn() {
  wms.setVisible(true);
}
function wmsLayerOff() {
  wms.setVisible(false);
}

document.getElementById("btnSearch").addEventListener("click", search);

let checkedMemberList = [];
let rest;

document.getElementById("btnRecommend").addEventListener("click", recommend);

async function recommend() {
  lastSelectedCategory = "";
  try {
    const response = await axios.get(`/restaurant/${picked}/member`, {
      params: {
        checkedMemberList: checkedMemberList.join(","),
      },
    });

    restList = response.data;

    vectorSource.clear();
    restList.forEach((rest) => {
      addIcon(rest.restLon, rest.restLat, rest.restCategory);
      sumLon += rest.restLon * 1;
      sumLat += rest.restLat * 1;
    });
    zoomCenter(sumLon / restList.length, sumLat / restList.length);

    vectorSource.addFeature(gaiaIconFeature);
  } catch (e) {
    alert(e);
  }
}

async function search() {
  let rest = document.getElementById("searchRest").value;
  console.log(rest);
  try {
    const response = await axios.get("/restaurant/search", {
      params: {
        rest: rest,
      },
    });
    if (rest == "") {
      alert("식당 명을 입력해주세요.");
      return;
    }
    restList = response.data;
    console.log(response.data);
    console.log(restList.length);
    if (restList.length == 0) {
      document.getElementById("scrolltable").innerHTML = "";
      let nottingTable = document.createElement("table");
      nottingTable.classList.add("restTable");
      document.getElementById("scrolltable").appendChild(nottingTable);
      nottingTable.innerHTML = "결과 없음";
      document.getElementById("restListLength").innerHTML = restList.length;

      alert("검색 결과가 없습니다.");
      return;
    }
    restList.forEach((rest) => {
      console.log(rest.restLon);
      addIcon(rest.restLon, rest.restLat, rest.restCategory);
    });
    makeRestTable(restList);
    document.getElementById("restListLength").innerHTML = restList.length;
  } catch (e) {
    alert(e);
  }
}

function makeRestTable(a) {
  document.getElementById("scrolltable").innerHTML = "";
  a.forEach((rest) => {
    let restTable = document.createElement("table");
    restTable.classList.add("restTable");

    document.getElementById("scrolltable").appendChild(restTable);

    let restTr = document.createElement("tr");
    restTable.appendChild(restTr);

    let restNameTd = document.createElement("td");
    restNameTd.innerHTML = rest.restName;
    let restCategoryTd = document.createElement("td");
    restCategoryTd.innerHTML = rest.restCategory;
    restCategoryTd.style.float = "right";

    restTr.appendChild(restNameTd);
    restTr.appendChild(restCategoryTd);

    let restAddrTd = document.createElement("td");
    restAddrTd.innerHTML = rest.restAddr;
    restAddrTd.setAttribute("colspan", "2");
    restTable.appendChild(restAddrTd);
  });
}

// lunch vue 설정

let picked = "point";
let restList = [];
let restId = "";
let restMenuList = [];

function restClear() {
  this.restList = [];
}

async function restClick(e) {
  let menuLon = e.currentTarget.getAttribute("lon");
  let menuLat = e.currentTarget.getAttribute("lat");
  try {
    const response = await axios.get("/menu", {
      params: {
        restId: e.currentTarget.getAttribute("value"),
      },
    });

    menuList = response.data;
    makePopup(menuLon, menuLat, menuList);
    zoomRest(menuLon, menuLat);
  } catch {
    alert(error);
  }
}

function changeRadio() {
  //최근 목록 출처
  if (lastSelectedCategory == "") {
    contentVue.recommend();
    return;
  }
  if (lastSelectedCategory != "") {
    mapVue.categoryRest();
    return;
  }
}

//mapVue 설정

let restCategory = "";

function wmsOn() {
  wmsLayerOn();
}

function wmsOff() {
  wmsLayerOff();
}

function gaiaOn() {
  zoomGaia();
}


function checkAllMembers() {
  document.getElementsByClassName("memberName").setAttribute("checked", "true");
}

let memberList = [];
let memberEvenTable = document.createElement("table");
memberEvenTable.classList.add("memberEvenTable");

let memberOddTable = document.createElement("table");
memberOddTable.classList.add("memberOddTable");


document.querySelector(".memberList").appendChild(memberEvenTable);
document.querySelector(".memberList").appendChild(memberOddTable);


async function selectMember() {
  try {
    const response = await axios.get("/member", { parmas: {} });
    memberList = response.data;

    setMemberList(memberList);
  } catch (e) {
    throw e;
  }
}

function setMemberList(memberList) {
  memberList.forEach((member) => {
    let memberTr = document.createElement("tr");

    let memberTd = document.createElement("td");
    memberTr.appendChild(memberTd);

    let memberLabel = document.createElement("label");
    memberTd.appendChild(memberLabel);

    let memberCheckBox = document.createElement("input");
    memberCheckBox.setAttribute("type", "checkbox");
    memberCheckBox.setAttribute("name", "memberName");
    memberCheckBox.setAttribute("id", member.memberId);
    memberCheckBox.setAttribute("checked", "true");
    
    memberLabel.appendChild(memberCheckBox);
    memberLabel.innerHTML += member.memberKrName;

    checkedMemberList.push(member.memberId);
    if (member.memberId % 2 == 0) {
      memberEvenTable.appendChild(memberTr);
    } else if (member.memberId % 2 == 1) {
      memberOddTable.appendChild(memberTr);
    }
  });
}

selectMember();



document.getElementById("clearAllMembers")
  .addEventListener("click", clearAllMembers);
function clearAllMembers() {
  checkedMemberList = [];
  console.log(memberList);
  memberList.forEach((member) => {
    console.log(member.memberId);
    document.getElementById(member.memberId).checked = false;
    console.log(document.getElementById(member.memberId));

  })
}


let categoryButton = [];
let categoryTable = document.createElement("table");
categoryTable.classList.add("categoryTable");

document.querySelector(".btn-group").appendChild(categoryTable);

async function category() {
  try {
    const response = await axios.get("/restaurant/category", { params: {} });
    categoryButton = response.data;

    categoryButton.forEach((category) => {
      let categoryTr = document.createElement("tr");
      categoryTable.appendChild(categoryTr);

      let categoryTd = document.createElement("td");
      categoryTr.appendChild(categoryTd);

      let categoryBtn = document.createElement("button");
      categoryBtn.setAttribute("type", "button");
      categoryBtn.setAttribute("name", "category");
      
      categoryTd.appendChild(categoryBtn);
      categoryBtn.innerHTML = category.restCategory;
    });
  } catch (e) {
    throw e;
  }
}
category();

async function categoryRest(e) {
  if (checkedMemberList.length == 0) {
    alert("인원을 선택해주세요.");
    return;
  }

  let target = e?.currentTarget;
  if (target) restCategory = target.value;
  lastSelectedCategory = this.restCategory;
  try {
    const response = await axios.get(`/restaurant/${picked}/category`, {
      params: {
        checkedMemberList: checkedMemberList.join(","),
        restCategory: this.restCategory,
      },
    });
    restList = response.data;

    vectorSource.clear();
    restList.forEach((rest) => {
      addIcon(rest.restLon, rest.restLat, lastSelectedCategory);
      sumLon += rest.restLon * 1;
      sumLat += rest.restLat * 1;
    });

    zoomCenter(sumLon / restList.length, sumLat / restList.length);

    vectorSource.addFeature(gaiaIconFeature);
  } catch(e) {
    alert(e);
  }
}

};