export async function getRegister(req, res) {
  const data = {
    title: "Register",
    style: "register.css",
  };
  res.render("register", data);
}
