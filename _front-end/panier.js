/* Récupération du contenu du panier */
cartContent = JSON.parse(localStorage.getItem("cart"));

/* Si panier vide alors message panier vide + lien page d'acceuil 
sinon affichage du contenu du panier */
if (localStorage.getItem("cart") === null) {
  document.getElementById("emptyCart").style.display = "contents";
  document.getElementById("cartDisplay").style.display = "none";
} else {
  document.getElementById("cartDisplay").style.display = "block";
  document.getElementById("emptyCart").style.display = "none";
}

/* Tableau pour afficher le panier */
let tableItem = document.getElementById("tableItem");

/* Boucle qui itère chaque contenu du panier dans un tableau*/
for (let i = 0; i < cartContent.length; i++) {
  let itemToCart = document.createElement("tr");
  tableItem.appendChild(itemToCart);

  /* Affichage de la quantité du produit */
  let tdQty = document.createElement("td");
  itemToCart.appendChild(tdQty);
  tdQty.innerHTML = cartContent[i].quantity;

  /* Affichage du nom du produit */
  let tdName = document.createElement("td");
  itemToCart.appendChild(tdName);
  tdName.innerHTML = cartContent[i].name;

  /* Affichage de l'image du produit qui est un lien pour retourner à sa page produit*/
  let tdImage = document.createElement("td");
  itemToCart.appendChild(tdImage);
  let img = document.createElement("img");
  let link = document.createElement("a");
  link.appendChild(img);
  tdImage.appendChild(link);
  link.setAttribute("href", "produit.html?" + cartContent[i].id);
  img.setAttribute("src", cartContent[i].image);
  img.style.width = "3rem";

  /* Affichage du prix du produit multiplié par sa quantité */
  let tdPrice = document.createElement("td");
  itemToCart.appendChild(tdPrice);
  tdPrice.innerHTML =
    (cartContent[i].price * cartContent[i].quantity) / 100 + "€";
}

/* Affichage du prix total du panier */
var priceSum = cartContent.reduce((sum, a) => {
  return sum + a.price * a.quantity;
}, 0);
document.getElementById("totalPrice").innerHTML = priceSum / 100 + "€";
