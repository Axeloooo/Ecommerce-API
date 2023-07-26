// Elements

const logoutBtn = document.getElementById("logout-btn");
const checkoutBtn = document.getElementById("checkout-btn");

// Events

window.window.addEventListener("DOMContentLoaded", async function () {
  const fetchedData = await fetchProducts();
  setProducts(fetchedData.docs);
  setPagination(fetchedData);
  setPaging(fetchedData);
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

checkoutBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const cartId = localStorage.getItem("cartId");
  window.location.href = `/carts/${cartId}`;
});

// Handlers

async function handleAddProduct(product) {
  const cartId = localStorage.getItem("cartId");
  const res = await fetch(`/api/carts/${cartId}/product/${product.id}`, {
    method: "POST",
    "Content-Type": "application/json",
  });
  if (!res.ok) {
    console.error("Error adding product to cart");
    return;
  }
}

// Functions

async function fetchProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data.body;
}

function setProducts(products) {
  const productContainer = document.getElementById("product-container");
  products.forEach((product) => {
    const div = document.createElement("div");

    const thumbnails =
      product.thumbnails.length !== 0
        ? product.thumbnails.map((element) => `<li>${element}</li>`).join("")
        : "<li>No thumbnails</li>";

    div.innerHTML = `
      <ul>
        <li>Title: ${product.title}</li>
        <li>Id: ${product.id}</li>
        <li>Description: ${product.description}</li>
        <li>Code: ${product.code}</li>
        <li>Price: ${product.price}</li>
        <li>Status: ${product.status}</li>
        <li>Stock: ${product.stock}</li>
        <li>Category: ${product.category}</li>
        <li>Thumbnails: <ul>${thumbnails}</ul></li>
      </ul>
    `;
    div.style.border = "1px dashed black";
    div.style.margin = "10px";

    const button = document.createElement("button");
    button.innerText = "Add Product to Cart";
    button.classList.add("add-product-btn");
    button.type = "button";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      handleAddProduct(product);
    });

    div.appendChild(button);
    productContainer.appendChild(div);
  });
}

function setPagination(paginationInfo) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = `
  <h2>Pagination Options</h2>
  <ul>
    <li>Total docs: ${paginationInfo.totalDocs}</li>
    <li>Limit: ${paginationInfo.limit}</li>
    <li>Total pages: ${paginationInfo.totalPages}</li>
    <li>Page: ${paginationInfo.page}</li>
    <li>Paging counter: ${paginationInfo.pagingCounter}</li>
    <li>Has previous page: ${paginationInfo.hasPrevPage}</li>
    <li>Has next page: ${paginationInfo.hasNextPage}</li>
    <li>Previous page: ${paginationInfo.prevPage}</li>
    <li>Next Page: ${paginationInfo.nextPage}</li>
  </ul>
  `;
}

function setPaging(pagingInfo) {
  const pagingContainer = document.getElementById("paging-container");
  pagingContainer.innerHTML = `
    <a href="/products/?lim=${pagingInfo.limit}&page=${pagingInfo.prevPage}">Prev</a>
    <p>${pagingInfo.page}</p>
    <a href="/products/?lim=${pagingInfo.limit}&page=${pagingInfo.nextPage}">Next</a>
  `;
}
