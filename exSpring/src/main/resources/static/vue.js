console.log('start vue');
let lunchVue;


document.addEventListener('DOMContentLoaded', () => {
    // button click event
    document.getElementById('btnLoad').addEventListener('click', e => {
       console.log('load lunch');

       lunchVue.list();
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
            lunchList: [],
            category: ''
        },
        methods: {
            init() {
                console.log('init lunch vue');
            },
            async list() {
                // axios 사용 1
                const response = await axios({
                    method: 'get',
                    url: '/lunch',
                    params: {
                        category: this.category
                    }
                });

                console.log('1');
                console.log(response);
                console.log('2');

                this.lunchList = response.data;

                // axios 사용 2
                // await axios({
                //     method: 'get', // get, post
                //     url: '/lunch',
                //     params: {
                //         category: this.category,
                //     }
                // }).then(result => {
                //     console.log(result);
                //     this.lunchList = result.data;
                // });
            },
            clear() {
                this.lunchList = [];
            }
        },
        created() {
            console.log('create lunch vue');
        }

    });

    lunchVue.init();

});


