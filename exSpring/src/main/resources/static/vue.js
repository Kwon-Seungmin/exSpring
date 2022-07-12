console.log('start vue');
let lunchVue;
let contentVue;
let mapVue;
let lastSelectedCategory = '';
var avLon = 0;
var avLat = 0;

document.addEventListener('DOMContentLoaded', () => {
    //icon 추가 함수
    function addIcon(a, b, c) {
        iconFeature1 = new ol.Feature({
            geometry : new ol.geom.Point([a, b]).transform('EPSG:4326', 'EPSG:3857')
        });
        
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1,
                scale: 0.18,
                src: `./img/${c}.png`
            })
        });

        iconFeature1.setStyle(iconStyle);
        vectorSource.addFeature(iconFeature1);

    };


    var iconFeature = new ol.Feature({
        geometry : new ol.geom.Point([127.391055, 36.428902]).transform('EPSG:4326', 'EPSG:3857')
    });

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1,
            scale: 0.5,
            src: './img/gaia3d.png'
        }),
        zindex: 10
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
        features: [iconFeature] 
    });

    var vectorLayer = new ol.layer.Vector({
        source:  vectorSource,
        zindex: 999
    });

    var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var wms = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8180/geoserver/seungminlunch/wms?service=WMS', //레이어 url
            params: {
                'VERSION': '1.1.0', //버전
                'LAYERS': 'seungminlunch:rest', //작업공간: 레이어 명
                'BBOX': [127.38111114501953, 36.413265228271484, 127.40605926513672, 36.43330001831055],
                'SRS': 'EPSG:4326', //SRID
                'FORMAT': 'image/png'
            },
            serverType: 'geoserver',
            title: 'wms'
        }),
        visible: true,
        zindex: 1
    });

    var map = new ol.Map({
        target: 'map',
        layers: [rasterLayer, wms,vectorLayer ],
        view: new ol.View({
            zoom: 17,
            center: ol.proj.fromLonLat([127.391055, 36.428902])
        })
    });

    let popTable = document.createElement('table');
    popTable.classList.add('popTable');

    let popCloser = document.createElement('a');
    popCloser.classList.add('popTableCloser');
    popCloser.href = "#";
    
    document.body.appendChild(popTable);

    var overlay = new ol.Overlay({
        element: popTable,
    });

    function makePop(a, b, c) {
        popTable.innerHTML = '';

        

    popTable.appendChild(popCloser);

        var coordinate = new ol.geom.Point([a, b]).transform('EPSG:4326', 'EPSG:3857')
        c.forEach(menu => {
            let menuTr = document.createElement('tr');
            popTable.appendChild(menuTr);

            let menuTd = document.createElement('td');
            menuTd.classList.add();
            menuTr.appendChild(menuTd);
            menuTd.innerHTML = menu.menu + menu.price;
        })

        map.addOverlay(overlay);
        overlay.setPosition(coordinate.flatCoordinates);
    };

    popCloser.onclick = function () {
        overlay.setPosition(undefined);
        popCloser.blur();
        return false;
    };

    function zoomRest(x, y) {
        map.getView().setZoom(18);
        map.getView().setCenter(ol.proj.fromLonLat([x, y]));
    }
    function zoomGaia() {
        map.getView().setZoom(17);
        map.getView().setCenter(ol.proj.fromLonLat([127.391055, 36.428902]));
    }
    function zoomCenter(a,b) {
        map.getView().setZoom(17);
        map.getView().setCenter(ol.proj.fromLonLat([a,b]));
        avLon = 0;
        avLat = 0;
    }


    function wmsLayerOn() {

        
        wms.setVisible(true);
    }
    function wmsLayerOff() {

        
        wms.setVisible(false);
    }


    //contentVue 설정
    contentVue = new Vue({
        el: '#contentWrap',
        data: {
            memberList: [],
            checkedMembers: [],
            searchRest: ''
        },
        methods: {
            init() {
                console.log('init content vue');
            },
            async member() {
                const response = await axios({
                    method: 'get',
                    url: '/member',
                    params: {
                    }
                });
                this.memberList = response.data;

                this.checkAllMembers();
            },
            async recommend() {
                lastSelectedCategory = '';

                const response1 = await axios({
                    method: 'get',
                    url: `/recommend/${lunchVue.picked}`,
                    params: {
                        checkedMembers: this.checkedMembers.join(',')
                    }
                });

                lunchVue.restList = response1.data;

                vectorSource.clear();
                lunchVue.restList.forEach(rest => {
                    addIcon(rest.restLon,rest.restLat,rest.restCategory);
                    avLon += rest.restLon *1;
                    avLat += rest.restLat *1;
                });
                zoomCenter(avLon/lunchVue.restList.length,avLat/lunchVue.restList.length);

                vectorSource.addFeature(iconFeature);


            },

            async search() {

  
                const response2 = await axios({
                    method: 'get',
                    url: '/search',
                    params: {
                        searchRest: this.searchRest
                    }
                });
                if (contentVue.searchRest == '') {
                    alert('식당 명을 입력해주세요.');
                    return;
                }

                lunchVue.restList = response2.data;
                if (lunchVue.restList.length == 0) {
                    alert('검색 결과가 없습니다.');
                    return;
                }
                lunchVue.restList.forEach(rest => {
                    addIcon(rest.restLon,rest.restLat,rest.restCategory);
                });
                vectorSource.addFeature(iconFeature);
            },
            memberClear() {
                this.checkedMembers = [];
            },
            checkAllMembers() {
                this.checkedMembers = [];
                this.memberList.forEach(member => {
                    this.checkedMembers.push(member.memberId);
                });
            },
        },
        created() {
            console.log('create content vue');
        }
    });

    // lunch vue 설정
    lunchVue = new Vue({
        el: '#lunchWrap',
        data: {
            picked: 'point',
            restList: [],
            restId: '',
            restMenuList: []
        },
        methods: {
            init() {
                console.log('init lunch vue');
                console.log('ffff')
            },

            restClear() {
                this.restList = [];
            },
            // 메소드명 변경

            async restClick(e) {

                var menuLon = e.currentTarget.getAttribute('lon');
                var menuLat = e.currentTarget.getAttribute('lat');

                const response = await axios({
                    method: 'get',
                    url: '/restmenu',
                    params: {
                        restId: e.currentTarget.getAttribute('value')
                    }
                });

                menuList = response.data;
                makePop(menuLon, menuLat, menuList);
                zoomRest(menuLon, menuLat);

            },
            changeRadio() {

                if (lastSelectedCategory == '') {
                    contentVue.recommend();
                    return;
                }
                if (lastSelectedCategory != '') {
                    mapVue.categoryRest();
                    return;
                }

            }
        },
        created() {
            console.log('create lunch vue');
        }
    });

    //mapVue 설정
    mapVue = new Vue({
        el: '#mapCtrlWrap',
        data: {
            categoryButton: [],
            restCategory: '',
        },
        methods: {
            init() {
                console.log('map Vue init');
            },
            async category() {
                const response = await axios({
                    method: 'get',
                    url: '/category',
                    params: {
                    }
                });
                this.categoryButton = response.data;
                console.log('load cateogry list');
            },

            async categoryRest(e) {

                if (contentVue.checkedMembers.length == 0) {
                    alert('인원을 선택해주세요.');
                    return;
                }

                var target = e?.currentTarget;
                if (target) this.restCategory = target.value;
                lastSelectedCategory = this.restCategory;
                const response = await axios({
                    method: 'get',
                    url: `/recommend/${lunchVue.picked}2`,
                    params: {
                        checkedMembers: contentVue.checkedMembers.join(','),
                        restCategory: this.restCategory
                    }
                });
                

                lunchVue.restList = response.data;


                vectorSource.clear();
                lunchVue.restList.forEach(rest => {
                    addIcon(rest.restLon, rest.restLat, lastSelectedCategory);
                    avLon += rest.restLon * 1;
                    avLat += rest.restLat * 1;
                });
                zoomCenter(avLon/lunchVue.restList.length,avLat/lunchVue.restList.length);
                vectorSource.addFeature(iconFeature);

            },
            wmsOn() {
                wmsLayerOn();
            },
            wmsOff() {
                wmsLayerOff();
            },
            gaiaOn() {
                zoomGaia();
            }
        },
        created() {

        }
    });


    contentVue.init();
    contentVue.member();
    lunchVue.init();
    mapVue.init();
    mapVue.category();


});

