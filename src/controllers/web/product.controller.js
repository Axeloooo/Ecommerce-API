import axios from "axios";

export async function getProducts(req, res) {
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
  const data = response.data;
  console.log(data.body);
  let user = {
    name: "Products View",
    products: data.body,
  };
  res.render("products", user);
}
