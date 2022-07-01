console.log('start vue');
let restVue;

document.addEventListener('DOMContentLoaded', () => {
    //button click event
    document.getElementById('btnLoad').addEventListener('click', e =>{
        console.log('load');

        restVue.list();
    });
    document.getElementById('btnCompare').addEventListener('click', e => {
        console.log('compare')
    })
    document.getElementById('btnReset').addEventListener('click', e => {
        console.log('reset');

        restVue.reset();
    });


    document.getElementsByName('category')
        .foreach(category => {
            category.addEventListener('change', e=> {
                console.log('change category');
                console.log(this);
                console.log(e.target.value);

                restVue.category = e.target.value;
                restVue.list();
            })
        });


    //restVue 설정
    restVue = new restVue({
        el : '#restWrap',
        data : {
            restList: [],
            category: ''
        },
        methods: {
            init() {
                console.log('init rest vue')
            },
            async list() {
                //axios 사용 
                const response = await axios({
                    method: 'get',
                    url:'/list.do',
                    params: {
                        category: this.category
                    }
                });

                console.log(response)

                this.restList = response.data;
            },
            reset() {
                this.restList = [];
            }
        },
        created() {
            console.log('create rest vue');
        }       
    });

    restVue.init();

})


  var i;
  let lunchList = [];
  let randN = 0;


  document.getElementById("cant").addEventListener('click', click_human);
  //먹기싫은거 빼기
  function click_human() {
    click_reset();
    for (i = 0; i < a.length; i++) {
      if (ch_Kim.checked == true) {
        if (a[i].category.includes(human.Kim.hate) == false) {

          if (ch_Lee.checked == true) {
            if (a[i].category.includes(human.Lee.hate) == false) {

              if (ch_Park.checked == true) {
                if (a[i].category.includes(human.Park.hate) == false) {
                  lunchList.push(a[i]);
                  console.log("111")
                }
              } else {
                lunchList.push(a[i]);
                console.log("110")
              }
            }
          } else if (ch_Park.checked == true) {
            if (a[i].category.includes(human.Park.hate) == false) {
              lunchList.push(a[i]);
              console.log("101")
            }
          } else {
            lunchList.push(a[i]);
            console.log("100")
          }
        }
      } else if (ch_Lee.checked == true) {
        if (a[i].category.includes(human.Lee.hate) == false) {
          if (ch_Park.checked == true) {
            if (a[i].category.includes(human.Park.hate) == false) {
              lunchList.push(a[i]);
              console.log("011")
            }
          } else {
            lunchList.push(a[i]);
            console.log("010")
          }
        }
      } else if (ch_Park.checked == true) {
        if (a[i].category.includes(human.Park.hate) == false) {
          lunchList.push(a[i]);
          console.log("001");
        }
      }
    }
    make_randN();

  }

  document.getElementById("reset").addEventListener('click', click_reset);

  function click_reset() {
    lunchList = [];
  }

  function make_randN() {
    let randN = Math.floor((Math.random() * 10 + 1)) % lunchList.length;
    console.log(randN)
    console.log(lunchList[randN])
    addMarker();
  }






  //마커 소스
  var markerSource = new ol.source.Vector();

  // addMarker();

  //마커 함수
  function addMarker() {
    //좌표
    var point_feature = new ol.Feature({
      geometry: new ol.geom.Point([lunchList[randN].longitude ,
    lunchList[randN].latitude]).transform('EPSG:4326','EPSG:3857')
    });
    markerSource.addFeature(point_feature);
  }


  var markerStyle = new ol.style.Style({
    image: new ol.style.Icon({
      opacity: 1,//투명도 1 = 100%
      scale:0.1,//크기 1 = 100%

      //marker 이미지, 해당 point를 marker로 변경한다.
      src: './marker04.png'
    }),
    //html의 css, z-index 기능이다.
    zindex: 10
  });

  //마커 레이어 생성
  markerLayer = new ol.layer.Vector({
    source: markerSource, //마커 feature 들
    style: markerStyle // 마커 스타일
  });

  // 지도에 마커가 그려진 레이어 추가
  map.addLayer(markerLayer);