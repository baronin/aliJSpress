document.addEventListener('DOMContentLoaded', () => {

    const searchClass = document.querySelector('.search');
    const cartBtnId = document.getElementById('cart');
    const wishListBtnId = document.getElementById('wishlist');
    const cartClass = document.querySelector('.cart');
    const closeCart = document.querySelector('.cart-close');
    const goodWrapper = document.querySelector('.goods-wrapper');

    goodWrapper.appendChild(createCardGoods())

    const openCart = () => {
        cartClass.style.display = 'block';
    };
    const isCloseCart = (event) => {
        const target = event.target;
        if (target === closeCart || target.classList.contains('cart-close')) {
            cartClass.style.display = "none";
        }
    };
    const isCloseEsc = cartBtnId.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            cartClass.style.display = "none";
        }
    };

    cartBtnId.addEventListener('click', openCart);
    closeCart.addEventListener('click', isCloseCart);

    isCloseEsc();
});


const createCardGoods = (id, title, price, img) => {
    const card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="img/${img}" alt="">
                            <button
                            class="card-add-wishlist"
                            data-goods-id-${id}
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
                    `
    return card;
}
