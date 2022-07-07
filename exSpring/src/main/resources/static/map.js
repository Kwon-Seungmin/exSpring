var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });

        var map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                vectorLayer
            ],
            view: new ol.View({
                zoom: 15,
                center: ol.proj.fromLonLat([127.391055, 36.428902])
            })
        });

        document.getElementById("btnsearch").addEventListener('click', btnSearch);

        function btnSearch(){
        	console.log('scriptSearch');
        };



        /* var markerLayer;
     //   //마커 소스
       var markerSource = new ol.source.Vector();

         addMarker();

        //마커 함수
        function addMarker() {
          //좌표
          var point_feature = new ol.Feature({
            geometry: new ol.geom.Point([lunchList[randN].longitude,
            lunchList[randN].latitude]).transform('EPSG:4326', 'EPSG:3857')
          });
          markerSource.addFeature(point_feature);
        }

        // markerSource.addFeature(point_feature);

        var markerStyle = new ol.style.Style({
          image: new ol.style.Icon({
            opacity: 1,//투명도 1 = 100%
            scale: 0.1,//크기 1 = 100%

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
        map.addLayer(markerLayer); */


