// Products JS File
const products_url = 'data/products.json';
let products = [];

// Functions
export async function getProducts() {
    if (products.length === 0) {
        try {
            const response = await fetch(products_url);
            if (response.ok) {
                products = await response.json();
            } else {
                throw Error(await response.text());
            }
        } catch (err) {
            console.log(`An Error Occurred: ${err}`);
        }
    }
    return products;
}
export async function findProductById(id) {
    const products = await getProducts();
    for (const i in products) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    console.log("Unable to find product");
    return {};
}