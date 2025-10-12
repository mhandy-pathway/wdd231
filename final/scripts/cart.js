export let cartItems = [];
let cartCallback;
export async function configureCart(callbackFunc) {
    cartCallback = callbackFunc;
}
export async function loadCart() {
    try {
        const cartItemsStr = localStorage.getItem('cart_items');
        cartItems = JSON.parse(cartItemsStr);
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }
    } catch (error) {
        cartItems = [];
    }
}
export async function saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
}
export async function addToCart(product) {
    const index = await findCartIndexById(product.id);
    if (index >= 0) {
        cartItems[index].qty += 1;
    } else {
        cartItems.push({ id: product.id, qty: 1 });
    }
    await saveCart();
    await cartCallback();
}
export async function findCartIndexById(id) {
    for (const i in cartItems) {
        if (cartItems[i].id === id) {
            return i;
        }
    }
    return -1;
}
export async function emptyCart() {
    cartItems = [];
}