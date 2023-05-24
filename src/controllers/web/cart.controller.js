import axios from "axios";

export async function getCartById(req, res) {
  const cid = req.params.cid;
  const response = await axios.get(`http://localhost:8080/api/carts/${cid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  console.log(data.body.cart.products);
  let user = {
    name: "Carts View",
    products: data.body.cart.products,
  };
  res.render("carts", user);
}
