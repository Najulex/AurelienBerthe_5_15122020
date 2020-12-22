let test = document.getElementById("test");
cartContent = JSON.parse(localStorage.getItem("cart"));

if (localStorage.getItem("cart") === null) {
  document.getElementById("emptyCart").style.display = "contents";
  document.getElementById("cartDisplay").style.display = "none";
} else {
  document.getElementById("cartDisplay").style.display = "block";
  document.getElementById("emptyCart").style.display = "none";
}
