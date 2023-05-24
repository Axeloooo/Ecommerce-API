export function rol(req, res, next) {
  if (
    req.body.email === "adminCoder@coder.com" &&
    req.body.password === "adminCod3r123"
  ) {
    req.body["rol"] = "admin";
    next();
  } else {
    req.body["rol"] = "user";
    next();
  }
}
