export async function getCartById(req, res) {
  let data = {
    name: "Cart View",
    style: "cart.css",
    user: req.user.first_name,
  };
  res.render("carts", data);
}
