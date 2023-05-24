async function logout() {
  const res = await fetch("http://localhost:8080/api/sessions/logout");
  const data = await res.json();
  console.log(data);
  if (!data.success) {
    console.error("Logout failed");
    return;
  }

  window.location.href = "/auth/login";
}
