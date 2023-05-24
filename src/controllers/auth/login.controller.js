export async function getLogin(req, res) {
  const data = {
    title: "Login View",
  };
  res.render("login", data);
}
