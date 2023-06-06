const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const age = formData.get("age");
  const password = formData.get("password");

  const fetchRegister = await fetch(
    "http://localhost:8080/api/sessions/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        age,
        password,
      }),
    }
  );
  const registeredUser = await fetchRegister.json();

  if (registeredUser.success) {
    const fetchNewCart = await fetch("http://localhost:8080/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newCart = await fetchNewCart.json();
    if (newCart.success) {
      localStorage.setItem("cartId", newCart.body.cart._id);
      window.location.href = "/products";
    }
  }
});
