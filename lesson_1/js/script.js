const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return fetch(url)
    .then((res) => res.json())
}

service(GET_BASKET_GOODS_ITEMS).then((data) => {
    debugger
})

function init() {
    const CustomButton = Vue.component('custom-button', {
        template:`
        <button class="search-button" type="button" v-on:click="$emit('click')">
            <slot></slot>
        </button>
        `
    })
    const basketGoods = Vue.component('basket-goods', {
        data() {
            return {
                basketGoodsItems: []
            }
        },

        template:`
        <div class="fixed-area">
            <div class="basket-card">
                <div class="basket-card__header">
                    <h1 class="basket-card__header__title">basket card</h1>
                    <div class="basket-card__header__delete-icon" v-on:click="$emit('closeclick')"></div>
                </div>
                <div class="basket-card__content">
                    content
                </div>
            </div>
        </div>
        `
    })

    const goodsItem = Vue.component('goods-item', {
        props: [
            'item'
        ],
        template:`
        <div class="goods-item">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }}</p>
        </div>
        `
    })

    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            filteredItems: [],
            search: '',
            cardIsVision: false
        },
        methods: {
            setVisionCard() {
                this.cardIsVision = !this.cardIsVision
            },
            fetchGoods() {
                service(GET_GOODS_ITEMS).then((data) => {
                        this.items = data;
                        this.filteredItems = data;
                });
            },
            filterItems() {
                this.filteredItems = this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'gui'))
                })
            },
            // setVisibleCard() {
            //     this.isVisibleCart = !this.isVisibleCart;
            // }
        },
        computed: {
            calculatePrice() {
                return this.filteredItems.reduce((prev, { price }) => {
                    return prev + price;
                }, 0)
            }
        },
        mounted() {
            this.fetchGoods();
        }
    })
}
window.onload = init

// class GoodsItem {
//     constructor({ product_name, price }) {
//         this.product_name = product_name;
//         this.price = price;
//     }
    
//     render() {
//         return `
//         <div class="goods-item">
//             <h3>${this.product_name}</h3>
//             <p>${this.price}</p>
//         </div>
//     `;
//     }
// }

// class GoodsList {
//     items = [];
//     fetchGoods() {
//        return service(GET_GOODS_ITEMS).then((data) => {
//             this.items = data;
//         });
//     }
//     calculatePrice() {
//         return this.items.reduce((prev, { price }) => {
//             return prev + price;
//         }, 0)
//     }
//     render() {
//         const goods = this.items.map(item => {
//             const goodItem = new GoodsItem(item);
//             return goodItem.render()
//         }).join('');


//         document.querySelector('.goods-list').innerHTML = goods;
//     }
// }
// const goodsList = new GoodsList();
// goodsList.fetchGoods().then(() => {
//     goodsList.render()
// })
