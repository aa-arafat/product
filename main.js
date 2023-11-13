const body = document.querySelector("body");
body.classList.add('bg-secondary')
const root = document.querySelector("#app");
root.classList.add("mt-5");

const mainContainer = document.createElement("div");
mainContainer.classList.add("mainContainer");
mainContainer.classList.add("container");
mainContainer.classList.add('d-flex', 'w-100',"h-25");

const allProducts = document.createElement("div");
allProducts.classList.add("allproduct", "w-50", "mx-3");
const h4 = document.createElement("h4");
h4.innerText = "Products";
h4.classList.add('bg-light', 'mb-3', 'p-3', 'rounded-5');
allProducts.prepend(h4);
allProducts.classList.add("text-center");

const productCart = document.createElement("div");
productCart.classList.add("productCart", "w-50", "mx-3");
productCart.classList.add("text-center");
const carth4 = document.createElement("h4");
carth4.innerText = "Product cart";
carth4.classList.add('bg-light', 'mb-3', 'p-3', 'rounded-5');
productCart.prepend(carth4);

mainContainer.append(allProducts);
mainContainer.append(productCart);
root.append(mainContainer);

const container = document.createElement("div");
container.classList.add("row");
container.classList.add("row-cols-2",'gy-3');

function createProduct(img, name, price) {
  const col = document.createElement("div");
  col.classList.add("col");

  
  const productCardBody = document.createElement("div");
  productCardBody.classList.add("card-body");

  const productCard = document.createElement("div");
  productCard.classList.add("card");

  productCard.classList.add("text-center");
  productCard.classList.add("p-3");

  const productImg = document.createElement("img");
  productImg.setAttribute('src', `${img}`);
  

  const productName = document.createElement("h3");
  productName.innerText = name;

  const productPrice = document.createElement("p");
  productPrice.innerText = price;

 const cartButton = document.createElement('p')
 cartButton.classList.add('cartButton')
 cartButton.innerText='Add to cart'
 cartButton.classList.add('btn','btn-dark')

cartButton.addEventListener('click', function () {
    cartButton.innerText = 'In cart';
    cartButton.disabled = true; // Disable the button after adding to cart (optional)
  });

  productCard.append(productImg, productName, productPrice,cartButton);
  productCardBody.append(productCard);
  col.append(productCardBody);
  container.append(col);

  
}

allProducts.append(container);

fetch("https://raw.githubusercontent.com/aa-arafat/product/main/product.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (productData) {
    productData.products.forEach(function (data) {
      const itemImg = data.img;
      const itemName = data.name;
      const itemPrice = data.price;
      createProduct(itemImg, itemName, itemPrice);
    });
  });
