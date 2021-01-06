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
    remove.addEventListener("click", function removeItem() {
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
document
  .getElementById("clearCart")
  .addEventListener("click", function clearStorage() {
    localStorage.clear();
  });

/* Affichage du formulaire à la validation du panier */
document
  .getElementById("validCart")
  .addEventListener("click", function formDisplay() {
    document.getElementById("form-display").style.display = "block";
  });

/* au clique sur le bouton de commande, si tous les champs sont correctement complétés */
document
  .getElementById("submit-order")
  .addEventListener("click", function (event) {
    document.getElementById("error-message").innerHTML = "";
    event.preventDefault();
    if (
      document.getElementById("inputName").validity.valid &&
      document.getElementById("inputForname").validity.valid &&
      document.getElementById("inputAddress").validity.valid &&
      document.getElementById("inputEmail").validity.valid &&
      document.getElementById("inputCity").validity.valid
    ) {
      /* création d'un objet contact avec les infos fournis et redirection vers la page de confirmation */
      validate();
    } else {
      /* sinon alerte avec message invitant à remplir le formulaire  */
      displayError();
    }
  });

function validate() {
  window.location = "confirmation.html";
  let contact = {
    firstName: document.getElementById("inputForname").value,
    lastName: document.getElementById("inputName").value,
    address: document.getElementById("inputAddress").value,
    city: document.getElementById("inputCity").value,
    email: document.getElementById("inputEmail").value,
  };
  localStorage.setItem("contact", JSON.stringify(contact));
}

function displayError() {
  let firstDiv = document.createElement("div");
  document.getElementById("error-message").appendChild(firstDiv);
  firstDiv.classList.add(
    "alert",
    "alert-danger",
    "alert-dismissible",
    "fade",
    "show",
    "shadow"
  );
  firstDiv.setAttribute("role", "alert");
  let button = document.createElement("button");
  firstDiv.appendChild(button);
  button.classList.add("close");
  button.setAttribute("type", "button");
  button.setAttribute("data-dismiss", "alert");
  button.setAttribute("aria-label", "Close");
  let span = document.createElement("span");
  button.appendChild(span);
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = "×";
  let paragraph = document.createElement("p");
  firstDiv.appendChild(paragraph);
  paragraph.innerHTML = "Champ(s) requis non complété(s)";
}

/* affichage du menu de navigation avec bouton burger */
let nav = document.getElementById("navigation");

document
  .getElementById("test")
  .addEventListener("click", function displayNav() {
    if (nav.className === "d-sm-block d-none") {
      nav.classList.remove("d-none");
    } else {
      nav.classList.add("d-none");
    }
  });
