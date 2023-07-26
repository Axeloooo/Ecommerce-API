// Elements

const logoutBtn = document.getElementById("logout-btn");
const buyBtn = document.getElementById("buy-btn");
const backToProductsBtn = document.getElementById("back-to-products-btn");

// Events

window.window.addEventListener("DOMContentLoaded", async function () {
  const fetchedData = await fetchCart();
  setProducts(fetchedData.products);
});

logoutBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const res = await fetch("/api/sessions/logout");
  const data = await res.json();
  if (!data.success) {
    console.error("Logout failed");
    return;
  }
  localStorage.removeItem("cartId");
  window.location.href = "/auth/login";
});

buyBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const cartId = localStorage.getItem("cartId");
  const res = fetch(`/api/carts/${cartId}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.success) {
    console.error("Purchase failed");
    return;
  }
});

backToProductsBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  window.location.href = "/products";
});

// Handlers

async function handleDeleteProduct(product) {
  const cartId = localStorage.getItem("cartId");
  const res = await fetch(
    `/api/carts/${cartId}/products/${product.product._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.error("Error deleting product from cart");
    return;
  }
  window.location.reload();
}

async function fetchCart() {
  const cartId = localStorage.getItem("cartId");
  const res = await fetch(`/api/carts/${cartId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data.body.cart.products);
  return data.body.cart;
}

function setProducts(products) {
  const productContainer = document.getElementById("product-container");
  products.forEach((product) => {
    const div = document.createElement("div");

    const thumbnails =
      product.product.thumbnails.length !== 0
        ? product.product.thumbnails
            .map((element) => `<li>${element}</li>`)
            .join("")
        : "<li>No thumbnails</li>";

    div.innerHTML = `
      <ul>
        <li>Title: ${product.product.title}</li>
        <li>Id: ${product.product._id}</li>
        <li>Description: ${product.product.description}</li>
        <li>Code: ${product.product.code}</li>
        <li>Price: ${product.product.price}</li>
        <li>Status: ${product.product.status}</li>
        <li>Stock: ${product.product.stock}</li>
        <li>Category: ${product.product.category}</li>
        <li>Thumbnails: <ul>${thumbnails}</ul></li>
      </ul>
    `;

    div.style.border = "1px dashed black";
    div.style.margin = "10px";

    const button = document.createElement("button");
    button.innerText = "Delete product from Cart";
    button.classList.add("delete-product-btn");
    button.type = "button";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      handleDeleteProduct(product);
    });

    div.appendChild(button);

    productContainer.appendChild(div);
  });
}
