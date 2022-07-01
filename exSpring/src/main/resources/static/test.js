console.log('start vue');
let lunchVue;

document.addEventListener('DOMContentLoaded', () => {
    // button click event
    document.getElementById('btnLoad').addEventListener('click', e => {
       console.log('load lunch');

       lunchVue.rest();
    });
    document.getElementById('btnClear').addEventListener('click', e => {
       console.log('clear lunch');

       lunchVue.clear();
    });

    document.getElementsByName('category')
        .forEach(category => {
            category.addEventListener('change', e => {
                console.log('change category');
                console.log(this);
                console.log(e.target.value);

                lunchVue.category = e.target.value;
                lunchVue.list();
        })
    });

    // lunch vue 설정
    lunchVue = new Vue({
        el: '#lunchWrap',
        data: {
            restList: [],
            restName: ''
        },
        methods: {
            init() {
                console.log('init lunch vue');
            },
            async rest() {

                const response1 = await axios({
                    method: 'get',
                    url : '/rest',
                    params: {
                    category : this.category
                    }
                });
                console.log(response1);
                console.log('rest');

                this.restList = response1.data;
            },
            clear() {
                this.restList = [];
            },


        },
        created() {
            console.log('create lunch vue');
        }

    });

    lunchVue.init();

});

