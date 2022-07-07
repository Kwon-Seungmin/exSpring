console.log('start vue');
let lunchVue;
let contentVue;
let mapVue;


document.addEventListener('DOMContentLoaded', () => {
    var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point([127.391055,36.428902]).transform('EPSG:4326','EPSG:3857')
    });

    var iconStyle = new ol.style.Style({
        image : new ol.style.Icon({
            opacity: 1,
            scale: 1,
            src: './marker.png'
        }),
        zindex: 10
    });

    iconFeature.setStyle(iconStyle);

    var markerLayer = new ol.layer.Vector({
        features:[iconFeature],
    });

    var vectorSource = new ol.source.Vector({
        features:[iconFeature]
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });


    var wms = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8180/geoserver/seungminlunch/wms?service=WMS', //레이어 url
            params: {
                'VERSION': '1.1.0', //버전
                'LAYERS': 'seungminlunch:daejeon', //작업공간: 레이어 명
                'BBOX': [127.38111114501953, 36.413265228271484, 127.40605926513672, 36.43330001831055],
                'SRS': 'EPSG:4326', //SRID
                'FORMAT': 'image/png'
            },
            serverType: 'geoserver',
            visible: true,
            title: 'wms'
        })
    });

    var map = new ol.Map({
        target: 'map',
        layers: [rasterLayer, vectorLayer, wms],
        view: new ol.View({
            zoom: 15,
            center: ol.proj.fromLonLat([127.391055, 36.428902])
        })
    });

    function marker(x,y){
        console.log('marker');
        map.getView().setZoom(18);
        map.getView().setCenter(ol.proj.fromLonLat([x,y]));
        
    }
    
    // button click event

    // document.getElementById('btnLoad').addEventListener('click', e => {
    //     console.log('load lunch');
    //     contentVue.member();
    // });

    // document.getElementById('btnMClr').addEventListener('click', e => {
    //     console.log('clear member list');
    //     contentVue.memberClear();
    // });

    // document.getElementById('btnRClr').addEventListener('click', e => {
    //     console.log('clear rest list');

    //     lunchVue.restClear();
    // });
    // document.getElementById('btnRP').addEventListener('click', e=>{
    //     console.log('recommend point lunch');

    //     contentVue.recommendPoint();

    // });
    // document.getElementById('btnRD').addEventListener('click', e=>{
    //     console.log('recommend distance lunch');

    //     contentVue.recommendDistance();

    // });
    document.getElementById('btnSearch').addEventListener('click', e=>{
        console.log('search Restaurant');

        contentVue.search();
    });


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
                    params:{
                    }
                });
                this.memberList = response.data;

                this.checkAllMembers();
            },
            async recommend() {
                console.log('recommend button');
                const response1 = await axios({
                    method: 'get',
                    url: `/recommend/${lunchVue.picked}`,
                    params:{
                        checkedMembers: this.checkedMembers.join(',')
                    }
                });
                lunchVue.restList = response1.data;                  
            },

            // async recommendPoint() {
            //     const response1 = await axios({
            //         method: 'get',
            //         url: '/recommend/point',
            //         params:{
            //             checkedMembers: this.checkedMembers.join(',')
            //         }
            //     });
            //     lunchVue.restList = response1.data;
            // },
            // async recommendDistance() {
            //     const response1 = await axios({
            //         method: 'get',
            //         url: '/recommend/distance',
            //         params:{
            //             checkedMembers: this.checkedMembers.join(',')
            //         }
            //     });
            //     lunchVue.restList = response1.data;
            // },
            async search() {
                const response2 = await axios ({
                    method: 'get',
                    url: '/search',
                    params: {
                        searchRest : this.searchRest
                    }
                });

                if(contentVue.searchRest == '') {
                    alert('식당 명을 입력해주세요.');
                    return;
                }
                 lunchVue.restList = response2.data;
                 if(lunchVue.restList.length == 0) {
                    alert('검색 결과가 없습니다.');
                    return;
                }
                
            },                   
            memberClear() {
                this.checkedMembers = [];
            },
            checkAllMembers() {                                       
                this.memberList.forEach(member => {                              
                    this.checkedMembers.push(member.memberId);
                });
            },
            test() {
                console.log('test method');
            }
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
            restList: []
        },
        methods: {
            init() {
                console.log('init lunch vue');
            },
                        
            restClear() {
                this.restList = [];
            },
            // 메소드명 변경
            test() {
                console.log('test table');
                // 이벤트 처리
            },
            marker1(e){
                marker(e.currentTarget.getAttribute('lon'),e.currentTarget.getAttribute('lat'));
                //marker();
            },
            changeRadio() {
                console.log('change radio');
                mapVue.categoryRest();
            }
        },
        created() {
            console.log('create lunch vue');
        }
    });

    //mapVue 설정
    mapVue = new Vue({
        el : '#mapCtrlWrap',
        data : {            
            categoryButton:[],
            restCategory: ''
        },
        methods : { 
            init(){
                console.log('map Vue init');
            },
            async category() {
                const response = await axios ({
                    method: 'get',
                    url: '/category',
                    params: {
                    }
                });
                this.categoryButton = response.data;
                console.log('load cateogry list');
            },

            async categoryRest(e) {                
                var target = e?.currentTarget;                
                if(target) this.restCategory = target.value;
                var category = this.restCategory;
                // const response = await axios ({
                //     method: 'get',
                //     url: '/category/filter',
                //     params:{
                //         restCategory: e.currentTarget.value
                //     }
                // });        
                if(contentVue.checkedMembers.length == 0) {
                    alert('한 명 이상 선택해주세요.');
                    return;
                }

                const response = await axios({
                    method: 'get',
                    url: `/recommend/${lunchVue.picked}2`,
                    params:{
                        checkedMembers: contentVue.checkedMembers.join(','),
                        restCategory: this.restCategory
                    }
                });
                
                lunchVue.restList = response.data;                
                // 초기화
                vectorSource.clear();                
                
                // marker 추가
                lunchVue.restList.forEach(rest => {
                    var iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point([rest.restLon,rest.restLat]).transform('EPSG:4326','EPSG:3857')
                    });
                    
            
                    var iconStyle = new ol.style.Style({
                        image : new ol.style.Icon({
                            opacity: 1,
                            scale: 1,
                            src: `./${category}.png`
                        }),
                        zindex: 10
                    });
                    iconFeature.setStyle(iconStyle);
                    vectorSource.addFeature(iconFeature);

                })
                
            },
            test1() {
                console.log('btn test btn');
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

