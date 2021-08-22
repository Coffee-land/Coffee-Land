let menuEl = document.getElementById("menu");
let products = []
let cart = []
function Product(name, price, type){
    this.name = name;
    this.price = price;
    this.imgurl = `img/${name}.jpg`;
    this.type = type;
    this.quantity = 1;
    products.push(this);
}
new Product('americano-cold', 12,'cold');
new Product('americano', 12,'hot');
new Product('bean', 30,'beans');
new Product('beanBag', 30,'beans');
new Product('latte', 15,'hot');
new Product('latteCold', 15,'cold');
function pushToStorage(){
    localStorage.clear;
    localStorage.setItem('cart' , JSON.stringify(cart));
}
function renderMenu(productType){
    menuEl.innerHTML = '';
    let ulEl = document.createElement('ul');
    menuEl.appendChild(ulEl);
}