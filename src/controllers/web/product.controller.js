export async function getProducts(req, res) {
  let data = {
    name: "Products View",
    style: "products.css",
    user: req.user.first_name,
  };
  res.render("products", data);
}
