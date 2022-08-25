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
    console.log(checkedMemberList);
  }

  //---------------------------------------------

  document.getElementById("btnSearch").addEventListener("click", search);
  document
    .getElementById("btnAllClear")
    .addEventListener("click", clearAllMember);
  document
    .getElementById("btnAllCheck")
    .addEventListener("click", checkAllMember);
  document.getElementById("btnRecommend").addEventListener("click", recommend);
  document.getElementById("btnGeoOn").addEventListener("click", wmsLayerOn);
  document.getElementById("btnGeoOff").addEventListener("click", wmsLayerOff);
  document.getElementById("btnGaia").addEventListener("click", zoomGaia);

  let memberList = [];
  let lastSelectedCategory = "";
  let picked = "point";
  let restList = [];
  let restCategory = "";
  let categoryButton = [];
  let checkedMemberList = [];

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

      checkedMemberList.push(member.memberId);
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
    checkedMemberList = [];
  }

  function checkAllMember() {
    memberList.forEach(function (member) {
      document.getElementById(member.memberId).checked = true;
      checkedMemberList.push(member.memberId);
    });
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

  function makeRestTable(a) {
    document.getElementById("scrolltable").innerHTML = "";
    a.forEach((rest) => {
      const restTable = document.createElement("table");
      restTable.classList.add("restTable");
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
    console.log(e.currentTarget.getAttribute("lon"));
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
    } catch (e) {
      alert(e);
    }
  }

  function changeRadio() {
    //최근 목록 출처
    if (lastSelectedCategory == "") {
      recommend();
      return;
    }
    if (lastSelectedCategory != "") {
      categoryRest();
      return;
    }
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

        categoryTd.appendChild(categoryBtn);
        categoryBtn.innerHTML = category.restCategory;

        document
          .getElementById(category.restCategory)
          .addEventListener("click", categoryRest);
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
    lastSelectedCategory = restCategory;
    try {
      const response = await axios.get(`/restaurant/${picked}/category`, {
        params: {
          checkedMemberList: checkedMemberList.join(","),
          restCategory: restCategory,
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
    } catch (e) {
      alert(e);
    }
  }
};
