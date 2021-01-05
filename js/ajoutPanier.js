/* Appel fonction get (request.js) pour récupèrer l'id du produit*/
get("http://localhost:3000/api/teddies/" + id).then((response) => {
  /*Fonction appelée au clique sur le bouton acheter*/
  document
    .getElementById("add-btn")
    .addEventListener("click", function addcart() {
      document.getElementById("item-add").innerHTML = "";
      /*Variable pour spécifier si produit déja dans le panier*/
      var newItem = true;
      /*Array pour stocker les produits mis au panier*/
      let itemSelection = [];
      /*Variable pour la quantité sélectionnée*/
      var quantity = 1;
      /*Objet qui récupère les infos du produit et sa quantité*/
      let itemSelected = {
        id: response._id,
        name: response.name,
        image: response.imageUrl,
        price: response.price,
        quantity,
      };
      /*Condition si panier vide*/
      if (localStorage.getItem("cart") === null) {
        /*on ajoute un à la quantité, on ajoute l'objet sélectionné au tableau et on stocke le tableau en local*/
        addItemEmptyCart();
        /*Sinon vérification si produit déja au panier*/
      } else {
        itemSelection = JSON.parse(localStorage.getItem("cart"));
        itemSelection.forEach((item) => {
          /*si produit déja au panier alors on ajoute un à la quantité*/
          if (item.id === itemSelected.id) {
            item.quantity += 1;
            /*et on passe la variable newItem à false pour que la dernière condition ne se déclenche pas*/
            newItem = false;
          }
          localStorage.setItem("cart", JSON.stringify(itemSelection));
        });
      }
      /*si produit non présent dans le panier alors on ajoute l'objet sélectionné au tableau et on stocke le tableau en local*/
      if (newItem == true) {
        itemSelection.push(itemSelected);
        localStorage.setItem("cart", JSON.stringify(itemSelection));
      }
      displayAlert();
    });
});

function addItemEmptyCart() {
  quantity++;
  itemSelection.push(itemSelected);
  localStorage.setItem("cart", JSON.stringify(itemSelection));
  newItem = false;
}

/*Message d'alerte indiquant la mise au panier du produit*/
function displayAlert() {
  let firstDiv = document.createElement("div");
  document.getElementById("item-add").appendChild(firstDiv);
  firstDiv.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show",
    "shadow"
  );
  firstDiv.setAttribute("role", "alert");
  let title = document.createElement("h5");
  firstDiv.appendChild(title);
  title.classList.add("alert-heading");
  title.innerHTML = "Félicitations";
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
  paragraph.innerHTML = "Le produit a été correctement ajouté à votre ";
  let link = document.createElement("a");
  paragraph.appendChild(link);
  link.classList.add("alert-link");
  link.setAttribute("href", "panier.html");
  link.innerHTML = "panier !";
}
