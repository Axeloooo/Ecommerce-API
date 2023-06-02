import axios from "axios";

export async function getProducts(req, res) {
  console.log("here");
  const limit = req.query.lim;
  const page = req.query.page;
  const sort = req.query.sort;
  const query = req.query.query;
  const response = await axios.get(
    "http://localhost:8080/api/products",
    {
      params: {
        lim: limit,
        page: page,
        sort: sort,
        query: query,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  const data = response.data;
  let user = {
    name: "Products View",
    products: data.body,
  };
  res.render("products", user);
}
