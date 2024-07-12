import { printCart } from "./pizza-controller.js";
import { updateCartDisplay } from "./pizza-controller.js";
import { updateTotal } from "./pizza-controller.js";

const cartOperations = {
    addToCart(pizza){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(pizza);
        localStorage.setItem('cart',JSON.stringify(cart));
        printCart(pizza);
        updateTotal();
        console.log(pizza.name +  " added to cart!");
    },
    removeFromCart(pizzaId){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const pizzaToRemove = cart.find(pizza => pizza.id.toString() === pizzaId);
        if (pizzaToRemove) {
            const index = cart.indexOf(pizzaToRemove);
            cart.splice(index,1);
            localStorage.setItem('cart',JSON.stringify(cart));
            updateCartDisplay();
            updateTotal();
            console.log('removed pizza with id:',pizzaId);
        }
        else {
            console.log('pizza not found !');
        }
    },
    computeTotal(){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cart.forEach(p => {
            total += Number(p.price);
        });
        return total.toFixed(2);
    }
}

export default cartOperations;