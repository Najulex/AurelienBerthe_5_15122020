/* Affichage des différents éléments sur la page d'accueil pour chaque produit*/

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
    var response = JSON.parse(this.responseText);
    for (let i = 0; i < response.length; i++) {
      document.getElementById("productsList").innerHTML +=
        '<div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"><div class="card mb-4 border-light shadow"><img alt="Ours en peluche" class="card-img-top" src=' +
        response[i].imageUrl +
        '><div class="card-body" id="card"><div class="text-center"><p class="card-title h4 font-weight-bold">' +
        response[i].name +
        '</p></div><div class="text-center"><a class="btn btn-primary stretched-link text-light" role="button" href="./produit.html?' +
        response[i]._id +
        '">Découvrir le produit</a></div></div></div></div>';
    }
  }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
