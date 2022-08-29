window.onload = function () {
  let sumLon = 0;
  let sumLat = 0;

  //icon 추가
  function addIcon(a, b, c) {
    const restIconFeature = new ol.Feature({
      geometry: new ol.geom.Point([a, b]).transform("EPSG:4326", "EPSG:3857"),
    });

    const iconStyle = new ol.style.Style({
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

  const gaiaIconFeature = new ol.Feature({
    geometry: new ol.geom.Point([127.391055, 36.428902]).transform(
      "EPSG:4326",
      "EPSG:3857"
    ),
  });

  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,
      scale: 0.5,
      src: "./img/gaia3d.png",
    }),
    zindex: 10,
  });

  gaiaIconFeature.setStyle(iconStyle);

  const vectorSource = new ol.source.Vector({
    features: [gaiaIconFeature],
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    zindex: 999,
  });

  const rasterLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
  });

  //geoserver에서 불러옴
  const wms = new ol.layer.Tile({
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

  const map = new ol.Map({
    target: "map",
    layers: [rasterLayer, wms, vectorLayer],
    view: new ol.View({
      zoom: 17,
      center: ol.proj.fromLonLat([127.391055, 36.428902]),
    }),
  });

  //팝업창
  const popupTable = document.createElement("table");
  popupTable.classList.add("popupTable");

  const popupCloser = document.createElement("a");
  popupCloser.classList.add("popupTableCloser");
  popupCloser.href = "#";

  document.body.appendChild(popupTable);

  const overlay = new ol.Overlay({
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
      const menuTr = document.createElement("tr");
      popupTable.appendChild(menuTr);

      const menuTd = document.createElement("td");
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
    isCheckedMember();
    console.log(lunchMemberList);
  }

  //---------------------------------------------

  document.getElementById("btnSearch").addEventListener("click", search);
  document
    .getElementById("btnClearAll")
    .addEventListener("click", clearAllMember);
  document
    .getElementById("btnAddAll")
    .addEventListener("click", addAllMember);
  document.getElementById("btnRecommend").addEventListener("click", recommend);
  document.getElementById("searchCriteriaRadio").addEventListener("click", changeRadio);
  document.getElementById("btnGeoOn").addEventListener("click", wmsLayerOn);
  document.getElementById("btnGeoOff").addEventListener("click", wmsLayerOff);
  document.getElementById("btnGaia").addEventListener("click", zoomGaia);
  



  let memberList = [];
  let lastSelectedCategory = "";
  let searchCriteria = "point";
  let restList = [];
  let menuList = [];
  let categoryButton = [];
  let lunchMemberList = [];

  async function getMemberList() {
    try {
      const response = await axios.get("/member");
      memberList = response.data;
      makeMemberTable(memberList);
    } catch (e) {
      throw e;
    }
  }

  function makeMemberTable(a) {
    // 멤버 두 줄로 표시하기 위해 id 값 기준 짝,홀수로 나눔
    const memberEvenTable = document.createElement("table");
    memberEvenTable.classList.add("memberEvenTable");

    const memberOddTable = document.createElement("table");
    memberOddTable.classList.add("memberOddTable");

    document.querySelector(".memberList").appendChild(memberEvenTable);
    document.querySelector(".memberList").appendChild(memberOddTable);

    a.forEach((member) => {
      const memberTr = document.createElement("tr");
      const memberTd = document.createElement("td");
      const memberLabel = document.createElement("label");
      const memberCheckBox = document.createElement("input");

      memberTr.appendChild(memberTd);
      memberTd.appendChild(memberLabel);
      memberLabel.appendChild(memberCheckBox);

      memberCheckBox.setAttribute("type", "checkbox");
      memberCheckBox.setAttribute("name", "memberName");
      memberCheckBox.setAttribute("id", member.memberId);
      memberCheckBox.setAttribute("checked", "true");

      memberLabel.innerHTML += member.memberKrName;

      lunchMemberList.push(member.memberId);
      if (member.memberId % 2 == 0) {
        memberEvenTable.appendChild(memberTr);
      } else if (member.memberId % 2 == 1) {
        memberOddTable.appendChild(memberTr);
      }
    });
  }

  getMemberList();

  function clearAllMember() {
    memberList.forEach(function (member) {
      document.getElementById(member.memberId).checked = false;
    });
    lunchMemberList = [];
  }

  function addAllMember() {
    memberList.forEach(function (member) {
      document.getElementById(member.memberId).checked = true;
      lunchMemberList.push(member.memberId);
    });
  }

  function checkLunchMemberList(){
    lunchMemberList = [];
    memberList.forEach(function (member) {
      if (document.getElementById(member.memberId).checked == 1){

      lunchMemberList.push(member.memberId);
      }
    })
  }

  async function search() {
    const rest = document.getElementById("searchRest").value;

    try {
      const response = await axios.get("/restaurant/search", {
        params: { rest: rest },
      });
      if (rest == "") {
        alert("식당 명을 입력해주세요.");
        return;
      }
      
      restList = response.data;

      if (restList.length == 0) {
        document.getElementById("scrolltable").innerHTML = "";

        let noResultTable = document.createElement("table");
        noResultTable.classList.add("restTable");

        document.getElementById("scrolltable").appendChild(noResultTable);

        noResultTable.innerHTML = "결과 없음";

        document.getElementById("restListLength").innerHTML = restList.length;

        alert("검색 결과가 없습니다.");
        return;
      }
      vectorSource.clear();
      restList.forEach((rest) => {
        console.log(rest.restLon);
        addIcon(rest.restLon, rest.restLat, rest.restCategory);
        sumLon += rest.restLon * 1;
        sumLat += rest.restLat * 1;
      });
      zoomCenter(sumLon / restList.length, sumLat / restList.length);

      vectorSource.addFeature(gaiaIconFeature);
      makeRestTable(restList);
      document.getElementById("restListLength").innerHTML = restList.length;
    } catch (e) {
      alert(e);
    }
  }

  async function recommend() {
    checkLunchMemberList();
    checkRadio();
    lastSelectedCategory = "";
    try {
      const response = await axios.get(`/restaurant/${searchCriteria}/member`, {
        params: {
          lunchMemberList: lunchMemberList.join(","),
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
      makeRestTable(restList);
    } catch (e) {
      alert(e);
    }
  }

  function makeRestTable(a) {
    document.getElementById("restListLength").innerHTML = a.length;
    document.getElementById("scrolltable").innerHTML = "";
    a.forEach((rest) => {
      const restTable = document.createElement("table");
      restTable.classList.add("restTable");
      restTable.setAttribute("id", rest.restId);
      restTable.setAttribute("lon", rest.restLon);
      restTable.setAttribute("lat", rest.restLat);

      restTable.addEventListener("click", restClick);

      document.getElementById("scrolltable").appendChild(restTable);

      const restTr = document.createElement("tr");
      restTable.appendChild(restTr);

      const restNameTd = document.createElement("td");
      restNameTd.innerHTML = rest.restName;
      const restCategoryTd = document.createElement("td");
      restCategoryTd.innerHTML = rest.restCategory;
      restCategoryTd.style.float = "right";

      restTr.appendChild(restNameTd);
      restTr.appendChild(restCategoryTd);

      const restAddrTd = document.createElement("td");
      restAddrTd.innerHTML = rest.restAddr;
      restAddrTd.setAttribute("colspan", "2");
      restTable.appendChild(restAddrTd);
    });
  }

  async function restClick(e) {
    let menuLon = e.currentTarget.getAttribute("lon");
    let menuLat = e.currentTarget.getAttribute("lat");
    try {
      const response = await axios.get("/menu", {
        params: {
          restId: e.currentTarget.getAttribute("id"),
        },
      });

      menuList = response.data;
      makePopup(menuLon, menuLat, menuList);
      zoomRest(menuLon, menuLat);
    } catch (e) {
      alert(e);
    }
  }

  //라디오버튼 확인
  function checkRadio() {
    if (document.querySelector(".searchCriteriaRadio .point").checked){
      searchCriteria = "point";
    } else if(documnet.getElementById("distance").checked){
      searchCriteria = "distance";
    } 
  }
  function changeRadio() {
    if (document.getElementById("point").checked){
      searchCriteria = "point";
    }
    console.log(searchCriteria);
    // if (lastSelectedCategory == "") {
    //   recommend();
    //   return;
    // }
    // if (lastSelectedCategory != "") {
    //   categoryRest();
    //   return;
    // }
  }

  const categoryTable = document.createElement("table");
  categoryTable.classList.add("categoryTable");

  document.querySelector(".btn-group").appendChild(categoryTable);

  async function category() {
    try {
      const response = await axios.get("/restaurant/category", { params: {} });
      categoryButton = response.data;

      categoryButton.forEach((category) => {
        const categoryTr = document.createElement("tr");
        categoryTable.appendChild(categoryTr);

        const categoryTd = document.createElement("td");
        categoryTr.appendChild(categoryTd);

        const categoryBtn = document.createElement("button");
        categoryBtn.setAttribute("type", "button");
        categoryBtn.setAttribute("name", "category");
        categoryBtn.setAttribute("id", category.restCategory);

        categoryBtn.addEventListener("click", categoryRest);

        categoryTd.appendChild(categoryBtn);
        categoryBtn.innerHTML = category.restCategory;
      });
    } catch (e) {
      throw e;
    }
  }
  category();

  async function categoryRest(e) {
    checkLunchMemberList();
    if (lunchMemberList.length == 0) {
      alert("인원을 선택해주세요.");
      return;
    }

    let target = e.currentTarget.getAttribute("id");
    lastSelectedCategory = target;
    console.log(e.currentTarget.getAttribute("id"));
    try {
      const response = await axios.get(`/restaurant/${searchCriteria}/category`, {
        params: {
          lunchMemberList: lunchMemberList.join(","),
          restCategory: target,
        },
      });
      restList = response.data;

      vectorSource.clear();
      restList.forEach((rest) => {
        addIcon(rest.restLon, rest.restLat, lastSelectedCategory);
        sumLon += rest.restLon * 1;
        sumLat += rest.restLat * 1;
      });
      makeRestTable(restList);

      zoomCenter(sumLon / restList.length, sumLat / restList.length);

      vectorSource.addFeature(gaiaIconFeature);
    } catch (e) {
      alert(e);
    }
  }
};
