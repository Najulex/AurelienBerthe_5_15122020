/*Récupération de l'id du produit sélectionné*/

let id = window.location.search.substr(1);

/* Appel fonction get (request.js) pour afficher caractéristiques du produit*/

get("http://localhost:3000/api/teddies/" + id).then((response) => {
  displayElements(response);
});

function displayElements(elements) {
  let firstDiv = document.createElement("div");
  document.getElementById("product").appendChild(firstDiv);
  product.classList.add("card", "mb-4", "border-light", "shadow");
  let img = document.createElement("img");
  firstDiv.appendChild(img);
  img.classList.add("card-img-top");
  img.setAttribute("alt", "Ours en peluche");
  img.setAttribute("src", elements.imageUrl);
  let secondDiv = document.createElement("div");
  firstDiv.appendChild(secondDiv);
  secondDiv.classList.add("card-body", "m-md-5");
  let thirdDiv = document.createElement("div");
  secondDiv.appendChild(thirdDiv);
  thirdDiv.classList.add("text-center");
  let firstParagraph = document.createElement("p");
  thirdDiv.appendChild(firstParagraph);
  firstParagraph.classList.add("card-title", "h3", "font-weight-bold");
  firstParagraph.innerHTML = elements.name;
  let secondParagraph = document.createElement("p");
  thirdDiv.appendChild(secondParagraph);
  secondParagraph.classList.add("card-title", "h5", "text-justify");
  secondParagraph.innerHTML = elements.description;
  let thirdParagraph = document.createElement("p");
  thirdDiv.appendChild(thirdParagraph);
  thirdParagraph.classList.add("card-title", "h3", "m-5");
  thirdParagraph.innerHTML = elements.price / 100 + "€";
  let fourthDiv = document.createElement("div");
  thirdDiv.appendChild(fourthDiv);
  fourthDiv.classList.add("input-group", "mt-3");
  let fifthDiv = document.createElement("div");
  fourthDiv.appendChild(fifthDiv);
  fifthDiv.classList.add("input-group-prepend");
  let label = document.createElement("label");
  fifthDiv.appendChild(label);
  label.classList.add("input-group-text");
  label.setAttribute("for", "colorSelect01");
  label.innerHTML = "Couleur";
  let select = document.createElement("select");
  fourthDiv.appendChild(select);
  select.classList.add("custom-select");
  select.setAttribute("id", "colorSelect");
  let option = document.createElement("option");
  select.appendChild(option);
  option.innerHTML = "Choisissez ...";
  let link = document.createElement("a");
  thirdDiv.appendChild(link);
  link.classList.add(
    "btn",
    "btn-success",
    "btn-lg",
    "text-light",
    "mt-5",
    "mb-3"
  );
  link.setAttribute("id", "add-btn");
  link.setAttribute("type", "submit");
  link.innerHTML = "Acheter maintenant";
  let sixthDiv = document.createElement("div");
  secondDiv.appendChild(sixthDiv);
  sixthDiv.setAttribute("id", "item-add");

  /*boucle for pour afficher les couleurs disponibles du produit sélectionné*/

  for (let i = 0; i < elements.colors.length; i++) {
    document.getElementById("colorSelect").innerHTML +=
      "<option value=" + i + ">" + elements.colors[i] + "</option>";
  }
}
