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
post("http://localhost:3000/api/teddies/order").then((response2) => {
  displayContact(response2);
  /* calcul du coût total de la commande */
  var priceSum = response2.products.reduce((sum, a) => {
    return sum + a.price;
  }, 0);
  document.getElementById("order-price").innerHTML = priceSum / 100 + "€";
});

/* vide les infos stockés en local concernant la commande */
localStorage.clear();

/* affichage de l'id de la commande et des infos du client */
function displayContact(info) {
  document.getElementById("order-id").innerHTML = info.orderId;
  document.getElementById("name").innerHTML =
    contact.lastName + " " + contact.firstName;
  document.getElementById("address").innerHTML =
    contact.address + " à " + contact.city;
  document.getElementById("email").innerHTML = contact.email;
}
