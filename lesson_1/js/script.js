// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];
const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return fetch(url)
    .then((res) => res.json())
}

function init() {
    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            filteredItems: [],
            search: '',
            isVisibleCart: false
        },
        methods: {
            fetchGoods() {
                setTimeout (() => {
                    service(GET_GOODS_ITEMS).then((data) => {
                        this.items = data;
                        this.filteredItems = data;
                });
                }, 2000)
            },
            filterItems() {
                this.filteredItems = this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'gui'))
                })
            },
            setVisibleCard() {
                this.isVisibleCart = !this.isVisibleCart;
            }
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
