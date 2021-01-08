if (localStorage.getItem("cart") === null) {
  document.getElementById("main").innerHTML = "";
  document.getElementById("hero").innerHTML =
    "Merci, votre achat a bien été validé, votre panier est maintenant vide.";
  document.getElementById("hero").classList.add("text-center", "h5");
}

/* Stockage des id des produits présents dans le panier dans un array nommé 'products' */
cartContent = JSON.parse(localStorage.getItem("cart"));
var products = [];
cartContent.forEach((product) => {
  for (let i = 0; i < product.quantity; i++) {
    products.push(product.id);
  }
});

/* récupération des infos de contact dans le stockage local */
var contact = JSON.parse(localStorage.getItem("contact"));

/* création d'une variable qui regroupe les infos de contact et les id des produits commandés */
let order = JSON.stringify({
  contact,
  products,
});

/* appel de la fonction post qui envoie les infos à l'API et récupère les infos de la commande */
post("http://localhost:3000/api/teddies/order")
  .then((response2) => {
    displayContact(response2);
    /* calcul du coût total de la commande */
    var priceSum = response2.products.reduce((sum, a) => {
      return sum + a.price;
    }, 0);
    document.getElementById("order-price").innerHTML = priceSum / 100 + "€";
  })
  .catch(() => {
    document.getElementById("main").innerHTML =
      "Il semble que nous ne parvenons pas à récupérer vos données, merci de recommencer l'opération";
    document
      .getElementById("main")
      .classList.add("h4", "text-center", "bg-danger", "text-light", "p-2");
  });

/* affichage de l'id de la commande et des infos du client */
function displayContact(info) {
  document.getElementById("order-id").innerHTML = info.orderId;
  document.getElementById("name").innerHTML =
    contact.lastName + " " + contact.firstName;
  document.getElementById("address").innerHTML =
    contact.address + " à " + contact.city;
  document.getElementById("email").innerHTML = contact.email;
}

/* vide les infos stockés en local concernant la commande */
localStorage.clear();

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
