export function role(req, res, next) {
  if (
    req.body.email === "adminCoder@coder.com" &&
    req.body.password === "adminCod3r123"
  ) {
    req.body["role"] = "admin";
    next();
  } else {
    req.body["role"] = "user";
    next();
  }
}
