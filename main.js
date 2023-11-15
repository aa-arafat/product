const body = document.querySelector("body");
body.classList.add("bg-secondary");
const root = document.querySelector("#app");
root.classList.add("mt-5");

const mainContainer = document.createElement("div");
mainContainer.classList.add("mainContainer");
mainContainer.classList.add("container");
mainContainer.classList.add("d-flex", "w-100", "h-25");

const allProducts = document.createElement("div");
allProducts.classList.add("allproduct", "w-50", "mx-3");
const h4 = document.createElement("h4");
h4.innerText = "Products";
h4.classList.add("bg-light", "mb-3", "p-3", "rounded-5");
allProducts.prepend(h4);
allProducts.classList.add("text-center");

const productCart = document.createElement("div");
productCart.classList.add("productCart", "w-50", "mx-3");
productCart.classList.add("text-center");

const allproductCard = document.createElement('div')
productCart.append(allproductCard)
allproductCard.classList.add('allproductCard')


const carth4 = document.createElement("h4");
carth4.innerText = "Product cart";
carth4.classList.add("bg-light", "mb-3", "p-3", "rounded-5");
productCart.prepend(carth4);

mainContainer.append(allProducts);
mainContainer.append(productCart);
root.append(mainContainer);

const container = document.createElement("div");
container.classList.add("row");
container.classList.add("row-cols-2", "gy-3");

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
  productImg.setAttribute("src", `${img}`);

  const productName = document.createElement("h3");
  
  productName.innerText = name;

  const productPrice = document.createElement("p");
  productPrice.classList.add('display-6')
  productPrice.innerText = price;

  const cartButton = document.createElement("p");
  cartButton.classList.add("cartButton");
  cartButton.innerText = "Add to cart";
  cartButton.classList.add("btn", "btn-dark");

  cartButton.addEventListener("click", function () {
    cartButton.innerText = "In cart";
    cartButton.classList.add("btn", "btn-light", "disabled");

    const inCartImg = document.createElement("img");
    inCartImg.setAttribute("src", `${img}`);

    const inCartName = document.createElement("div");
    inCartName.innerText = name;

    const inCartPrice = document.createElement("p");
    inCartPrice.innerText = price;
    
    const removeButton = document.createElement("button")
    removeButton.classList.add("btn", "btn-danger")
    removeButton.innerText="Remove"

    const allProductRemoveButton = document.createElement("button")
    allProductRemoveButton.classList.add("btn", "btn-danger","removeall")
    allProductRemoveButton.innerText="Remove All"


    const productQuantity = document.createElement("input");
    productQuantity.classList.add("quantity", "w-25",'border-0');
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("name", "quantity");
    productQuantity.setAttribute("value", "1");
    productQuantity.setAttribute("type", "number");

  
     
    const quantity = document.createElement("div");
    quantity.classList.add("quantity");
    quantity.append(productQuantity);

    const allItems = document.createElement("div");
    allItems.classList.add("allItems",'card');

    const cartItems = document.createElement("div");
    cartItems.classList.add("items","card-body",'d-flex','justify-content-center',"align-items-center","h-25");
    productCart.append(cartItems);

    cartItems.append(inCartImg, inCartName, inCartPrice, quantity,removeButton);
    allItems.append(cartItems);
    if(allproductCard.querySelector(".removeall"))(
      allproductCard.querySelector(".removeall").remove()
    )
    allproductCard.append(allItems,allProductRemoveButton);
    
    cartButton.disabled = true;

    removeButton.addEventListener('click',function(){
      
      allItems.remove()
      cartButton.classList.remove( "disabled");
      cartButton.innerText = "Add to cart";
      cartButton.disabled = false;
    })
    
    allProductRemoveButton.addEventListener('click',function(){
      allproductCard.innerHTML=""
      allProductRemoveButton.remove()
      document.querySelectorAll('.cartButton').forEach(function(cartButton){
        
        cartButton.classList.remove( "disabled");
        cartButton.innerText = "Add to cart";
        cartButton.disabled = false;
      })
    })

    
  });

  productCard.append(productImg, productName, productPrice, cartButton);
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
