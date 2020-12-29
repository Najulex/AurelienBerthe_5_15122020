/* Appel fonction get (request.js) pour afficher produits*/

get("http://localhost:3000/api/teddies").then((response) => {
  displayItems(response);
});

/* Affichage des différents éléments sur la page d'accueil pour chaque produit
avec boucle for each pour automatiser la création si ajout de produits*/

function displayItems(items) {
  items.forEach((item) => {
    let firstDiv = document.createElement("div");
    document.getElementById("productsList").appendChild(firstDiv);
    firstDiv.classList.add(
      "col-12",
      "col-sm-6",
      "d-flex",
      "align-items-stretch"
    );
    let secondDiv = document.createElement("div");
    firstDiv.appendChild(secondDiv);
    secondDiv.classList.add("card", "mb-4", "border-light", "shadow");
    let img = document.createElement("img");
    secondDiv.appendChild(img);
    img.classList.add("card-img-top", "h-75");
    img.setAttribute("alt", "Ours en peluche");
    img.setAttribute("src", item.imageUrl);
    let thirdDiv = document.createElement("div");
    secondDiv.appendChild(thirdDiv);
    thirdDiv.classList.add("card-body");
    let fourthDiv = document.createElement("div");
    thirdDiv.appendChild(fourthDiv);
    fourthDiv.classList.add("text-center");
    let link = document.createElement("a");
    fourthDiv.appendChild(link);
    link.classList.add(
      "btn",
      "btn-primary",
      "stretched-link",
      "text-light",
      "mb-4"
    );
    link.setAttribute("role", "button");
    link.setAttribute("href", "produit.html?" + item._id);
    link.innerHTML = "Voir " + item.name;
  });
}
