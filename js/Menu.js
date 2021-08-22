'use strict';

//here get menu by ID
let menuEl = document.getElementById("menu");
// array for all prodact 
let products = []
// array for cart to save prodact in cart 
let cart = []

// constracter for product 
function Product(name, price, type){
    this.name = name;
    this.price = price;
    this.imgurl = `img/${name}.jpg`;
    this.type = type;
    this.quantity = 1;
    products.push(this);
}
// create prodacts each product have type and price and name 
new Product('americano-cold', 12,'cold');
new Product('americano', 12,'hot');
new Product('bean', 30,'beans');
new Product('beanBag', 30,'beans');
new Product('latte', 15,'hot');
new Product('latteCold', 15,'cold');

// checking localStorage 
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
}
// save item in localStorage 
function pushToStorage(){

    localStorage.setItem('cart' , JSON.stringify(cart));
    
}

// to render items and menu
function renderMenu(productType){
    menuEl.innerHTML = '';
    let ulEl = document.createElement('ul');
    menuEl.appendChild(ulEl);
    for (let i = 0; i < products.length; i++){
        if(productType === products[i].type){
            let liEl = document.createElement('li');
            let imgEl = document.createElement('img');
            let inputEl = document.createElement('input');
            let buttonEl = document.createElement('button');
            imgEl.src = products[i].imgurl;
            imgEl.style.height = '100px';
            inputEl.type = 'number';
            inputEl.value = '1';
            inputEl.min = '1';
            inputEl.max = '30';
            inputEl.id = `input${i}`
            inputEl.required;
            buttonEl.textContent = 'Add to cart';
            buttonEl.addEventListener('click', function(){
                products[i].quantity = document.getElementById(`input${i}`).value;
                cart.push(products[i]);
                pushToStorage();
                inputEl.value = '1';
            });
            liEl.appendChild(imgEl);
            liEl.appendChild(inputEl);
            liEl.appendChild(buttonEl);
            ulEl.appendChild(liEl);
        }
    }
}
