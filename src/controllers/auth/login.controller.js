export async function getLogin(req, res) {
  const data = {
    title: "Login",
    style: "login.css",
  };
  res.render("login", data);
}
