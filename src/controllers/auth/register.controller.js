export async function getRegister(req, res) {
  const data = {
    title: "Register View",
  };
  res.render("register", data);
}
