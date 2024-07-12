import { callApi } from "./api-client.js";
import cartOperations from "./cart-service.js";

async function loadPizzas() {
    const url = "https://raw.githubusercontent.com/bhavya2309/domnios-app-project/main/dominos.json";
    
    try {
        const response = await callApi(url);
        const obj = await response.json();
        printAllPizza(obj.Vegetarian); 
    } catch (e) {
        console.log('Error while calling API ! ',e);
    }

}

loadPizzas();


/* printing all the pizzas */
function printAllPizza(pizzas) {
    pizzas.forEach(p => {
        printPizza(p);
    });
}


/* printing one pizza */
function printPizza(pizza) {

    const boxDiv = document.createElement('div');
    boxDiv.className = "box";

    const image = document.createElement('img');
    image.src = pizza.assets.menu['0'].url;
    image.alt = "pizza" + pizza.id;
    image.className = "product-image";

    const h2 = document.createElement('h2');
    h2.className = "product-title";
    h2.innerText = pizza.name;

    const p1 = document.createElement('p');
    p1.className = "product-price";
    p1.innerText = "₹ " + pizza.price; 

    const p2 = document.createElement('p');
    p2.className = "product-description";
    p2.innerText = pizza["menu_description"];

    const button = document.createElement('button');
    button.className = "add-to-cart-btn";
    button.innerText = "Add to Cart";
    button.setAttribute("pizza-id",pizza);
    button.addEventListener('click',function() {
        cartOperations.addToCart(pizza);
    });

    boxDiv.appendChild(image);
    boxDiv.appendChild(h2);
    boxDiv.appendChild(p1);
    boxDiv.appendChild(p2);
    boxDiv.appendChild(button);

    const div = document.getElementById('pizza');
    div.appendChild(boxDiv);

}

/* printing shopping cart */
export function printCart(pizza) {

    const cartDiv = document.createElement('div');
    cartDiv.className = "cart-item";

    const image = document.createElement('img');
    image.src = pizza.assets.menu['0'].url;
    image.alt = "pizza" + pizza.id;
    image.className = "cart-item-image";

    const p1 = document.createElement('p');
    p1.innerText = pizza.name;

    const p2 = document.createElement('p');
    p2.innerText = "₹ " + pizza.price;

    const button = document.createElement('button');
    button.className = "remove-btn";
    button.setAttribute("pizza-id",pizza.id);
    button.addEventListener('click',function() {
        cartOperations.removeFromCart(this.getAttribute("pizza-id"));
    });
    button.innerText = "Remove";

    cartDiv.appendChild(image);
    cartDiv.appendChild(p1);
    cartDiv.appendChild(p2);
    cartDiv.appendChild(button);

    const div = document.getElementById('cart');
    div.appendChild(cartDiv);

}

/* loading previous pizzas from browsers storage */
function loadCart(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(p => {
        printCart(p);
    });
    updateTotal();
}

/* update cart display after making changes */
export function updateCartDisplay() {
    const div = document.getElementById('cart');
    div.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(p => {
        printCart(p);
    });
}

/* updating cart total */
export function updateTotal() {
    const total = cartOperations.computeTotal();
    const price = document.getElementById('total-price');
    price.innerText =  "₹ " + total;
}


loadCart();