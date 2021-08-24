'use strict';

//here get menu by ID
let menuEl = document.getElementById("menu");
// array for all prodact 
let products = []
// array for cart to save prodact in cart 
let cart = []
let total = 0;
// constracter for product 
function Product(name, price, type) {
    this.name = name;
    this.price = price;
    this.imgurl = `images/${name}.jpg`;
    this.type = type;
    this.quantity = 1;
    products.push(this);
}
// create prodacts each product have type and price and name 
// Cold coffee
new Product('Honey_Almondmilk_Cold_Brew', 3, 'cold');
new Product('Iced_Apple_Crisp_Macchiato', 4, 'cold');
new Product('Iced_Caffè_Americano', 3, 'cold');
new Product('Iced_Caffè_Mocha', 3, 'cold');
new Product('Iced_Chocolate_Almondmilk', 4, 'cold');
new Product('Iced_Espresso', 3, 'cold');
new Product('Iced_White_Chocolate_Mocha', 3, 'cold');
new Product('Pumpkin_Cream_Cold_Brew', 4, 'cold');
//Hot coffee
new Product('Apple_Crisp_Macchiato', 3, 'hot');
new Product('Blonde_Roast', 4, 'hot');
new Product('Caffè_Americano', 3, 'hot');
new Product('Caffè_Misto', 3, 'hot');
new Product('Caffè_Mocha', 4, 'hot');
new Product('Cappuccino', 3, 'hot');
new Product('Espresso', 3, 'hot');
new Product('Pumpkin_Spice_Latte', 4, 'hot');
// Coffee beans
new Product('brazil_brown', 3, 'beans');
new Product('colombia_blonde', 4, 'beans');
new Product('german_blonde', 3, 'beans');
new Product('Ireland_blonde', 3, 'beans');
new Product('poland_brown', 4, 'beans');
new Product('romania_brown', 3, 'beans');
// Snacks
new Product('Blueberry_Scone', 15, 'snacks');
new Product('Chocolate_Chip_Cookie', 15, 'snacks');
new Product('Cinnamon_Coffee_Cake', 15, 'snacks');
new Product('Double_Chocolate_Brownie', 15, 'snacks');
new Product('Marshmallow_Dream_Bar', 15, 'snacks');
new Product('Pumpkin_Cream_Cheese_Muffin', 15, 'snacks');

// checking localStorage 
function checkingLocalStorage() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        console.log('l');
        cart = [];
    }
}
checkingLocalStorage();
// save item in localStorage 
function pushToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// to render items and menu
function renderMenu(productType) {
    menuEl.innerHTML = '';
    let ulEl = document.createElement('ul');
    menuEl.appendChild(ulEl);
    for (let i = 0; i < products.length; i++) {
        if (productType === products[i].type) {
            let liEl = document.createElement('li');
            let imgEl = document.createElement('img');
            let inputEl = document.createElement('input');
            let buttonEl = document.createElement('button');
            let spanEl = document.createElement('span');
            let temName = '';
            for(let j = 0; j < products[i].name.split('_').length; j++){
                temName += `${products[i].name.split('_')[j]} `
            }
            spanEl.textContent = temName;
            imgEl.src = products[i].imgurl;
            inputEl.type = 'number';
            inputEl.value = '1';
            inputEl.min = '1';
            inputEl.max = '30';
            inputEl.id = `input${i}`
            inputEl.required;
            buttonEl.textContent = 'Add to cart';
            buttonEl.addEventListener('click', function () {
                checkingLocalStorage()
                let boolen = true;
                for (let j = 0; j < cart.length; j++) {
                    if (products[i].name === cart[j].name) {
                        cart[j].quantity = parseInt(cart[j].quantity) + parseInt(document.getElementById(`input${i}`).value);
                        boolen = false;
                    }
                }
                if (boolen) {
                    products[i].quantity = parseInt(document.getElementById(`input${i}`).value);
                    cart.push(products[i]);
                }
                pushToStorage();
                total = 0;
                for(let x = 0; x < cart.length; x++){
                    total += cart[x].quantity * cart[x].price;
                }
                inputEl.value = '1';
            });
            liEl.appendChild(imgEl);
            liEl.appendChild(spanEl);
            liEl.appendChild(buttonEl);
            liEl.appendChild(inputEl);
            ulEl.appendChild(liEl);
        }
    }
}
renderMenu('hot');
setInterval(function(){
    checkingLocalStorage();
    total = 0;
    for(let x = 0; x < cart.length; x++){
        total += cart[x].quantity * cart[x].price;
    }
        document.getElementById('total').innerHTML = total;},
    100);
    
// lolololololololololololololololoololololololololol