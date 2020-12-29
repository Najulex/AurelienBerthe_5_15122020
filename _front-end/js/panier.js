/* Récupération du contenu du panier */
cartContent = JSON.parse(localStorage.getItem("cart"));

/* Si panier vide alors message panier vide + lien page d'acceuil 
sinon affichage du contenu du panier */
if (localStorage.getItem("cart") === null || cartContent.length == 0) {
  document.getElementById("emptyCart").style.display = "contents";
  document.getElementById("cartDisplay").style.display = "none";
} else {
  document.getElementById("cartDisplay").style.display = "block";
  document.getElementById("emptyCart").style.display = "none";
}

/* Tableau pour afficher le panier */
let tableItem = document.getElementById("tableItem");

/* Boucle qui itère chaque contenu du panier dans un tableau */
/* Ne s'enclenche que si élément(s) présent(s) dans le panier */
if (localStorage.getItem("cart") != null) {
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

    /* Affichage de l'image du produit qui est un lien pour retourner à sa page produit */
    let tdImage = document.createElement("td");
    tdImage.classList.add("d-none", "d-sm-table-cell");
    itemToCart.appendChild(tdImage);
    let link = document.createElement("a");
    let img = document.createElement("img");
    tdImage.appendChild(link);
    link.appendChild(img);
    link.setAttribute("href", "produit.html?" + cartContent[i].id);
    img.setAttribute("src", cartContent[i].image);
    img.style.width = "8rem";

    /* Affichage du prix du produit multiplié par sa quantité */
    let tdPrice = document.createElement("td");
    itemToCart.appendChild(tdPrice);
    tdPrice.innerHTML =
      (cartContent[i].price * cartContent[i].quantity) / 100 + "€";

    /* Icone pour suppression du produit */
    let tdRemove = document.createElement("td");
    itemToCart.appendChild(tdRemove);
    let remove = document.createElement("a");
    tdRemove.appendChild(remove);
    let icon = document.createElement("i");
    remove.appendChild(icon);
    remove.classList.add("btn", "btn-primary");
    remove.setAttribute("href", "panier.html");
    icon.classList.add("far", "fa-trash-alt");
    icon.setAttribute("title", "Supprimer");
    remove.addEventListener("click", function () {
      cartContent.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartContent));
    });
  }
  totalPrice();
}

/* Affichage du prix total du panier */
function totalPrice() {
  var priceSum = cartContent.reduce((sum, a) => {
    return sum + a.price * a.quantity;
  }, 0);
  document.getElementById("totalPrice").innerHTML = priceSum / 100 + "€";
}

/* Suppression de tout le contenu du panier */
document.getElementById("clearCart").addEventListener("click", function () {
  localStorage.clear();
});

/* Affichage du formulaire à la validation du panier */
document.getElementById("validCart").addEventListener("click", function () {
  document.getElementById("form-display").style.display = "block";
});

/* au clique sur le bouton de commande, si tous les champs sont correctement complétés alors
création d'un objet contact avec les infos fournis et redirection vers la page de confirmation 
sinon alert avec message invitant à remplir le formulaire */
document
  .getElementById("submit-order")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (
      document.getElementById("inputName").validity.valid &&
      document.getElementById("inputForname").validity.valid &&
      document.getElementById("inputAddress").validity.valid &&
      document.getElementById("inputEmail").validity.valid &&
      document.getElementById("inputCity").validity.valid
    ) {
      window.location = "confirmation.html";
      let contact = {
        firstName: document.getElementById("inputForname").value,
        lastName: document.getElementById("inputName").value,
        address: document.getElementById("inputAddress").value,
        city: document.getElementById("inputCity").value,
        email: document.getElementById("inputEmail").value,
      };
      localStorage.setItem("contact", JSON.stringify(contact));
    } else {
      alert("Champs requis non complétés !");
    }
  });
