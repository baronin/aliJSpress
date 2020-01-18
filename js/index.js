document.addEventListener('DOMContentLoaded', () => {

  const searchClass = document.querySelector('.search');
  const cartBtnId = document.getElementById('cart');
  const wishListBtnId = document.getElementById('wishlist');
  const cartClass = document.querySelector('.cart');
  const closeCart = document.querySelector('.cart-close');
  const goodWrapper = document.querySelector('.goods-wrapper');
  const categoryClass = document.querySelector('.category');

  const urlAPI = 'db/db.json';
  const getGoodsAPI = (handler, filter) => {
    loading();
    fetch(urlAPI)
        .then(response => response.json())
        .then(filter)
        .then(handler);
  };
  goodWrapper.textContent = '';
  const randomSort = goods => goods.sort(() => Math.random() - 0.5);

  const renderCart = goods => {
    goods.forEach((item) => {
      const { id, title, price, imgMin } = item;
      goodWrapper.appendChild(
          createCardGoods(id, title, price, `../${ imgMin }`));
    });
  };

  const chooseCategories = event => {
    event.preventDefault();
    goodWrapper.textContent = '';
    const target = event.target;

    if (target.classList.contains('category-item')) {
      const cat = target.dataset.category;
      getGoodsAPI(renderCart, goods => goods
          .filter(item => item.category.includes(cat)));
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


  cartBtnId.addEventListener('click', openCart);
  closeCart.addEventListener('click', isCloseCart);
  categoryClass.addEventListener('click', chooseCategories);

  getGoodsAPI(renderCart, randomSort);
  const createCardGoods = (id, title, price, img) => {
    const card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="img/${ img }" alt="">
                            <button
                            class="card-add-wishlist"
                            data-goods-id-${ id }
                            ></button>
                        </div>
                        <div class="card-body justify-content-between">
                            <a href="#" class="card-title">${ title }</a>
                            <div class="card-price">${ price } ₽</div>
                            <div>
                                <button class="card-add-cart">Добавить в корзину</button>
                            </div>
                        </div>
                    </div>
                    `;
    return card;
  };

});

