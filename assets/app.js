// fetch('assets/products.json')
//   .then(function(response) {
//     return response.json();
//    })
//   .then(function(user) {
//     console.log(user);
//   })
//   .catch( alert );    

$(function(){

let cart = [];
if (localStorage.cart != undefined) cart = JSON.parse(localStorage.cart);
let cartCount = cart.length;
var container = document.getElementById("app");
document.querySelector('header').innerHTML = `<h1 class="caption">Интернет магазин телефонов</h1><div class="cart"><i class="material-icons">
shopping_cart
</i><span class="count" id="cart-count">${cartCount}</span></div>`;


function buy (e) {
  let n = e.target.id.substr(7,2);
  if (cart.length > 0) cart.forEach(function(val,i){
    
  });
  cart.push(phones[n]);
  cart[cart.length - 1].qty = 1;
  cartCount = cart.length;
  document.querySelector('#cart-count').innerHTML = `${cartCount}`;
  localStorage.clear();
  localStorage.cart = JSON.stringify(cart);
}

function cartView(event){
  if (cartCount == 0) {
    modalWindow('Корзина', 'В вашей корзине нет товаров' ,['Продолжить покупки'], function (n){
      }
      , 300,'white','red');
      return;
    };

    function modalEvents(e){
      let s = e.target.id;
      s = s.substr(0,3);
      if (s != 'inc' && s != 'dec') return;
      let n = parseIntBack(e.target.id);
      if (n === NaN) return;
      if (s == 'inc' && cart[n].qty < cart[n].countProducts) cart[n].qty++;
      if (s == 'dec' && cart[n].qty > 0) cart[n].qty--;
      document.querySelector(`#qty${n}`).innerHTML = cart[n].qty;
      }

  let total = 0;

  let cartText = '<table>';
  cartText += '<tr>';
  cartText += '<td width=10%>№</td>';
  cartText += '<td width=10%>Фото</td>';
  cartText += '<td width=40%>Наименование</td>';
  cartText += '<td width=15%>Цена</td>';
  cartText += '<td width=25%>Количество</td></tr>';
  for (let n = 0; n < cart.length; n++) {
    cartText += `<tr>`;
    cartText += `<td>${n+1}</td>`;
    cartText += `<td><img src="http://apeps.kiev.ua/images/phones/${cart[n].id}.jpg"></td>`;
    cartText += `<td>${cart[n].productName}</td>`;
    cartText += `<td>${numberToString(cart[n].priceUAH)}</td>`;
    cartText += `<td><button id="inc${n}" class="inc">+</button>`;
    cartText += `<span id="qty${n}">${cart[n].qty}</span>`;
    cartText += `<button id="dec${n}" class="dec">-</button></td></tr>`;
    total += cart[n].qty * cart[n].priceUAH;
  }
  cartText += '</table>';
  cartText += `Итого: ${numberToString(total,2)}`;

  modalWindow('Корзина',cartText ,['Оформить заказ', 'Продолжить покупки'], function (n){
    let i = 0;
    while (i < cart.length) {
    if (cart[i].qty == 0) {cart.splice(i,1)} else i++;
    cartCount = cart.length;
    document.querySelector('#cart-count').innerHTML = `${cartCount}`;
    localStorage.clear();
    localStorage.cart = JSON.stringify(cart);

}

    }
    , 600, 400, 'black','white', modalEvents)};

document.querySelector('.cart').addEventListener('click',cartView);

phones.forEach (function (a, number) {
  var available = a.countProducts > 0 ? `В наличии: ${a.countProducts}` : 'Нет на складе';
  var availableImg = a.countProducts > 0 ? '' : 'class=half-vision';
  var availableClass = a.countProducts > 0 ? '' : ' red';
  let btnVisible = a.countProducts == 0 ? 'hidden' : 'visible';
  var rateString = starRateWrite(a.productRate);
  container.innerHTML += `
  <div class='product-item'>
  <div class=brand>${a.brandName}</div>
  <h4 class=product>${number+1}. ${a.productName}</h4>
  <img ${availableImg} src="assets/img/${a.id}.jpg">
  <h4 class=price><span ${availableImg}>${a.priceUAH} UAH</span></h4>

  <h4 class="count${availableClass}">${available}</h4>
  <h4>Характеристики:</h4>
  <div class=description>
  <ul>
    <li>ОС: ${a.operationSystem}</li>
    <li>Количество сим-карт: ${a.numSimCard}</li>
  </ul>
  </div> <!--description-->
  <h4 class=rate>${rateString}</h4>


  <h4 class=views>Просмотров: <span>${a.countViews}</span></h4>
  <h4 class=buy><button type=submit id="product${number}" style="visibility:${btnVisible}">Купить</button></h4>
  </div>`;
}
);

for (var n = 0; n < 8; n++) {
  let el = document.querySelector(`#product${n}`);
  el.addEventListener('click', function(e) {
    buy(e);
  let coord = el.parentElement.parentElement.getBoundingClientRect();
  console.log(coord.x, coord.y); 
  })
}

});