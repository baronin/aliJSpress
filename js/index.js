document.addEventListener('DOMContentLoaded', () => {

    const cartBtnId = document.getElementById('cart');
    const wishListBtnId = document.getElementById('wishlist');
    const closeCartClass = document.querySelector('.cart-close');
    const goodWrapperClass = document.querySelector('.goods-wrapper');
    const cartClass = document.querySelector('.cart');
    const categoryClass = document.querySelector('.category');
    const searchClass = document.querySelector('.search');
    const cardCounter = cartBtnId.querySelector('.counter');
    const wishListCounter = wishListBtnId.querySelector('.counter');

    let wishlist = [];

    const loading = () => {
        goodWrapperClass.innerHTML = `
    <div id="spinner"><div class="spinner-loading"><div><div><div></div>
    </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>`;
    }

    const urlAPI = 'db/db.json';
    const getGoodsAPI = (handler, filter) => {
        loading();
        fetch(urlAPI)
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `
                            <div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="img/${img}" alt="">
                            <button
                            class="card-add-wishlist ${wishlist.includes(id) ? 'active' : ''}"
                            data-goods-id="${id}"
                            ></button>
                        </div>
                        <div class="card-body justify-content-between">
                            <a href="#" class="card-title">${title}</a>
                            <div class="card-price">${price} ₽</div>
                            <div>
                                <button class="card-add-cart">Добавить в корзину</button>
                            </div>
                        </div>
                    </div>
                        `;
        return card;
    };

    const randomSort = goods => goods.sort(() => Math.random() - 0.5);
    const chooseCategories = event => {
        event.preventDefault();
        goodWrapperClass.textContent = '';
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const cat = target.dataset.category;
            getGoodsAPI(renderCard, goods => goods
                .filter(item => item.category.includes(cat)));
        }
    };
    const renderCard = goods => {
        goodWrapperClass.textContent = "";
        if (goods.length) {
            goods.forEach(({id, title, price, imgMin}) => {
                goodWrapperClass.append(
                    createCardGoods(id, title, price, `../${imgMin}`));
            });
        } else {
            goodWrapperClass.textContent = "Didn't found a product";
        }
    };

    const openCart = event => {
        event.preventDefault();
        cartClass.style.display = 'block';
        document.addEventListener('keyup', isCloseCart);
    };
    const isCloseCart = event => {
        event.preventDefault();
        const target = event.target;
        if (target === cartBtnId
            || target.classList.contains('cart-close')
            || event.key === 2) {
            cartClass.style.display = 'none';
            document.removeEventListener('keyup', isCloseCart);
        }
    };

    const searchGoods = event => {
        event.preventDefault();
        const input = event.target.elements.searchGoods;
        const inputValue = input.value.trim();
        if (inputValue !== '') {
            const searchString = new RegExp(inputValue, 'i');
            getGoodsAPI(renderCard, goods => goods.filter(item => searchString.test(item.title)));
        } else {
            searchClass.classList.add('error')
            setTimeout(() => {
                searchClass.classList.remove('error')
            }, 2000)
        }
        input.Value = '';
    };

    const checkCount = () => {
        wishListCounter.textContent = wishlist.length;
    };

    const storageQuery = (get) => {
        if (get) {
            if (localStorage.getItem('wishlist')) {
                const wishListStorage = JSON.parse(localStorage.getItem('wishlist'));
                wishListStorage.forEach((id) => wishlist.push(id));
            }
        } else {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        checkCount();
    };

    const toggleWishlist = (id, el) => {
        if (wishlist.includes(id)) {
            wishlist.splice(wishlist.indexOf(id), 1);
            el.classList.remove('active');
        } else {
            wishlist.push(id);
            console.log(wishlist);
            el.classList.add('active');
        }
        checkCount();
        storageQuery();
    };

    const handlerGoods = event => {
        const target = event.target;
        console.log(target.dataset.goodsId);

        if (target.classList.contains('card-add-wishlist')) {
            toggleWishlist(target.dataset.goodsId, target);
        }
    };

    const showWishList = () => {
        getGoodsAPI(renderCard, goods => goods.filter(item => wishlist.includes(item.id)))
    }
    cartBtnId.addEventListener('click', openCart);
    closeCartClass.addEventListener('click', isCloseCart);
    categoryClass.addEventListener('click', chooseCategories);
    searchClass.addEventListener('submit', searchGoods);
    goodWrapperClass.addEventListener('click', handlerGoods);
    wishListBtnId.addEventListener('click', showWishList);

    getGoodsAPI(renderCard, randomSort);
    storageQuery(true);
});

