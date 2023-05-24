export async function getLogin(req, res) {
  console.log("here");
  const data = {
    title: "Login View",
  };
  res.render("login", data);
}
