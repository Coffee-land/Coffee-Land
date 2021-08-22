'use strict';

let table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  let rawCart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsArray = new Array();
  for (let index = 0; index < rawCart.items.length; index++) {
    cartItemsArray.push(new CartItem(
      rawCart.items[index].product,
      rawCart.items[index].quantity));
  }
  cart = new Cart(cartItemsArray);
}

function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  let cartTBodyEls = document.getElementById('cart').getElementsByTagName('tbody');
  for (let tBodyEl of cartTBodyEls) {
    while (tBodyEl.firstChild) {
      tBodyEl.removeChild(tBodyEl.firstChild);
    }
  }
}

function showCart() {

  let cartTBodyEls = document.getElementById('cart').getElementsByTagName('tbody');
  
  for (let index = 0; index < 1; index++) {
    let cartTBodyEl = cartTBodyEls[index];

    for (let j = 0; j < cart.items.length; j++) {

      let newRowEl = document.createElement('tr');
     
      let deleteTDEl = document.createElement('td');
      deleteTDEl.setAttribute('id', cart.items[j].product);
      let anchorEl = document.createElement('a');
      anchorEl.setAttribute('href', '#delete-link');
      anchorEl.setAttribute('id', cart.items[j].product);
      anchorEl.addEventListener('click', removeItemFromCart);
      anchorEl.innerText = 'X';
      deleteTDEl.appendChild(anchorEl);
      newRowEl.appendChild(deleteTDEl);

      let qtyTDEl = document.createElement('td');
      qtyTDEl.innerText = cart.items[j].quantity;
      newRowEl.appendChild(qtyTDEl);
      let itemTDEl = document.createElement('td');

      itemTDEl.innerText = cart.items[j].product;
      newRowEl.appendChild(itemTDEl);
      cartTBodyEl.appendChild(newRowEl);
    }
  }
}

function removeItemFromCart(event) {
  let itemToRemove = event.target.id;
  for (let index = 0; index < cart.items.length; index++)
  {
    if (cart.items[index].product === itemToRemove)
    {
      cart.removeItem(cart.items[index]);
    }
  }
  cart.saveToLocalStorage();
  renderCart();
}

renderCart();


$('.plus').click( function() {
    var product = $(this).closest('.product')
    var q = product.data('quantity') + 1;
    product.data('quantity', q);
    updateProduct(product);
  });
  
  $('.minus').click( function() {
    var product = $(this).closest('.product')
    var q = Math.max(1, product.data('quantity') - 1); 
    product.data('quantity', q);
    updateProduct(product);
  });

  function updateBill() {
    var subtotal = 0;
    var delivery = 5;
    var total = 0;
    $('.product').each(function () {
      subtotal += $(this).data('quantity') * $(this).data('price');
    });
    total = subtotal +  delivery;
    $('.subtotal .value').text('$ ' + subtotal.toFixed(2));
    $('.total .value').text('$ ' + total.toFixed(2));
  }