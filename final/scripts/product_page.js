// Products JS File
const productList = document.querySelector('#product_list');
const shoppingCart = document.querySelector('#shopping_cart');
import { cartItems, configureCart, loadCart, addToCart, saveCart, emptyCart } from './cart.js';
import { getProducts, findProductById } from './products.js';
configureCart(displayShoppingCart);

// Page Startup
loadCart();
displayProducts();

// Functions
async function displayProducts() {
    const products = await getProducts();
    productList.innerHTML = '';
    const random_products = products.sort(() => Math.random() - 0.5);
    for (const i in random_products) {
        const product = random_products[i];
        const section = document.createElement('section');
        section.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="340" height="200" loading="lazy">
            <h2>${product.name}</h2>
            <span>$${product.price.toFixed(2)}</span>
            <button>Add To Cart</button>
        `;
        const button = section.querySelector('button');
        button.addEventListener('click', () => { addToCart(product); });
        productList.appendChild(section);
    }
}
async function displayShoppingCart() {
    shoppingCart.innerHTML = `
        <h2>Shopping Cart</h2>
        <div class="cart"></div>
        <div class="center">
            <button class="main close">Continue Shopping</button>
            <button class="main pay">Make Payment</button>
        </div>
    `;
    const div = shoppingCart.querySelector('div');
    if (cartItems.length > 0) {
        let totalPrice = 0;
        for (const i in cartItems) {
            const cartItem = cartItems[i];
            const product = await findProductById(cartItem.id);
            totalPrice += cartItem.qty * product.price;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <img src="${product.image}" width="320" height="200" alt="${product.name}" loading="lazy">
                <span class="label">${cartItem.qty} x ${product.name}</span>
                <span class="price">$${(cartItem.qty * product.price).toFixed(2)}</span>
                <button class="main2">X</button>
            `;
            const button = itemDiv.querySelector('button');
            button.addEventListener('click', () => { cartItems.splice(i, 1); saveCart(); displayShoppingCart(); })
            div.appendChild(itemDiv);
        }
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total');
        totalDiv.innerHTML = `<strong>Grand Total:</strong> $${totalPrice.toFixed(2)}`;
        div.appendChild(totalDiv);
    } else {
        div.classList.add('center');
        div.textContent = 'The Shopping Cart is currently empty.';
    }

    const closeButton = shoppingCart.querySelector('button.close');
    closeButton.addEventListener('click', () => { shoppingCart.close(); })

    const payButton = shoppingCart.querySelector('button.pay');
    if (cartItems.length > 0) {
        payButton.addEventListener('click', async () => { emptyCart(); await saveCart(); window.location.href = 'thankyou.html'; })
    } else {
        payButton.parentElement.removeChild(payButton);
    }

    shoppingCart.showModal();
}