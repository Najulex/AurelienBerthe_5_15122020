/* Affichage des différents éléments sur la page d'accueil pour chaque produit
Nom - Description - Prix - image */

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
    var response = JSON.parse(this.responseText);
    for (let i = 0; i < response.length; i++) {
      document.getElementById("name_" + (i + 1)).innerHTML = response[i].name;
    }
    for (let i = 0; i < response.length; i++) {
      document.getElementById("description_" + (i + 1)).innerHTML =
        response[i].description;
    }
    for (let i = 0; i < response.length; i++) {
      document.getElementById("price_" + (i + 1)).innerHTML =
        parseInt(response[i].price) / 100 + "€";
    }
    for (let i = 0; i < response.length; i++) {
      document
        .getElementById("pic_" + (i + 1))
        .setAttribute("src", "../images/teddy_" + (i + 1) + ".jpg");
    }
  }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
