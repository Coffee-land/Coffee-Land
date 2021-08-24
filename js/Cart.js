'use strict';
let containerEl = document.getElementById('container');
let footerEl = document.getElementById('site-footer');
let subtotalArr = [];
let subtotal = 0;
let total = 0;
let shipping = 5;
let cart = JSON.parse(localStorage.getItem('cart'));
function upToDataStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderCart() {
  containerEl.innerHTML = '';
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      let sectionEl = document.createElement('section');
      sectionEl.id = 'cart';
      containerEl.appendChild(sectionEl);

      let articleEl = document.createElement('article');
      articleEl.className = "product";
      sectionEl.appendChild(articleEl);

      let headerEl = document.createElement('header');
      articleEl.appendChild(headerEl);

      let aEl = document.createElement('a');
      aEl.className = "remove";
      headerEl.appendChild(aEl);

      let imgEl = document.createElement('img');
      imgEl.src = cart[i].imgurl;
      aEl.appendChild(imgEl);

      let h3El = document.createElement('h3');
      h3El.textContent = 'Remove product';
      h3El.addEventListener('click', function () {
        cart.splice(i, 1);
        subtotalArr.splice(i,1);
        upToDataStorage();
        renderCart();
        renderFooter();
      })
      aEl.appendChild(h3El);

      let divEl = document.createElement('div');
      divEl.className = 'content';
      articleEl.appendChild(divEl);

      let h1El = document.createElement('h1');
      let temName = '';
      for(let j = 0; j < cart[i].name.split('_').length; j++){
          temName += `${cart[i].name.split('_')[j]} `
      }
      h1El.textContent = temName;
      divEl.appendChild(h1El);

      let footerEl1 = document.createElement('footer');
      footerEl1.className = 'content';
      articleEl.appendChild(footerEl1);

      let span1El = document.createElement('span');
      span1El.className = 'qt-minus';
      span1El.textContent = '-';
      span1El.addEventListener('click', function () {
        if (cart[i].quantity > 1) {
          cart[i].quantity--;
        }
        upToDataStorage();
        renderCart();
        renderFooter()
      })
      footerEl1.appendChild(span1El);

      let span2El = document.createElement('span');
      span2El.className = 'qt';
      span2El.textContent = cart[i].quantity;
      footerEl1.appendChild(span2El);

      let span3El = document.createElement('span');
      span3El.className = 'qt-plus';
      span3El.textContent = '+';
      span3El.addEventListener('click', function () {
        cart[i].quantity++;
        upToDataStorage();
        renderCart();
        renderFooter()
      })
      footerEl1.appendChild(span3El);

      let h2El = document.createElement('h2');
      h2El.className = 'full-price';
      h2El.textContent = cart[i].quantity * cart[i].price + 'JOD';
      subtotalArr[i] = cart[i].quantity * cart[i].price;
      footerEl1.appendChild(h2El);

      let h2El2 = document.createElement('h2');
      h2El2.className = 'price';
      h2El2.textContent = cart[i].price + 'JOD';
      footerEl1.appendChild(h2El2);
    }
  }
}
renderCart();

function renderFooter() {
  footerEl.innerHTML = '';
  let divEl1 = document.createElement('div');
  divEl1.className = 'container clearfix';
  footerEl.appendChild(divEl1);

  let divEl2 = document.createElement('div');
  divEl2.className = 'left';
  divEl1.appendChild(divEl2);

  let h2El = document.createElement('h2');
  h2El.className = 'subtotal';
  subtotal = 0;
  for (let i = 0; i < subtotalArr.length; i++) {
    subtotal += subtotalArr[i];
    console.log(subtotalArr[i]);
  }
  console.log(subtotalArr);

  h2El.textContent = `Subtotal: ${subtotal}JOD`
  divEl2.appendChild(h2El);

  let h3El = document.createElement('h3');
  h3El.className = 'shipping';
  h3El.textContent = `Shipping: ${shipping}JOD`
  divEl2.appendChild(h3El);

  let divEl3 = document.createElement('div');
  divEl3.className = 'right';
  divEl1.appendChild(divEl3);

  let h1El = document.createElement('h1');
  h1El.className = 'total';
  total = subtotal + shipping;
  if (subtotal === 0) {
    total = 0;
  }
  h1El.textContent = `Total: ${total}JOD`
  divEl3.appendChild(h1El);

  let aEl = document.createElement('a');
  aEl.className = 'btn';
  aEl.textContent = 'Checkout';
  aEl.addEventListener('click', openForm)
  divEl3.appendChild(aEl);


}
renderFooter();

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
